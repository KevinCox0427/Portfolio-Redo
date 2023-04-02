import express from "express";
import React from "react";
import Home from "../pages/Home";
import serveHTML from "../utils/serveHTML";
import { pbkdf2Sync, randomBytes } from 'crypto';

const index = express.Router();

index.route('/')
    .get(async (req, res) => {
        res.send(serveHTML(<Home/>, 'Home'));
    });

index.route('/encrypt')
    .post(async(req, res) => {
        const salt = randomBytes(16).toString('base64');
        res.status(200).send({
            salt: salt,
            hash: pbkdf2Sync(req.body.password, salt, 10000, 100, 'sha256').toString('base64')
        });
    })

export default index;
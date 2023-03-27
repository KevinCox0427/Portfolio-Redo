import express from "express";
import React from "react";
import Home from "../pages/Home";
import serveHTML from "../utils/serveHTML";

const index = express.Router();

index.route('/')
    .get(async (req, res) => {
        res.send(serveHTML(<Home/>, 'Home'));
    });

export default index;
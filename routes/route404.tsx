import express from "express";
import React from "react";
import serveHTML from "../utils/serveHTML";
import Page404 from "../pages/Page404";

const route404 = express.Router();

route404.route('*')
    .get(async ( req, res ) => {
        res.status(404).send(serveHTML(<Page404/>, 'Page404')); 
    });

export default route404;
import express from "express";
import React from "react";
import serveHTML from "../utils/serveHTML";
import portfolioConfig from "../utils/portfolioConfig";
import Portfolio from "../pages/Portfolio";


const portfolio = express.Router();


portfolio.route('/')
    .get((req, res) => {
        const serverProps:ServerPropsType = {
            portfolioConfig: portfolioConfig
        }

        res.status(200).send(serveHTML(<Portfolio ServerProps={serverProps}/>, 'Portfolio', serverProps));
    })


export default portfolio;
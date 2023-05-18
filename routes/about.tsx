import express from 'express';
import React from 'react';
import portfolioConfig from '../utils/portfolioConfig';
import serveHTML from '../utils/serveHTML';
import About from '../pages/About';

const about = express.Router();

about.route('/')
    .get((req, res) => {
        const serverProps: ServerPropsType = {
            aboutPageProps: {
                portfolioConfig: portfolioConfig
            }
        }

        res.status(202).send(serveHTML(<About ServerProps={serverProps}></About>, 'About', serverProps));
    })

export default about;
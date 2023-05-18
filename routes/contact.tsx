import express from 'express';
import React from 'react';
import portfolioConfig from '../utils/portfolioConfig';
import serveHTML from '../utils/serveHTML';
import Contact from '../pages/Contact';

const contact = express.Router();

contact.route('/')
    .get((req, res) => {
        const serverProps: ServerPropsType = {
            contactPageProps: {
                portfolioConfig: portfolioConfig
            }
        }

        res.status(202).send(serveHTML(<Contact ServerProps={serverProps}></Contact>, 'Contact', serverProps));
    })

export default contact;
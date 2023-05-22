import express from 'express';
import React from 'react';
import portfolioConfig from '../utils/portfolioConfig';
import serveHTML from '../utils/serveHTML';
import Contact from '../pages/Contact';
import RegexTester from '../utils/regexTester';
import EmailGenerator from '../utils/emailGenerator';
import sendEmail from '../utils/smtp';

const htmlgen = new EmailGenerator({
    color: '#000',
    image: 'https://dreamstate.graphics/logo.png',
    name: 'Dream State',
    message: 'You bridge between dreams and reality.',
    websiteURL: 'https://dreamstate.graphics'
})

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

const generalFormTest = new RegexTester({
    name: /^[\w\s]{1,300}/g,
    email: /^[a-zA-Z0-9+_.-]{1,200}@[\w]{1,10}.[a-z]{1,6}/g,
    message: /^[\d\w\s\-!@#$%^&*()_+-=\\\/?<>.,;:'"]{1,4000}/g
})

contact.route('/general')
    .post(async (req, res) => {
        const result = generalFormTest.runTest(req.body);

        if(typeof result === 'string') {
            res.status(400).send({
                success: false,
                message: result
            });
            return;
        }

        const email = htmlgen.generateHTMLEmail('A new Dream State general form has just been submitted!', result);

        // await sendEmail({
        //     to: [{
        //         name: 'Kevin Cox',
        //         email: 'kevincox0427@yahoo.com'
        //     }],
        //     fromName: 'Dreamstate Bot',
        //     subject: 'A new Dream State general form has just been submitted!',
        //     body: email
        // })

        res.status(200).send({
            success: true,
            message: 'Success! Please allow 3-5 days for me to get back to you.'
        });
    })

const inquiryFormTest = new RegexTester({
    name: /^[\w\s]{1,300}/g,
    email: /^[a-zA-Z0-9+_.-]{1,200}@[\w]{1,10}.[a-z]{1,6}/g,
    phone: /^[\d-()]{1,15}/g,
    message: /^[\d\w\s\-!@#$%^&*()_+-=\\\/?<>.,;:'"]{1,4000}/g
}, {
    needs: /^(Graphic Design|Forms|Data Entry|Users|Ecommerce|Content Publishing|Integrations)/g,
    startDate: /^[\d]{4}-[\d]{2}-[\d]{2}/g,
    endDate: /^[\d]{4}-[\d]{2}-[\d]{2}/g,
});

contact.route('/inquiry')
    .post(async (req, res) => {
        const result = inquiryFormTest.runTest(req.body);

        if(typeof result === 'string') {
            res.status(400).send({
                success: false,
                message: result
            });
            return;
        }

        const email = htmlgen.generateHTMLEmail('A new Dream State inquiry has just been submitted!', result);

        // await sendEmail({
        //     to: [{
        //         name: 'Kevin Cox',
        //         email: 'kevincox0427@yahoo.com'
        //     }],
        //     fromName: 'Dreamstate Bot',
        //     subject: 'A new Dream State inquiry has just been submitted!',
        //     body: email
        // })

        res.status(200).send({
            success: true,
            message: 'Success! Please allow 3-5 days for me to get back to you.'
        });
    });

export default contact;
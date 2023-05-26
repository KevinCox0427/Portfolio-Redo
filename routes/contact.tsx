import express from 'express';
import React from 'react';
import portfolioConfig from '../utils/portfolioConfig';
import serveHTML from '../utils/serveHTML';
import Contact from '../pages/Contact';
import RegexTester from '../utils/regexTester';
import EmailGenerator from '../utils/emailGenerator';
import sendEmail from '../utils/smtp';

const htmlgen = new EmailGenerator({
    image: 'https://www.dreamstate.graphics/logo.png',
    name: 'Dream State',
    subtitle: '"Your bridge between dreams and reality"',
    message: 'Thank you for reaching out! I\'ll get back to you as quickly as I can.<br>- Kevin',
    websiteURL: 'https://www.dreamstate.graphics'
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
    Name: /^[\w\s]{1,300}/g,
    Email: /^[a-zA-Z0-9+_.-]{1,200}@[\w]{1,10}.[a-z]{1,6}/g,
    Message: /^[\d\w\s\-!@#$%^&*()_+-=\\\/?<>.,;:'"]{1,4000}/g
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

        const email = htmlgen.generateHTMLEmail('Your submission has been received, here\'s what we got:', result);

        const emailResult = await sendEmail({
            to: [{
                name: result.Name,
                email: result.Email
            }],
            fromName: 'Dream State Graphics',
            subject: 'Your Dream State contact submission has been received',
            body: email
        });

        res.status(200).send(emailResult ? {
            success: true,
            message: 'Success! Check your email for a confirmation.'
        } : {
            success: false,
            message: 'Error: Email could not be sent. Contact server admin at kevin@dreamstate.graphics.'
        });
    })

const inquiryFormTest = new RegexTester({
    Name: /^[\w\s]{1,300}/g,
    Email: /^[a-zA-Z0-9+_.-]{1,200}@[\w]{1,10}.[a-z]{1,6}/g,
    Phone: /^[\d-()]{1,15}/g,
    Availability: /^[\d\w\s\-!@#$%^&*()_+-=\\\/?<>.,;:'"]{1,1000}/g,
}, {
    "Needs": /^(Graphic Design|Forms|Data Entry|Users|Ecommerce|Content Publishing|Integrations)/g,
    "Start Date": /^[\d]{4}-[\d]{2}-[\d]{2}/g,
    "End Date": /^[\d]{4}-[\d]{2}-[\d]{2}/g,
    "Additional Notes": /^[\d\w\s\-!@#$%^&*()_+-=\\\/?<>.,;:'"]{1,4000}/g
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

        const email = htmlgen.generateHTMLEmail('Your submission has been received, here\'s what we got:', result);

        const emailResult = await sendEmail({
            to: [{
                name: result.Name,
                email: result.Email
            }],
            fromName: 'Dream State Graphics',
            subject: 'Your Dream State inquiry has been received',
            body: email
        });

        res.status(200).send(emailResult ? {
            success: true,
            message: 'Success! Check your email for a confirmation.'
        } : {
            success: false,
            message: 'Error: Email could not be sent. Contact server admin at kevin@dreamstate.graphics.'
        });
    });

export default contact;
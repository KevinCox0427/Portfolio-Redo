import express from 'express';
import React from 'react';
import portfolioConfig from '../utils/portfolioConfig';
import serveHTML from '../utils/serveHTML';
import Contact from '../pages/Contact';
import RegexTester from '../utils/regexTester';
import EmailGenerator from '../utils/emailGenerator';
import sendEmail from '../utils/smtp';

/**
 * Intiating a utility class to generate the HTML for an email.
 * See utils/emailGenerator.ts for more details.
 */
const htmlgen = new EmailGenerator({
    image: 'https://www.dreamstate.graphics/logo.png',
    name: 'Dream State',
    subtitle: '"Your bridge between dreams and reality"',
    message: 'Thank you for reaching out! I\'ll get back to you as quickly as I can.<br>- Kevin',
    websiteURL: 'https://www.dreamstate.graphics'
})

const contact = express.Router();

contact.route('/')
    /**
     * A basic GET route for our contact page.
     */
    .get((req, res) => {
        /**
         * Loading the server properties to be passed to the client side
         */
        const serverProps: ServerPropsType = {
            contactPageProps: {
                portfolioConfig: portfolioConfig
            }
        }

        /**
         * Rendering and serving the react file.
         * See utils/serveHtml.ts for more details.
         */
        res.status(200).send(serveHTML(<Contact ServerProps={serverProps}></Contact>, 'Contact', serverProps, {
            title: 'Dream State - Contact',
            name: 'Dream State',
            description: 'Contact forms to reach out to Dream State for general questions or product inquiries.',
            url: 'https://www.dreamstate.graphics/contact',
            image: 'https://www.dreamstate.graphics/favicon.png'
        }));
    })

/**
 * Intiating a utility class to test incoming request bodies against a series of regex tests.
 * See utils/regexTester.ts for more details.
 */
const generalFormTest = new RegexTester({
    Name: /^[\w\s]{1,300}/g,
    Email: /^[a-zA-Z0-9+_.-]{1,200}@[\w]{1,10}.[a-z]{1,6}/g,
    Message: /^[\d\w\s\-!@#$%^&*()_+-=\\\/?<>.,;:'"]{1,4000}/g
})

contact.route('/general')
    /**
     * The POST endpoint for the general contact form.
     */
    .post(async (req, res) => {
        /**
         * Running the regex test.
         */
        const result = generalFormTest.runTest(req.body);

        /**
         * If the return type is a string, that means it's an error message.
         */
        if(typeof result === 'string') {
            res.status(400).send({
                success: false,
                message: result
            });
            return;
        }

        /**
         * Otherwise if it's a success, we'll generate an email with the valid data from the request body.
         */
        const email = htmlgen.generateHTMLEmail('Your submission has been received! Here\'s what we got:', result);

        /**
         * Sending 2 emails via SMTP2GO.
         * One for the confirmation email, and one sent to me.
         * See utils/stmp.ts for more details.
         */
        const emailResult = await sendEmail({
            to: [{
                name: result.Name,
                email: result.Email
            }],
            fromName: 'Dream State Graphics',
            subject: 'Your Dream State Submission Has Been Received!',
            body: email
        }) && await sendEmail({
            to: [{
                name: 'Kevin Cox',
                email: process.env.MyEmail || ''
            }],
            fromName: 'Dream State Graphics',
            subject: 'You\'ve just recieved a new submission!',
            body: email
        });

        /**
         * Sending a response based on whether the emails successfully sent or not.
         */
        res.status(200).send(emailResult ? {
            success: true,
            message: 'Success! Check your email for a confirmation.'
        } : {
            success: false,
            message: 'Error: Email could not be sent. Contact server admin at kevin@dreamstate.graphics.'
        });
    })

/**
 * Intiating another utility class to test incoming request bodies against a series of regex tests.
 * See utils/regexTester.ts for more details.
 */
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
    /**
     * The POST endpoint for the inquiry form.
     */
    .post(async (req, res) => {
        /**
         * Running the regex test.
         */
        const result = inquiryFormTest.runTest(req.body);

        /**
         * If the return type is a string, that means it's an error message.
         */
        if(typeof result === 'string') {
            res.status(400).send({
                success: false,
                message: result
            });
            return;
        }

        /**
         * Otherwise if it's a success, we'll generate an email with the valid data from the request body.
         */
        const email = htmlgen.generateHTMLEmail('Your submission has been received! Here\'s what we got:', result);

        /**
         * Sending 2 emails via SMTP2GO.
         * One for the confirmation email, and one sent to me.
         * See utils/stmp.ts for more details.
         */
        const emailResult = await sendEmail({
            to: [{
                name: result.Name,
                email: result.Email
            }],
            fromName: 'Dream State Graphics',
            subject: 'Your Dream State Inquiry Has Been Received!',
            body: email
        }) && await sendEmail({
            to: [{
                name: 'Kevin Cox',
                email: process.env.MyEmail || ''
            }],
            fromName: 'Dream State Graphics',
            subject: 'You\'ve just recieved a new inquiry!',
            body: email
        });

        /**
         * Sending a response based on whether the emails successfully sent or not.
         */
        res.status(200).send(emailResult ? {
            success: true,
            message: 'Success! Check your email for a confirmation.'
        } : {
            success: false,
            message: 'Error: Email could not be sent. Contact server admin at kevin@dreamstate.graphics.'
        });
    });

export default contact;
import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';

/**
 * Creating express server to render our react components and return the HTML string to our python program.
 */

// Initializing the express server.
// this will listen to http://localhost:3001
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Declaration merging the window object to include "ServerProps". This is how we'll pass properties from the server to the client side.
declare global {
    interface Window {
        ServerProps: any;
    }
}

// Opening up the post route.
app.post('/', async (req, res) => {
    /**
     * Guard clause for required request body.
     */
    if( ! (
        req.body &&
        typeof req.body.pagePath === 'string'
    )) {
        res.status(400).send(`You must include a path to the page you're rendering`);
        return;
    }

    try {
        // Parsings the paths for included css files.
        const cssLinks:string[] = typeof req.body.cssLinks !== 'undefined'
            ? typeof req.body.cssLinks === 'string'
                ? [req.body.cssLinks]
                : Array.isArray(req.body.cssLinks)
                    ? req.body.cssLinks
                    : []
            : []

        // Parsing the path of the page to be rendered such that there's no extension.
        const pagePath = req.body.pagePath.includes('.tsx')
            ? req.body.pagePath.split('.tsx')[0]
            : req.body.pagePath;
        
        // Parsing the seoOptions object.
        const seoOptions = typeof req.body.seoOptions === 'object'
            ? req.body.seoOptions
            : {
                title: 'App',
                url: '',
                description: '',
                name: '',
                image: ''
            };

        // Using a dynamic import to get the default export 
        const {
            default: Component
        } = await import(`./${pagePath}`);

        // If there wasn't an export, return that it wasn't found. 
        if(!Component) {
            res.status(400).send(`${pagePath} does not have a function component as its default export.\n`);
            return;
        }

        // Rendering the component to a string.
        const renderedComponent = typeof req.body.serverProps === 'object'
            ? renderToString(<Component ServerProps={req.body.serverProps}/>)
            : renderToString(<Component/>);

        // Sending the result.
        res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${seoOptions.title}</title>
                    <meta property="og:title" content="${seoOptions.title}">
                    <meta name="description" content="${seoOptions.description}">
                    <meta property="og:description" content="${seoOptions.description}">
                    <meta property="og:site_name" content="${seoOptions.name}">
                    <meta property="og:url" content="${seoOptions.url}">
                    <meta property="og:image" content="${seoOptions.image}">
                    <link rel="canonical" href="${seoOptions.url}">
                    <link rel="icon" href="https://dreamstateospublic.s3.us-east-2.amazonaws.com/favicon.png" />
                    ${cssLinks.map(path => `<link rel="stylesheet" href="${path}"></link>`).join("")}
                    <script>window.ServerProps=${JSON.stringify(typeof req.body.serverProps === 'object' ? req.body.serverProps : {})}</script>

                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" integrity="sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet-src.min.js" integrity="sha512-3/WyQrhTdqSVmSifQS62akgtNBhZha2lS44TnoN9Jk3J01FvsKK4suVmz6t5FtccGb5iJw58GoFhBjPE5EPc8Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
                    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>
                </head>
            <body>
                <div id="root">${renderedComponent}</div>
                <script src="/static/js/${pagePath.split('/').pop()}.js"></script>
            </body>
            </html>
        `);
    }
    // If it fails, then we'll return the error.
    catch (e) {
        res.status(500).send(`${req.body.pagePath.toString()} could not be rendered:\n\n${e}`);
    }
});

app.listen(3001, () => console.log('Listening!'));
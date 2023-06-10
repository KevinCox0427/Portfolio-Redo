import express from "express";
import React from "react";
import serveHTML from "../utils/serveHTML";
import Page404 from "../pages/Page404";
import portfolioConfig from "../utils/portfolioConfig";

const route404 = express.Router();

route404.route('*')
    .get(async (_, res) => {
        /**
         * Creating the server properties to be passed to the client side
         */
        const serverProps: ServerPropsType = {
            page404Props: {
                portfolioConfig: portfolioConfig
            }
        }

        /**
         * Rendering and serving the react file.
         * See utils/serveHtml.ts for more details.
         */
        res.status(404).send(serveHTML(<Page404 ServerProps={serverProps}/>, 'Page404', serverProps)); 
    });

export default route404;
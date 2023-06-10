import express from "express";
import React from "react";
import serveHTML from "../utils/serveHTML";
import portfolioConfig from "../utils/portfolioConfig";
import Portfolio from "../pages/Portfolio";
import Project from "../pages/Project";

const portfolio = express.Router();

portfolio.route('/')
    /**
     * GET route to serve the portfolio page.
     */
    .get((req, res) => {
        /**
         * Loading the server properties to pass to the client side.
         */
        const serverProps:ServerPropsType = {
            portfolioPageProps: {
                portfolioConfig: portfolioConfig,
                currentTag: typeof req.query.tag === 'string' ? req.query.tag : 'all'
            }
        }

        /**
         * Rendering and serving the react file.
         * See utils/serveHtml.ts for more details.
         */
        res.status(200).send(serveHTML(<Portfolio ServerProps={serverProps}/>, 'Portfolio', serverProps, {
            title: 'Dream State - Portfolio',
            name: 'Dream State',
            description: 'A portfolio page of projects by the web developer and graphic designer Kevin Cox. Take a look, and see what I can do!',
            url: 'https://www.dreamstate.graphics/portfolio',
            image: 'https://www.dreamstate.graphics/favicon.png'
        }));
    })

portfolio.route('/:projectName')
    /**
     * GET route to serve a project page.
     */
    .get((req, res) => {
        /**
         * Finding the index of the project by its name given by the query parameter.
         */
        const portfolioIndex = portfolioConfig.reduce((previousIndex, currentProject, index) => {
            return currentProject.route === req.params.projectName ? index : previousIndex;
        }, -1);

        /**
         * If nothing was found, redirect to the 404 page.
         */
        if(portfolioIndex === -1) {
            res.status(302).redirect('/404');
            return;
        }

        /**
         * Loading the server properties to pass to the client side.
         */
        const serverProps:ServerPropsType = {
            projectPageProps: {
                portfolioConfig: portfolioConfig,
                projectIndex: portfolioIndex
            }
        }

        /**
         * Rendering and serving the react file.
         * See utils/serveHtml.ts for more details.
         */
        res.status(200).send(serveHTML(<Project ServerProps={serverProps}/>, 'Project', serverProps, {
            title: `Dream State - Project: ${portfolioConfig[portfolioIndex].name}`,
            name: 'Dream State',
            description: `A project for ${portfolioConfig[portfolioIndex].name} by the web developer and graphic designer Kevin Cox.`,
            url: `https://www.dreamstate.graphics/portfolio/${req.params.projectName}`,
            image: 'https://www.dreamstate.graphics/favicon.png'
        }));
    })

export default portfolio;
import express from "express";
import React from "react";
import serveHTML from "../utils/serveHTML";
import portfolioConfig from "../utils/portfolioConfig";
import Portfolio from "../pages/Portfolio";
import Project from "../pages/Project";


const portfolio = express.Router();


portfolio.route('/')
    .get((req, res) => {
        const serverProps:ServerPropsType = {
            portfolioPageProps: {
                portfolioConfig: portfolioConfig,
                currentTag: typeof req.query.tag === 'string' ? req.query.tag : 'all'
            }
        }

        res.status(200).send(serveHTML(<Portfolio ServerProps={serverProps}/>, 'Portfolio', serverProps, {
            title: 'Dream State - Portfolio',
            name: 'Dream State',
            description: 'A portfolio page of projects by the web developer and graphic designer Kevin Cox. Take a look, and see what I can do!',
            url: 'https://www.dreamstate.graphics/portfolio',
            image: 'https://www.dreamstate.graphics/favicon.png'
        }));
    })

portfolio.route('/:projectName')
    .get((req, res) => {
        if(portfolioConfig.every(project => project.route !== req.params.projectName)) {
            res.status(302).redirect('/404');
            return;
        }

        const portfolioIndex = portfolioConfig.reduce((previousIndex, currentProject, index) => {
            if(currentProject.route === req.params.projectName) return index;
            else return previousIndex;
        }, -1)

        const serverProps:ServerPropsType = {
            projectPageProps: {
                portfolioConfig: portfolioConfig,
                projectIndex: portfolioIndex
            }
        }

        res.status(200).send(serveHTML(<Project ServerProps={serverProps}/>, 'Project', serverProps, {
            title: `Dream State - Project: ${portfolioConfig[portfolioIndex].name}`,
            name: 'Dream State',
            description: `A project for ${portfolioConfig[portfolioIndex].name} by the web developer and graphic designer Kevin Cox.`,
            url: `https://www.dreamstate.graphics/portfolio/${req.params.projectName}`,
            image: 'https://www.dreamstate.graphics/favicon.png'
        }));
    })


export default portfolio;
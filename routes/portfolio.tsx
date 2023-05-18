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

        res.status(200).send(serveHTML(<Portfolio ServerProps={serverProps}/>, 'Portfolio', serverProps));
    })

portfolio.route('/:projectName')
    .get((req, res) => {
        if(portfolioConfig.every(project => project.route !== req.params.projectName)) {
            res.status(302).redirect('/404');
            return;
        }

        const serverProps:ServerPropsType = {
            projectPageProps: {
                portfolioConfig: portfolioConfig,
                projectIndex: portfolioConfig.reduce((previousIndex, currentProject, index) => {
                    if(currentProject.route === req.params.projectName) return index;
                    else return previousIndex;
                }, -1)
            }
        }

        res.status(200).send(serveHTML(<Project ServerProps={serverProps}/>, 'Project', serverProps));
    })


export default portfolio;
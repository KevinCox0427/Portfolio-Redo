import express from 'express';
import React from 'react';
import portfolioConfig from '../utils/portfolioConfig';
import serveHTML from '../utils/serveHTML';
import About from '../pages/About';
import axios from 'axios';
import dotenv from 'dotenv';

/**
 * Loading evironmental variables.
 */
dotenv.config();

const about = express.Router();

/**
 * Basic GET route for /about
 */
about.route('/')
    .get(async (req, res) => {
        let response;

        /**
         * Fetching my Github profile and most recent repos.
         */
        try {
            response = (await axios.get('https://api.github.com/users/KevinCox0427/repos?sort=pushed', {
                headers: {
                    "Authorization": `Bearer ${process.env.GithubAPIKey}`
                }
            })).data;
        }
        /**
         * If it fails just use my profile pic without any repos.
         */
        catch (e) {
            response = [{
                owner: {
                    avatar_url: '/assets/headshot.jpg',
                    login: 'KevinCox0427',
                    repos: []
                }
            }]
        }

        /**
         * Loading the server properties to be passed to the client side.
         */
        const serverProps: ServerPropsType = {
            aboutPageProps: {
                portfolioConfig: portfolioConfig,
                github: {
                    avatar: response[0].owner.avatar_url,
                    owner: response[0].owner.login,
                    repos: response.map((repo:any) => {
                        return {
                            name: repo.name,
                            url: repo.html_url,
                            description: repo.description,
                            language: repo.language,
                            topics: repo.topics,
                            pushed: repo.pushed_at
                        }
                    })
                }
            }
        }

        /**
         * Rendering and serving the react file.
         * See utils/serveHtml.ts for more details.
         */
        res.status(200).send(serveHTML(<About ServerProps={serverProps}></About>, 'About', serverProps, {
            title: 'Dream State - About',
            name: 'Dream State',
            description: 'About page for Kevin Cox. A holistic, ideas-driven developer that uses a diverse skill-set to supply any technical or graphical need.',
            url: 'https://www.dreamstate.graphics/about',
            image: 'https://www.dreamstate.graphics/favicon.png'
        }));
    })

/**
 * Making my resume available for download.
 */
about.route('/resume')
    .get(async (req, res) => {
        res.download('dist/public/assets/Resume Kevin Cox.pdf');
    });

export default about;
import express from 'express';
import React from 'react';
import portfolioConfig from '../utils/portfolioConfig';
import serveHTML from '../utils/serveHTML';
import About from '../pages/About';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const about = express.Router();

about.route('/')
    .get(async (req, res) => {
        let response;

        try {
            response = (await axios.get('https://api.github.com/users/KevinCox0427/repos?sort=pushed', {
                headers: {
                    "Authorization": `Bearer ${process.env.GithubAPIKey}`
                }
            })).data;
        }
        catch (e) {
            response = [{
                owner: {
                    avatar_url: '/assets/headshot.jpg',
                    login: 'KevinCox0427',
                    repos: []
                }
            }]
        }

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

        res.status(202).send(serveHTML(<About ServerProps={serverProps}></About>, 'About', serverProps));
    })

about.route('/resume')
    .get(async (req, res) => {
        res.download('dist/public/assets/Resume_Kevin_Cox.pdf');
    });

export default about;
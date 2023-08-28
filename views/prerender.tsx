import React, { ReactElement } from 'react';
import dotenv from 'dotenv';
import { renderToString } from 'react-dom/server';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import axios from 'axios';
import portfolioConfig from './portfolioConfig.json';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Page404 from './Page404/Page404';
import Portfolio from './Portfolio/Portfolio';
import Project from './Portfolio/Project';
import { Provider } from 'react-redux';
import { store } from './store/store';

dotenv.config();
renderPages();

async function renderPages() {
    // If html pages directory isn't made yet, make one.
    if(!existsSync('./public/html')) {
        mkdirSync('./public/html');
    }

    // Rendering all the pages for the website.

    /**
     * ************ ABOUT PAGE ************
     */
    
    // Making the request to github to get my recent repos.
    const githubRequest = (await axios.get('https://api.github.com/users/KevinCox0427/repos?sort=pushed', {
        headers: {
            "Authorization": `Bearer ${process.env.GithubAPIKey}`
        }
    })).data;

    // Parsing the repo data
    const githubData = {
        "avatar": githubRequest[0].owner.avatar_url,
        "owner": githubRequest[0].owner.login,
        "repos": githubRequest.map((repo:any) => {
            return {
                "name": repo.name,
                "url": repo.html_url,
                "description": repo.description,
                "language": repo.language,
                "topics": repo.topics,
                "pushed": repo.pushed_at
            }
        })
    }

    // Loading the About page props
    const aboutPageProps: AboutPageProps = {
        github: githubData
    }

    // Rendering the file.
    writeFileSync('./public/html/About.html', render(
        <React.StrictMode>
            <Provider store={store}>
                <About ServerProps={aboutPageProps} />
            </Provider>
        </React.StrictMode>,
        'About',
        { aboutPageProps: aboutPageProps },
        {
            "title": 'Dream State - About',
            "name": 'Dream State',
            "description": 'About page for Kevin Cox. A holistic, ideas-driven full stack developer and graphic designer that uses a diverse skill-set to supply any technical or graphical need.',
            "url": 'https://www.dreamstate.graphics/about',
            "image": 'https://www.dreamstate.graphics/static/assets/favicon.png'
        }
    ));

    /**
     * ************ CONTACT PAGE ************
     */

    // Rendering the file.
    writeFileSync('./public/html/Contact.html', render(
        <React.StrictMode>
            <Provider store={store}>
                <Contact />
            </Provider>
        </React.StrictMode>,
        'Contact',
        {},
        {
            "title": 'Dream State - Contact',
            "name": 'Dream State',
            "description": 'Contact forms to reach out to Dream State for general questions or product inquiries.',
            "url": 'https://www.dreamstate.graphics/contact',
            "image": 'https://www.dreamstate.graphics/static/assets/favicon.png'
        }
    ));

    /**
     * ************ HOME PAGE ************
     */

    // Loading the Server Props
    const homePageProps: HomePageProps = {
        domain: 'www.dreamstate.graphics'
    }

    // Rendering the file.
    writeFileSync('./public/html/Home.html', render(
        <React.StrictMode>
            <Provider store={store}>
                <Home ServerProps={homePageProps} />
            </Provider>
        </React.StrictMode>,
        'Home',
        { homePageProps: homePageProps },
        {
            "title": 'Dream State',
            "name": 'Dream State',
            "description": 'Your bridge between dreams and reality. A full stack web development and graphic design agency made by Kevin Cox. Take a look, and see what I can do!',
            "url": 'https://www.dreamstate.graphics/',
            "image": 'https://www.dreamstate.graphics/static/assets/favicon.png'
        }
    ));

    /**
     * ************ 404 PAGE ************
     */

    // Rendering the file.
    writeFileSync('./public/html/Page404.html', render(
        <React.StrictMode>
            <Page404 />
        </React.StrictMode>,
        'Page404',
        {},
        {
            "title": 'Dream State',
            "name": 'Dream State',
            "description": 'Your bridge between dreams and reality. A full stack web development and graphic design agency made by Kevin Cox. Take a look, and see what I can do!',
            "url": 'https://www.dreamstate.graphics/',
            "image": 'https://www.dreamstate.graphics/static/assets/favicon.png'
        }
    ));

    /**
     * ************ PORTFOLIO PAGE ************
     */

    // Rendering the file.
    writeFileSync('./public/html/Portfolio.html', render(
        <React.StrictMode>
            <Provider store={store}>
                <Portfolio/>
            </Provider>
        </React.StrictMode>,
        'Portfolio',
        {},
        {
            "title": 'Dream State - Portfolio',
            "name": 'Dream State',
            "description": 'A portfolio page of projects by the full stack web developer and graphic designer Kevin Cox. Take a look, and see what I can do!',
            "url": 'https://www.dreamstate.graphics/portfolio/',
            "image": 'https://www.dreamstate.graphics/static/assets/favicon.png'
        }
    ));

    /**
     * ************ PROJECT PAGES ************
     */

    // Looping through each portofolio project to render the page.
    portfolioConfig.forEach((project, i) => {
        // Loading the Server Props
        const projectPageProps: ProjectPageProps = {
            projectIndex: i
        }

        // Rendering the file.
        writeFileSync(`./public/html/${encodeURIComponent(project.name)}.html`, render(
            <React.StrictMode>
                <Provider store={store}>
                    <Project ServerProps={projectPageProps} />
                </Provider>
            </React.StrictMode>,
            'Project',
            { projectPageProps: projectPageProps },
            {
                "title": `Dream State - ${project.name}`,
                "name": 'Dream State',
                "description": `A project for ${project.name} by the full stack web developer and graphic designer Kevin Cox.`,
                "url": `https://www.dreamstate.graphics/portfolio/${encodeURIComponent(project.name)}`,
                "image": 'https://www.dreamstate.graphics/favicon.png'
            }
        ));
    })
}

/**
 * This is our HTML document that will be rendered from a react component.
 * Server Props will be stringified and attatched to the Window object.
 * @param reactComponent The JSX component to be rendered.
 * @param fileName The name of the CSS and JS files to be sent to the client (should be the same).
 * @param ServerProps (Optional) Allows us to pass any properties from the server to the client. This is done by parsing it into a JSON string and attaching it to the client's window.
 * @param seoOptions (Optional) Decides how to render the meta tags in the header for SEO purposes.
 */
function render(reactComponent:ReactElement<any>, fileName:string, inputServerProps:Partial<ServerProps> = {}, seoOptions: {
    title: string,
    url: string,
    description: string,
    name: string,
    image: string
} = {
    title: '',
    url: '',
    description: '',
    name: '',
    image: ''
}) {
    return (
        `<!DOCTYPE html>
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
            <link rel="stylesheet" type="text/css" href="/css/${fileName}.css">
            <link rel="stylesheet" type="text/css" href="/css/globals.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <script>window.ServerProps=${JSON.stringify(inputServerProps)}</script>
            ${fileName === 'Home' 
                ? `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" integrity="sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet-src.min.js" integrity="sha512-3/WyQrhTdqSVmSifQS62akgtNBhZha2lS44TnoN9Jk3J01FvsKK4suVmz6t5FtccGb5iJw58GoFhBjPE5EPc8Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
                <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>`
                : ''}
        </head>
        <body>
            <div id="root">${renderToString(reactComponent)}</div>
            <script type="module" src="/js/${fileName}.js"></script> 
        </body>
        </html>`
    );
}
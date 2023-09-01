import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadFromCache from "../components/LoadFromCache";
import Resume from "./Resume";
import { Provider } from "react-redux";
import { store } from "../store/store";

// Declaring what properties this page should inherited from the server.
declare global {
    type AboutPageProps = {
        github: {
            owner: string,
            avatar: string,
            repos: {
                name: string,
                url: string,
                description: string,
                language: string,
                topics: string[],
                pushed: string
            }[]
        }
    }
}

type Props = {
    ServerProps: AboutPageProps
}

/**
 * A React page that will render the about page. This is being rendered on the server and hydrated on the client.
 * @param github Data collected on my github account to properly render my most recent repositories.
 */
const About: FunctionComponent<Props> = (props) => {
    // Making sure we inherit the properties from the server.
    const pageProps = props.ServerProps;
    if(typeof pageProps === 'undefined') return <></>;
    
    return <>
        <LoadFromCache currentPage="about"></LoadFromCache>
        <Header></Header>
        <div className="Contain" id="About">
            <article className="Grid">
                <div className="Top">
                    <h1 className="Title">About Me</h1>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/O9ws-17-x5w?si=R4OZIWqSiwY5jOHR"
                        title="Full Stack Developer Introduction - Kevin Cox"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                    </div>
                <div className="Left">
                    <h2 className="Title">
                        My Resume
                        <a href="/about/resume">Download PDF</a>
                    </h2>
                    <Resume></Resume>
                </div>
                <div className="Right">
                    <h2 className="Title">My Socials</h2>
                    <div className="LinkedIn">
                        <div className="LinkedInTop">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 84 21" preserveAspectRatio="xMinYMin meet" version="1.1">
                                <path d="M82.479,0 L64.583,0 C63.727,0 63,0.677 63,1.511 L63,19.488 C63,20.323 63.477,21 64.333,21 L82.229,21 C83.086,21 84,20.323 84,19.488 L84,1.511 C84,0.677 83.336,0 82.479,0 Z M71,8 L73.827,8 L73.827,9.441 L73.858,9.441 C74.289,8.664 75.562,7.875 77.136,7.875 C80.157,7.875 81,9.479 81,12.45 L81,18 L78,18 L78,12.997 C78,11.667 77.469,10.5 76.227,10.5 C74.719,10.5 74,11.521 74,13.197 L74,18 L71,18 L71,8 Z M66,18 L69,18 L69,8 L66,8 L66,18 Z M69.375,4.5 C69.375,5.536 68.536,6.375 67.5,6.375 C66.464,6.375 65.625,5.536 65.625,4.5 C65.625,3.464 66.464,2.625 67.5,2.625 C68.536,2.625 69.375,3.464 69.375,4.5 Z" fill="#ffffff" fillRule="evenodd"></path>
                                <path d="M60,18 L57.2,18 L57.2,16.809 L57.17,16.809 C56.547,17.531 55.465,18.125 53.631,18.125 C51.131,18.125 48.978,16.244 48.978,13.011 C48.978,9.931 51.1,7.875 53.725,7.875 C55.35,7.875 56.359,8.453 56.97,9.191 L57,9.191 L57,3 L60,3 L60,18 Z M54.479,10.125 C52.764,10.125 51.8,11.348 51.8,12.974 C51.8,14.601 52.764,15.875 54.479,15.875 C56.196,15.875 57.2,14.634 57.2,12.974 C57.2,11.268 56.196,10.125 54.479,10.125 L54.479,10.125 Z" fill="#ffffff"></path>
                                <path d="M47.6611,16.3889 C46.9531,17.3059 45.4951,18.1249 43.1411,18.1249 C40.0001,18.1249 38.0001,16.0459 38.0001,12.7779 C38.0001,9.8749 39.8121,7.8749 43.2291,7.8749 C46.1801,7.8749 48.0001,9.8129 48.0001,13.2219 C48.0001,13.5629 47.9451,13.8999 47.9451,13.8999 L40.8311,13.8999 L40.8481,14.2089 C41.0451,15.0709 41.6961,16.1249 43.1901,16.1249 C44.4941,16.1249 45.3881,15.4239 45.7921,14.8749 L47.6611,16.3889 Z M45.1131,11.9999 C45.1331,10.9449 44.3591,9.8749 43.1391,9.8749 C41.6871,9.8749 40.9121,11.0089 40.8311,11.9999 L45.1131,11.9999 Z" fill="#ffffff"></path>
                                <polygon fill="#ffffff" points="38 8 34.5 8 31 12 31 3 28 3 28 18 31 18 31 13 34.699 18 38.241 18 34 12.533"></polygon>
                                <path d="M16,8 L18.827,8 L18.827,9.441 L18.858,9.441 C19.289,8.664 20.562,7.875 22.136,7.875 C25.157,7.875 26,9.792 26,12.45 L26,18 L23,18 L23,12.997 C23,11.525 22.469,10.5 21.227,10.5 C19.719,10.5 19,11.694 19,13.197 L19,18 L16,18 L16,8 Z" fill="#ffffff"></path>
                                <path d="M11,18 L14,18 L14,8 L11,8 L11,18 Z M12.501,6.3 C13.495,6.3 14.3,5.494 14.3,4.5 C14.3,3.506 13.495,2.7 12.501,2.7 C11.508,2.7 10.7,3.506 10.7,4.5 C10.7,5.494 11.508,6.3 12.501,6.3 Z" fill="#ffffff"></path>
                                <polygon fill="#ffffff" points="3 3 0 3 0 18 9 18 9 15 3 15"></polygon>
                            </svg>
                        </div>
                        <div className="LinkedInBottom">
                            <img src="https://dreamstateospublic.s3.us-east-2.amazonaws.com/headshot.jpg" loading="lazy"></img>
                            <h3>Kevin Cox</h3>
                            <h4>Full-Stack Web Developer & Graphic Designer</h4>
                            <a href="https://www.linkedin.com/school/binghamton-university/?trk=public-profile-badge-profile-badge_school-name" target="_blank">
                                <h4>Binghamton University</h4>
                            </a>
                            <a className="Button" href="https://www.linkedin.com/in/kevincox0427?trk=public-profile-badge-profile-badge-view-profile-cta" target="_blank">View profile</a>
                        </div>
                    </div>
                    <div className="Github">
                        <div className="TopRow">
                            <a className="Logo" href="https://github.com/" target="_blank">
                                <svg viewBox="0 0 16 16">
                                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                                </svg>
                                <h3>Github</h3>
                            </a>
                            <a href={`https://github.com/${pageProps.github.owner}`} target="_blank">
                                <h2>{pageProps.github.owner}</h2>
                            </a>
                            <img src={pageProps.github.avatar} loading="lazy"></img>
                        </div>
                        <div className="Repos">{
                            pageProps.github.repos.map((repo, i) => {
                                return <div key={i} className="Repo">
                                    <div className="RepoLeft">
                                        <a href={`https://github.com/${pageProps!.github.owner}/${repo.name}`}>
                                            <h3>{repo.name}</h3>
                                        </a>
                                        <p className="Description">{repo.description}</p>
                                        {repo.topics.length > 0
                                            ? <div className="Topics">{
                                                repo.topics.map((topic, j) => {
                                                    return <p key={j}>{topic}</p>
                                                })
                                            }</div>
                                            : <></>
                                        }
                                    </div>
                                    <div className="RepoRight">
                                        <p>Main Language: <span>{repo.language}</span></p>
                                        <p>Last Push: <span>{(new Date(repo.pushed)).toDateString()}</span></p>
                                    </div>
                                </div>
                            })
                        }</div>
                    </div>
                </div>
            </article>
        </div>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') {
    hydrateRoot(
        document.getElementById('root') as HTMLElement,
        <React.StrictMode>
            <Provider store={store}>
                <About ServerProps={window.ServerProps.aboutPageProps!} />
            </Provider>
        </React.StrictMode>
    );
}

export default About;
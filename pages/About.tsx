import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./parts/Header";
import Footer from "./parts/Footer";

declare global {
    type AboutPageProps = {
        portfolioConfig: PortfolioConfig[],
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
    ServerProps: ServerPropsType
}

const About: FunctionComponent<Props> = (props) => {
    if(typeof props.ServerProps.aboutPageProps === 'undefined') return <></>;
    
    return <>
        <Header></Header>
        <main className="Contain">
            <h1 className="Title">About Me</h1>
            <div className="AboutMe">
                <img src="/assets/profile.jpg"></img>
                <div className="Description">
                    <p>Hey! My name is Kevin Cox, and I'm a full-stack developer and graphic designer from New York.</p>
                    <p></p>
                </div>
            </div>
            <div className="Grid">
                <div className="Left">
                    <h2 className="Title">
                        My Resume
                        <a href="/about/resume">Download PDF</a>
                    </h2>
                    <div className="Resume">
                        <div className="Column">
                            <div className="Section Description">
                                <h3 className="Heading">Full-Stack Web Developer & Graphic Designer</h3>
                                <div className="HighligherWrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164.9 33.19"><path fill="#ffeeb2" d="m127.3,32.44c-.22-.14-.48-.43-.66-.4-3.39.53-6.8.66-10.24.47-5.17-.28-10.33-.54-15.5-.85-.25-.01-1.67.25-.62-.68-.26-.1-.54-.32-.79-.29-.5.05-1.31.12-1.42.36-.69,1.47-2.56,1.68-3.8,1.55-5.86-.6-11.79-.7-17.65-1.08-3.91-.26-8.15.33-12.17.04-6.83-.49-13.6.3-20.41,0-1.81-.08-3.66.63-5.51.79-2.11.18-4.27.3-6.3-.46-3.35-1.27-6.76-.27-10.16-.27-5.03,0-9.78,1.25-14.7,1.54-4.01.24-6.67-2.69-7.07-7.62C.12,22.87.1,20.18,0,17.49c-.04-1.27.58-2.52,1.93-2.98,4.38-1.48,2.03-4.17,1.9-6.35-.13-2.09-.29-4.05,2.51-5.03,1.12-.39,2.83-.26,3.77-.16,3.77.38,7.08-1.01,10.72-1.13,6.62-.23,13.2-.54,19.85-.54,3.86,0,7.75-1.56,11.82-1.26,3.29.25,6.54.91,9.83,1,6.5.18,13.03-.1,19.51.25,1.97.11,4.35,1.46,6.02.57,3-1.59,5.95.61,8.76-.46.29-.11.8.14,1.21.23-.36.07-.79.06-1.07.22-.78.45-2.73-.62-2.47,1.17-1.09-.09-2.38.08-3.23-.33-1.22-.59-2.2-.14-3.24.01-.6.09-1.13.47-1.69.71.08.06.15.17.24.17.82.04,2.11.34,2.38.05.68-.73,1.36-.17,1.97-.23.58-.06,1.22.35,1.84.36,1.14.03,2.46-.38,3.39-.05,2.69.96,4.77-1.4,7.32-.61,0-.13.06-.34-.01-.37-.42-.19-.88-.35-1.32-.51.83-.33,1.75-1.03,2.47-.91,3.61.6,7.22.21,10.82.24.1,0,.2.03.3.04-.14.07-.28.19-.43.19-1.21.03-2.42.06-3.63.05-.74,0-1.64-.43-1.82.65-.03.15-.96.37-1.38.28-.84-.18-.22-.46.06-.69,0,0-.15-.2-.24-.2-1.47-.06-2.95-.1-4.42-.15.12.24.33.47.36.71.15,1.83,2.01,1.45,3.31,1.47,4.88.05,9.77-.02,14.66-.06.17,0,.35-.16.52-.25-.46-.25-1.34-.08-1.31-.82.91.29,1.8.79,2.73.84,2.62.14,5.27.23,7.88.1,8.76-.46,17.5-1.12,26.27-1.47,1.7-.07.37-1.82,1.71-1.36,1.71.58,3.02,1.37,3.19,3.22.33,3.66.36,7.35,1.78,10.95.69,1.75-.8,3.95-2.58,4.68-3.52,1.45-1.12,3.34-1.24,4.97-.17,2.38.72,5-3.09,6.16-.57.17-1.3-.01-1.96.01-6.98.28-14.07.1-20.88,1.11-2.65.39-5.28-.78-7.67.44h0ZM79.91,3.45s.51-.1.6-.75c.1-.72-.64-.84-1.19-.81-3.61.23-7.21.5-10.81.8-.43.04-.84.32-1.25.49.48.06.95.16,1.43.18,1.21.04,2.42.05,3.64.06,2.29.01,4.58.02,7.59.03Zm-49.5.05c1.53.1,2.57-.55,3.54-1.32-.73-.02-1.51-.19-2.16-.03-1.01.25-1.93.72-2.89,1.09.5.09,1.01.17,1.51.26Zm14.89-1.23c-1.71-.27-2.16-.09-1.93.33.87,1.64,2.67-.21,3.82.58.07.05.39-.12.59-.18-1.2-.35-2.4-.7-2.48-.72ZM5.39,31.88c-.69-.6-1.3-1.12-1.91-1.65-.12.21-.39.57-.33.62.61.41,1.27.77,1.93,1.12.05.03.21-.06.31-.09ZM7.74,4.69c.2-.18.36-.33.53-.48-.14-.07-.34-.21-.39-.18-.23.12-.41.29-.61.45.12.06.24.11.48.21Z"/></svg>
                                    <h2>Kevin Cox</h2>
                                </div>
                                <p>A holistic, ideas-driven developer that uses a diverse skill-set to supply any technical or graphical need. A firm believer in requiring a foundational understanding of web technologies and project ideas to provide a wide array of user-oriented solutions, while remaining framework agnostic. Specializes in scaling the branding and web operations of small to medium sized businesses, but is comfortable in large production environments. Can work with vibes, or APIs.</p>
                            </div>
                            <div className="Section Education">
                                <h3 className="Heading">Education</h3>
                                <div className="Degree">
                                    <h4>BFA Graphic Design</h4>
                                    <p>2018-22 | Binghamton University</p>
                                </div>
                            </div>
                            <div className="Section Experience">
                                <h3 className="Heading">Experience</h3>
                                <div className="Job">
                                    <h4>Lead Developer</h4>
                                    <span>Red Barn Technology Group  |  Binghamton, NY  |  Jun. 2022 - Jun. 2023</span>
                                    <p>Designed, developed, and managed a team of 5 to serve and maintain 7 on-going clients. Led and developed a middleware server to integrate a new open-source ERP software for their internal departments into web  portals. Maintained, supported and repaired previous clients’ projects.</p>
                                </div>
                                <div className="Job">
                                    <h4>Web Developer Intern</h4>
                                    <span>FPS Apparel  |  Chester, NY  |  Jun. 2021 - Aug. 2021</span>
                                    <p>Assessed and advised their technology stack for optimization and additions for internal operations. Created graphics and maintained their Shopify storefront. Jump-started a new software integration, Ziflow, for clients to provide feedback on top of their mocked-up apparel designs.</p>
                                </div>
                                <div className="Job">
                                    <h4>Web-Dev / Graphics Freelancer</h4>
                                    <span>Dream State Graphics  |  New York, NY  |  Jan. 2021 - Current</span>
                                    <p>My own freelancing company that takes on any graphical or web-based projects. Projects included a menu for a local diner, a website for a pool company to take inquiries, and a teaching application where teachers can create a “teaching map” to overlay a student commenting system.</p>
                                </div>
                            </div>
                        </div>
                        <div className="Column">
                            <div className="Section Info">
                                <div className="ImageWrapper">
                                    <div className="Outline"></div>
                                    <img src="/assets/headshotBW.jpeg"></img>
                                </div>
                                <div className="InfoWrapper">
                                    <div className="Link">
                                        <h3>Website</h3>
                                        <a href="https://dreamstate.graphics">https://dreamstate.graphics</a>
                                    </div>
                                    <div className="Link">
                                        <h3>Email</h3>
                                        <a href="https://dreamstate.graphics">kevin@dreamstate.graphics</a>
                                    </div>
                                    <div className="Link">
                                        <h3>Phone</h3>
                                        <a href="https://dreamstate.graphics">(845) 649-7476</a>
                                    </div>
                                    <div className="Link">
                                        <h3>Area</h3>
                                        <p>New York</p>
                                    </div>
                                </div>
                            </div>
                            <div className="Section Skills">
                                <h3 className="Heading">Skills</h3>
                                <div className="SkillsWrapper">
                                    <div className="Skill">
                                        <h4>Front-end Development</h4>
                                        <p>HTML, CSS, SASS, JavaScript, JQuery, TypeScript, React.JS, Angular.JS, JS Libraries (ex. Leaflet.JS, Quill.JS)</p>
                                    </div>
                                    <div className="Skill">
                                        <h4>Back-end Development</h4>
                                        <p>Node.JS, Express.JS, C#, .NET, PHP, WordPress, AWS, Server-side Rendering, Routing, Authentication Procedures, User Session Management</p>
                                    </div>
                                    <div className="Skill">
                                        <h4>Graphic Design</h4>
                                        <p>UI / UX, Vector Graphics, Raster Graphics, Motion Graphics, Mock-ups Photography, Illustrator, Photoshop, After Effects, XD, Figma</p>
                                    </div>
                                    <div className="Skill">
                                        <h4>Database Design / Development</h4>
                                        <p>SQL, NoSQL, MongoDB, MySQL, Postgres, Analytics, Query Optimization, ORM abstractions</p>
                                    </div>
                                    <div className="Skill">
                                        <h4>API Development / Integrations</h4>
                                        <p>REST, SOAP, GraphQL, RPC, Effective Data Sanitization,  End-Point Throttling</p>
                                    </div>
                                    <div className="Skill">
                                        <h4>Project Management</h4>
                                        <p>Great communication skills, Converts ideas into technical projects and vice versa, Great client engagement with mock-ups and demos, Gives accurate options, solutions and estimates.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Right">
                    <h2 className="Title">My Socials</h2>
                    <div className="LinkedIn">
                        <div className="Top">
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
                        <div className="Bottom">
                            <img src="/assets/headshot.jpg"></img>
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
                            <a href={`https://github.com/${props.ServerProps.aboutPageProps.github.owner}`} target="_blank"><h2>{props.ServerProps.aboutPageProps.github.owner}</h2></a>
                            <img src={props.ServerProps.aboutPageProps.github.avatar}></img>
                        </div>
                        <div className="Repos">{
                            props.ServerProps.aboutPageProps.github.repos.map((repo, i) => {
                                return <div key={i} className="Repo">
                                    <div className="RepoLeft">
                                        <a href={`https://github.com/${props.ServerProps.aboutPageProps!.github.owner}/${repo.name}`}>
                                            <h3>{repo.name}</h3>
                                        </a>
                                        <p className="Description">{repo.description}</p>
                                        {repo.topics.length > 0 ? <div className="Topics">{
                                            repo.topics.map((topic, j) => {
                                                return <p key={j}>{topic}</p>
                                            })
                                        }</div> : <></>}
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
            </div>
        </main>
        <Footer portfolioConfig={props.ServerProps.aboutPageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <About ServerProps={window.ServerProps} />);

export default About;
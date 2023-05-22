import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./parts/Header";
import Footer from "./parts/Footer";

declare global {
    type AboutPageProps = {
        portfolioConfig: PortfolioConfig[]
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
            <h1>About</h1>
            <div className="AboutMe">
                <img src="/assets/headshot.jpg"></img>
                <div className="Description">
                    <p>Hey! My name is Kevin Cox, and I'm a full-stack developer and graphic designer from New York.</p>
                    <p></p>
                </div>
            </div>
            <div className="Grid">
                <div className="Left"></div>
                <div className="Right">
                    <div className="Github"></div>
                    <div className="LinkedIn">
                        <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
                        <div className="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="dark" data-vanity="kevincox0427"><a className="LI-simple-link" href='https://www.linkedin.com/in/kevincox0427?trk=profile-badge'>Kevin Cox</a></div>
                    </div>
                </div>
            </div>
        </main>
        <Footer portfolioConfig={props.ServerProps.aboutPageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <About ServerProps={window.ServerProps} />);

export default About;
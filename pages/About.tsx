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
                    <p>I enjoy eating ass</p>
                </div>
            </div>
            <div></div>
        </main>
        <Footer portfolioConfig={props.ServerProps.aboutPageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <About ServerProps={window.ServerProps} />);

export default About;
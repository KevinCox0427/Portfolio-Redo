import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./parts/Header";
import Footer from "./parts/Footer";

declare global {
    type ProjectPageProps = {
        portfolioConfig: PortfolioConfig[],
        projectIndex: number
    }
}

type Props = {
    ServerProps: ServerPropsType
}

const Project: FunctionComponent<Props> = (props) => {
    if(typeof props.ServerProps.projectPageProps === 'undefined') return <></>
    
    return <>
        <Header></Header>
        <main>
            
        </main>
        <Footer portfolioConfig={props.ServerProps.projectPageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Project ServerProps={window.ServerProps} />);

export default Project;
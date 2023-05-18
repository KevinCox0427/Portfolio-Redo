import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./parts/Header";
import Footer from "./parts/Footer";

declare global {
    type ContactPageProps = {
        portfolioConfig: PortfolioConfig[]
    }
}

type Props = {
    ServerProps: ServerPropsType
}

const Contact: FunctionComponent<Props> = (props) => {
    if(typeof props.ServerProps.contactPageProps === 'undefined') return <></>;

    return <>
        <Header></Header>
        <main>
            
        </main>
        <Footer portfolioConfig={props.ServerProps.contactPageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Contact ServerProps={window.ServerProps} />);

export default Contact;
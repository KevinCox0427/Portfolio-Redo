import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Footer from "./components/Footer";
import Header from "./components/Header";

declare global {
    type Page404Props = {
        portfolioConfig: PortfolioConfig[]
    }
}

type Props = {
    ServerProps: ServerPropsType
}

const Page404:FunctionComponent<Props> = (props) => {
    if(typeof props.ServerProps.page404Props === 'undefined') return <></>

    return <>
        <Header></Header>
        <main className="contain">
            <h1>Error: Page Not Found</h1>
        </main>
        <Footer portfolioConfig={props.ServerProps.page404Props.portfolioConfig}></Footer>
    </>
}

if(typeof window != 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Page404 ServerProps={window.ServerProps}/>);

export default Page404;
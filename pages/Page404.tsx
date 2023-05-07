import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Footer from "./parts/Footer";
import Header from "./parts/Header";

type Props = {
    ServerProps: ServerPropsType
}

const Page404:FunctionComponent<Props> = (props) => {
    return <>
        <Header></Header>
        <main className="contain">
            <h1>Error: Page Not Found</h1>
        </main>
        <Footer portfolioConfig={props.ServerProps.portfolioConfig ? props.ServerProps.portfolioConfig : []}></Footer>
    </>
}

if(typeof window != 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Page404 ServerProps={window.ServerProps}/>);

export default Page404;
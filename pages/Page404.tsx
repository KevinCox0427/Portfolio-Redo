import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Footer from "./parts/Footer";
import Header from "./parts/Header";

const Page404:FunctionComponent = () => {
    return <>
        <Header></Header>
        <main className="contain">
            <h1>Error: Page Not Found</h1>
        </main>
        <Footer></Footer>
    </>
}

if(typeof window != 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Page404/>);

export default Page404;
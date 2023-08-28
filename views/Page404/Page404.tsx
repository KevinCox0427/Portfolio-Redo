import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Footer from "../components/Footer";
import Header from "../components/Header";

/**
 * A React page that will render a 404 page. This is being rendered on the server and hydrated on the client.
 * @param portfolioConfig The configuration of the portfolio to render its content appropriately.
 */
const Page404:FunctionComponent = () => {
    return <>
        <Header></Header>
        <div className="Contain" id="Page404">
            <h1>Error: Page Not Found</h1>
        </div>
        <Footer></Footer>
    </>
}

if(typeof window != 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Page404/>);

export default Page404;
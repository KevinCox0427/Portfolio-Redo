import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Footer from "./components/Footer";
import Header from "./components/Header";

/**
 * Declaring globally what properties this page should inherited from the server under "Page404Props".
 */
declare global {
    type Page404Props = {
        portfolioConfig: PortfolioConfig[]
    }
}

type Props = {
    ServerProps: ServerPropsType
}

/**
 * A React page that will render a 404 page. This is being rendered on the server and hydrated on the client.
 * 
 * @param portfolioConfig The configuration of the portfolio to render its content appropriately.
 */
const Page404:FunctionComponent<Props> = (props) => {
    /**
     * Making sure we inherit the properties from the server.
     */
    const pageProps = props.ServerProps.contactPageProps;
    if(typeof pageProps === 'undefined') return <></>

    return <>
        <Header></Header>
        <div className="contain">
            <h1>Error: Page Not Found</h1>
        </div>
        <Footer portfolioConfig={pageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window != 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Page404 ServerProps={window.ServerProps}/>);

export default Page404;
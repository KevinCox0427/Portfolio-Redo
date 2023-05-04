import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./parts/Header";
import Footer from "./parts/Footer";

type Props = {
    ServerProps: ServerPropsType
}

const Portfolio: FunctionComponent<Props> = (props) => {
    
    return <>
        <Header></Header>
        <main>
            <h1>My Portfolio Projects</h1>
        </main>
        <Footer></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Portfolio ServerProps={window.ServerProps} />);

export default Portfolio;
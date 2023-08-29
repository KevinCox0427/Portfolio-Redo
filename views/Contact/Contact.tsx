import React, { FunctionComponent, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddPageView from "../components/AddPageView";
import GeneralContactForm from "./GeneralContactForm";
import InquiryForm from "./InquiryForm";
import { Provider } from "react-redux";
import { store } from "../store/store";

/**
 * A React page that will render the about page. This is being rendered on the server and hydrated on the client.
 */
const Contact: FunctionComponent = () => {
    // A function to resize all text areas to wrap its content on page load.
    useEffect(() => {
        const textareas = Array.from(document.getElementsByTagName('textarea')) as HTMLTextAreaElement[];
        textareas.forEach(elmnt => {
            elmnt.style.height = `0px`;
            elmnt.style.height = `${elmnt.scrollHeight - 20}px`;
        })
    }, []);

    return <>
        <AddPageView></AddPageView>
        <Header></Header>
        <div className="Contain" id="Contact">
            <h1 style={{display: 'none'}}>Contact</h1>
            <GeneralContactForm></GeneralContactForm>
            <InquiryForm></InquiryForm>
        </div>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') {
    hydrateRoot(
        document.getElementById('root') as HTMLElement,
        <React.StrictMode>
            <Provider store={store}>
                <Contact />
            </Provider>
        </React.StrictMode>
    );
}

export default Contact;
import React, { FunctionComponent, useState } from "react";
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

    const [contactForm, setContactForm] = useState({
        error: '',
        isLoading: false,
        data: {
            name: '',
            email: '',
            message: ''
        }
    });

    const [inquiryForm, setInquiryForm] = useState({
        error: '',
        isLoading: false,
        data: {
            name: '',
            email: '',
            phone: '',
            message: ''
        }
    });

    return <>
        <Header></Header>
        <main className="Contain">
            <h2>General Contact Form</h2>
            <form>
                <div className="InputWrapper">
                    <input placeholder=" " id="generalName" value={contactForm.data.name} onChange={e => {
                        setContactForm(oldContact => {
                            return {...oldContact,
                                data: {...oldContact.data,
                                    name: e.target.value
                                },
                                error: ''
                            }
                        });
                    }}></input>
                    <label htmlFor="generalName">Name:</label>
                </div>
                <div className="InputWrapper">
                    <input placeholder=" " id="generalEmail" value={contactForm.data.email} onChange={e => {
                        setContactForm(oldContact => {
                            return {...oldContact,
                                data: {...oldContact.data,
                                    email: e.target.value
                                },
                                error: ''
                            }
                        });
                    }}></input>
                    <label htmlFor="generalEmail">Email:</label>
                </div>
                <div className="TextareaWrapper">
                    <label htmlFor="generalMessage">Message:</label>
                    <textarea placeholder=" " id="generalMessage" value={contactForm.data.message} onChange={e => {
                        setContactForm(oldContact => {
                            return {...oldContact,
                                data: {...oldContact.data,
                                    message: e.target.value
                                },
                                error: ''
                            }
                        });
                    }}></textarea>
                </div>
            </form>
            <h2>Inquiry Form</h2>
            <form>

            </form>
        </main>
        <Footer portfolioConfig={props.ServerProps.contactPageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Contact ServerProps={window.ServerProps} />);

export default Contact;
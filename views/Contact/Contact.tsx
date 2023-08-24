import React, { FunctionComponent, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddPageView from "../components/AddPageView";

// Declaring what properties this page should inherited from the server.
declare global {
    type ContactPageProps = {
        portfolioConfig: PortfolioConfig[]
    }
}

type Props = {
    ServerProps: ContactPageProps
}

/**
 * A React page that will render the about page. This is being rendered on the server and hydrated on the client.
 * @param portfolioConfig The configuration of the portfolio to render its content appropriately.
 */
const Contact: FunctionComponent<Props> = (props) => {
    // Making sure we inherit the properties from the server.
    const pageProps = props.ServerProps;
    if(typeof pageProps === 'undefined') return <></>;

    // Keeping state for inputted values, error messages, and submission for the general contact form.
    const [contactForm, setContactForm] = useState({
        error: {
            success: false,
            message: ''
        },
        isLoading: false,
        data: {
            "Name": '',
            "Email": '',
            "Message": ''
        }
    });

    /**
     * Event handler to update the values on the contact form.
     * Also resets any error messages.
     * @param key The field being overwritten.
     */
    function handleContactFormInput(key:"Name" | "Email" | "Message", e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setContactForm(oldContact => {
            return {...oldContact,
                data: {...oldContact.data,
                    [key]: e.target.value
                },
                error: {
                    success: false,
                    message: ''
                }
            }
        });
        // If it's a textarea, resize it to wrap around the text.
        if(e.target.tagName === 'TEXTAREA') {
            e.target.style.height = `0px`;
            e.target.style.height = `${e.target.scrollHeight - 20}px`;
        }
    }

    // Event handler to submit the contact form's content and display the server's response in the error message.
    async function generalSubmit(e:React.MouseEvent) {
        // Preventing default so page doesn't reload.
        e.preventDefault();

        // Setting state to have a loading icon.
        setContactForm(oldContactForm => {
            return {...oldContactForm,
                isLoading: true
            }
        });

        // Making the POST request.
        const response = await (await fetch('/contact/general', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactForm.data)
        })).json();

        // Setting state to remove loading icon and display the message from the server,
        setContactForm(oldContactForm => {
            return {...oldContactForm,
                isLoading: false,
                error: response
            }
        });
    }

    // Keeping state for inputted values, error messages, and submission for the inquiry form.
    const [inquiryForm, setInquiryForm] = useState<{
        error: {
            success: boolean,
            message: string
        },
        isLoading: boolean,
        data: {
            "Name": string,
            "Email": string,
            "Phone": string,
            "Start Date": string,
            "End Date": string,
            "Availability": string,
            "Needs": string[],
            "Additional Notes": string
        }
    }>({
        error: {
            success: false,
            message: ''
        },
        isLoading: false,
        data: {
            "Name": '',
            "Email": '',
            "Phone": '',
            "Start Date": '',
            "End Date": '',
            "Availability": '',
            "Needs": [],
            "Additional Notes": ''
        }
    });

    /**
     * Event handler to update the values on the inquiry form.
     * Also resets any error messages.
     * @param key The field being overwritten.
     */
    function handleInquiryFormInput(key:"Name" | "Email" | "Phone" | "Start Date" | "End Date" | "Availability" | "Additional Notes", e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setInquiryForm(oldContact => {
            return {...oldContact,
                data: {...oldContact.data,
                    [key]: e.target.value
                },
                error: {
                    success: false,
                    message: ''
                }
            }
        });
        // If it's a textarea, resize it to wrap around the text.
        if(e.target.tagName === 'TEXTAREA') {
            e.target.style.height = `0px`;
            e.target.style.height = `${e.target.scrollHeight - 20}px`;
        }
    }

    /**
     * Event handler to toggle whether a need is included in the "Needs" array.
     * @param need The need being toggled.
     */
    function handleNeeds(need: string) {
        if(!inquiryForm.data.Needs.includes(need)) {
            setInquiryForm(oldInquiryForm => {
                return {...oldInquiryForm,
                    data: {...oldInquiryForm.data,
                        Needs: [...oldInquiryForm.data.Needs, need]
                    },
                    error: {
                        success: false,
                        message: ''
                    }
                }
            })
        }
        else {
            setInquiryForm(oldInquiryForm => {
                const newNeeds = [...oldInquiryForm.data.Needs];
                newNeeds.splice(newNeeds.indexOf(need), 1);

                return {...oldInquiryForm,
                    data: {...oldInquiryForm.data,
                        Needs: newNeeds
                    },
                    error: {
                        success: false,
                        message: ''
                    }
                }
            })
        }
    }
    
    /**
     * Event handler to submit the inquiry form's content and display the server's response in the error message.
     */
    async function inquirySubmit(e:React.MouseEvent) { 
        // Preventing default so page doesn't reload.
        e.preventDefault();

        // Setting state to have a loading icon.
        setInquiryForm(oldInquiry => {
            return {...oldInquiry,
                isLoading: true
            }
        });

        // Making the POST request.
        const response = await (await fetch('/contact/inquiry', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inquiryForm.data)
        })).json();

        // Setting state to remove loading icon and display the message from the server,
        setInquiryForm(oldInquiry => {
            return {...oldInquiry,
                isLoading: false,
                error: response
            }
        });
    }

    // A function to resize all text areas to wrap its content on page load.
    useEffect(() => {
        const textareas = Array.from(document.getElementsByTagName('textarea')) as HTMLTextAreaElement[];
        textareas.forEach(elmnt => {
            elmnt.style.height = `0px`;
            elmnt.style.height = `${elmnt.scrollHeight - 20}px`;
        })
    }, []);

    return <>
        <AddPageView
            portfolioConfig={pageProps.portfolioConfig}
            pageName="contact"
        ></AddPageView>
        <Header></Header>
        <div className="Contain" id="Contact">
            <h1 style={{display: 'none'}}>Contact</h1>
            <form id="general">
                <h2>General Contact Form</h2>
                <p className="Description">
                    Got any questions or just saying hello? Fill out this contact form, and I'll get back to you as quickly as possible!
                </p>
                <div className="InputWrapper">
                    <input placeholder=" " id="generalName" value={contactForm.data.Name} onChange={e => {handleContactFormInput('Name', e)}}></input>
                    <label htmlFor="generalName">Name:</label>
                </div>
                <div className="InputWrapper">
                    <input placeholder=" " id="generalEmail" value={contactForm.data.Email} onChange={e => {handleContactFormInput('Email', e)}}></input>
                    <label htmlFor="generalEmail">Email:</label>
                </div>
                <div className="TextareaWrapper">
                    <label htmlFor="generalMessage">Message:</label>
                    <textarea placeholder=" " id="generalMessage" value={contactForm.data.Message} onChange={e => {handleContactFormInput('Message', e)}}></textarea>
                </div>
                {contactForm.isLoading
                    ? <div className="Loading">
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </div>
                    : <p className="ErrorMessage" style={{
                        color: contactForm.error.success ? 'var(--green)' : 'var(--lightRed)'
                    }}>{contactForm.error.message}</p>
                }
                <button className="Submit" onClick={generalSubmit}>Submit</button>
            </form>
            <form id="inquiry">
                <h2>Inquiry Form</h2>
                <p className="Description">
                    Looking to make your dreams a reality? Fill out some prelimenary details so I can assess, plan, and reach out for a follow up meeting.
                </p>
                <div className="InputWrapper">
                    <input placeholder=" " id="inquiryName" value={inquiryForm.data.Name} onChange={e => {handleInquiryFormInput('Name', e)}}></input>
                    <label htmlFor="inquiryName">Name:</label>
                </div>
                <div className="InputWrapper">
                    <input placeholder=" " id="inquiryEmail" type="email" value={inquiryForm.data.Email} onChange={e => {handleInquiryFormInput('Email', e)}}></input>
                    <label htmlFor="inquiryEmail">Email:</label>
                </div>
                <div className="InputWrapper">
                    <input placeholder=" " id="inquiryPhone" type="phone" value={inquiryForm.data.Phone} onChange={e => {handleInquiryFormInput('Phone', e)}}></input>
                    <label htmlFor="inquiryPhone">Phone:</label>
                </div>
                <div className="SubSection">
                    <h3>Select Project Needs:</h3>
                    <div className="ListWrapper">
                        <div className="Option">
                            <label htmlFor="inquiryNeedsGraphicDesign">Graphic Design</label>
                            <input type="checkbox" id="inquiryNeedsGraphicDesign" checked={inquiryForm.data.Needs.includes("Graphic Design")} onChange={e => {handleNeeds("Graphic Design")}}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsForms">Form Submission</label>
                            <input type="checkbox" id="inquiryNeedsForms" checked={inquiryForm.data.Needs.includes("Forms")} onChange={e => {handleNeeds("Forms")}}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsDataEntry">Data Entry</label>
                            <input type="checkbox" id="inquiryNeedsDataEntry" checked={inquiryForm.data.Needs.includes("Data Entry")} onChange={e => {handleNeeds("Data Entry")}}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsUserAccounts">User Accounts</label>
                            <input type="checkbox" id="inquiryNeedsUserAccounts" checked={inquiryForm.data.Needs.includes("Users")} onChange={e => {handleNeeds("Users")}}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsEcommerce">Ecommerce</label>
                            <input type="checkbox" id="inquiryNeedsEcommerce" checked={inquiryForm.data.Needs.includes("Ecommerce")} onChange={e => {handleNeeds("Ecommerce")}}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsContentPublishing">Content Publishing</label>
                            <input type="checkbox" id="inquiryNeedsContentPublishing" checked={inquiryForm.data.Needs.includes("Content Publishing")} onChange={e => {handleNeeds("Content Publishing")}}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsIntegrations">3rd Party Integrations</label>
                            <input type="checkbox" id="inquiryNeedsIntegrations" checked={inquiryForm.data.Needs.includes("Integrations")} onChange={e => {handleNeeds("Integrations")}}></input>
                        </div>
                    </div>
                </div>
                <div className="SubSection">
                    <h3>Estimated Time Frame:</h3>
                    <div className="Dates">
                        <div className="DateWrapper">
                            <input id="inquiryStartDate" value={inquiryForm.data["Start Date"]} type="date" onFocus={e => {
                                // @ts-ignore       Another typescript L
                                e.target.showPicker();
                            }} onChange={e => {handleInquiryFormInput('Start Date', e)}}></input>
                            <p className="Label">From:</p>
                            <div className="Display">
                                <label htmlFor="inquiryStartDate"><i className="fa-regular fa-calendar"></i></label>
                                <p placeholder=" ">{inquiryForm.data["Start Date"]}</p>
                            </div>
                        </div>
                        <div className="DateWrapper">
                            <input id="inquiryEndDate" value={inquiryForm.data["End Date"]} type="date" onFocus={e => {
                                // @ts-ignore       Another typescript L
                                e.target.showPicker();
                            }} onChange={e => {handleInquiryFormInput('End Date', e)}}></input>
                            <p className="Label">To:</p>
                            <div className="Display">
                                <label htmlFor="inquiryEndDate"><i className="fa-regular fa-calendar"></i></label>
                                <p placeholder=" ">{inquiryForm.data["End Date"]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="TextareaWrapper">
                    <label htmlFor="inquiryAvailability">Meeting Availability:</label>
                    <textarea placeholder=" " id="inquiryAvailability" value={inquiryForm.data["Availability"]} onChange={e => {handleInquiryFormInput('Availability', e)}}></textarea>
                </div>
                <div className="TextareaWrapper">
                    <label htmlFor="inquiryMessage">Additional Notes:</label>
                    <textarea placeholder=" " id="inquiryMessage" value={inquiryForm.data["Additional Notes"]} onChange={e => {handleInquiryFormInput('Additional Notes', e)}}></textarea>
                </div>
                {inquiryForm.isLoading
                    ? <div className="Loading">
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </div> 
                    : <p className="ErrorMessage" style={{
                        color: inquiryForm.error.success ? 'var(--green)' : 'var(--lightRed)'
                    }}>{inquiryForm.error.message}</p>
                }
                <button className="Submit" onClick={inquirySubmit}>Submit</button>
            </form>
        </div>
        <Footer portfolioConfig={pageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Contact ServerProps={window.ServerProps.contactPageProps!} />);

export default Contact;
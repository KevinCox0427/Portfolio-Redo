import React, { FunctionComponent, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddPageView from "./components/AddPageView";

declare global {
    type ContactPageProps = {
        portfolioConfig: PortfolioConfig[]
    }
}

type Props = {
    ServerProps: ServerPropsType
}

const Contact: FunctionComponent<Props> = (props) => {
    const pageProps = props.ServerProps.contactPageProps;
    if(typeof pageProps === 'undefined') return <></>;

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

    function updateNeeds(need: string) {
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

    useEffect(() => {
        const textareas = Array.from(document.getElementsByTagName('textarea')) as HTMLTextAreaElement[];
        textareas.forEach(elmnt => {
            elmnt.style.height = `0px`;
            elmnt.style.height = `${elmnt.scrollHeight - 20}px`;
        })
    }, []);

    async function generalSubmit(e:React.MouseEvent) {
        e.preventDefault();

        setContactForm(oldContactForm => {
            return {...oldContactForm,
                isLoading: true
            }
        });

        const response = await (await fetch('/contact/general', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactForm.data)
        })).json();

        setContactForm(oldContactForm => {
            return {...oldContactForm,
                isLoading: false,
                error: response
            }
        });
    }
    
    async function inquirySubmit(e:React.MouseEvent) { 
        e.preventDefault();

        setInquiryForm(oldInquiry => {
            return {...oldInquiry,
                isLoading: true
            }
        });

        const response = await (await fetch('/contact/inquiry', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inquiryForm.data)
        })).json();

        setInquiryForm(oldInquiry => {
            return {...oldInquiry,
                isLoading: false,
                error: response
            }
        });
    }

    return <>
        <AddPageView portfolioConfig={pageProps.portfolioConfig} pageName="contact"></AddPageView>
        <Header></Header>
        <main className="Contain">
            <h1 style={{
                display: 'none'
            }}>Contact</h1>
            <form id="general">
                <h2>General Contact Form</h2>
                <p className="Description">
                    Got any questions or just saying hello? Fill out this contact form, and I'll get back to you via email as quickly as possible!
                </p>
                <div className="InputWrapper">
                    <input placeholder=" " id="generalName" value={contactForm.data.Name} onChange={e => {
                        setContactForm(oldContact => {
                            return {...oldContact,
                                data: {...oldContact.data,
                                    Name: e.target.value
                                },
                                error: {
                                    success: false,
                                    message: ''
                                }
                            }
                        });
                    }}></input>
                    <label htmlFor="generalName">Name:</label>
                </div>
                <div className="InputWrapper">
                    <input placeholder=" " id="generalEmail" value={contactForm.data.Email} onChange={e => {
                        setContactForm(oldContact => {
                            return {...oldContact,
                                data: {...oldContact.data,
                                    Email: e.target.value
                                },
                                error: {
                                    success: false,
                                    message: ''
                                }
                            }
                        });
                    }}></input>
                    <label htmlFor="generalEmail">Email:</label>
                </div>
                <div className="TextareaWrapper">
                    <label htmlFor="generalMessage">Message:</label>
                    <textarea placeholder=" " id="generalMessage" value={contactForm.data.Message} onChange={e => {
                        setContactForm(oldContact => {
                            return {...oldContact,
                                data: {...oldContact.data,
                                    Message: e.target.value
                                },
                                error: {
                                    success: false,
                                    message: ''
                                }
                            }
                        });
                        e.target.style.height = `0px`;
                        e.target.style.height = `${e.target.scrollHeight - 20}px`;
                    }}></textarea>
                </div>
                {contactForm.isLoading ?
                    <div className="Loading">
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </div>
                : 
                    <p className="ErrorMessage" style={{
                        color: contactForm.error.success ? 'var(--green)' : 'var(--lightRed)'
                    }}>{contactForm.error.message}</p>
                }
                <button className="Submit" onClick={generalSubmit}>Submit</button>
            </form>
            <form id="inquiry">
                <h2>Inquiry Form</h2>
                <p className="Description">
                    Looking to start a new web project? Fill out some prelimenary details so I can assess, plan, and reach out for a follow up meeting so we can make your dreams a reality!
                </p>
                <div className="InputWrapper">
                    <input placeholder=" " id="inquiryName" value={inquiryForm.data.Name} onChange={e => {
                        setInquiryForm(oldInquiry => {
                            return {...oldInquiry,
                                data: {...oldInquiry.data,
                                    Name: e.target.value
                                },
                                error: {
                                    success: false,
                                    message: ''
                                }
                            }
                        });
                    }}></input>
                    <label htmlFor="inquiryName">Name:</label>
                </div>
                <div className="InputWrapper">
                    <input placeholder=" " id="inquiryEmail" type="email" value={inquiryForm.data.Email} onChange={e => {
                        setInquiryForm(oldInquiry => {
                            return {...oldInquiry,
                                data: {...oldInquiry.data,
                                    Email: e.target.value
                                },
                                error: {
                                    success: false,
                                    message: ''
                                }
                            }
                        });
                    }}></input>
                    <label htmlFor="inquiryEmail">Email:</label>
                </div>
                <div className="InputWrapper">
                    <input placeholder=" " id="inquiryPhone" type="phone" value={inquiryForm.data.Phone} onChange={e => {
                        setInquiryForm(oldInquiry => {
                            return {...oldInquiry,
                                data: {...oldInquiry.data,
                                    Phone: e.target.value
                                },
                                error: {
                                    success: false,
                                    message: ''
                                }
                            }
                        });
                    }}></input>
                    <label htmlFor="inquiryPhone">Phone:</label>
                </div>
                <div className="SubSection">
                    <h3>Select Project Needs:</h3>
                    <div className="ListWrapper">
                        <div className="Option">
                            <label htmlFor="inquiryNeedsGraphicDesign">Graphic Design</label>
                            <input type="checkbox" id="inquiryNeedsGraphicDesign" checked={inquiryForm.data.Needs.includes("Graphic Design")} onChange={e => {
                                updateNeeds("Graphic Design");
                            }}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsForms">Form Submission</label>
                            <input type="checkbox" id="inquiryNeedsForms" checked={inquiryForm.data.Needs.includes("Forms")} onChange={e => {
                                updateNeeds("Forms");
                            }}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsDataEntry">Data Entry</label>
                            <input type="checkbox" id="inquiryNeedsDataEntry" checked={inquiryForm.data.Needs.includes("Data Entry")} onChange={e => {
                                updateNeeds("Data Entry");
                            }}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsUserAccounts">User Accounts</label>
                            <input type="checkbox" id="inquiryNeedsUserAccounts" checked={inquiryForm.data.Needs.includes("Users")} onChange={e => {
                                updateNeeds("Users");
                            }}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsEcommerce">Ecommerce</label>
                            <input type="checkbox" id="inquiryNeedsEcommerce" checked={inquiryForm.data.Needs.includes("Ecommerce")} onChange={e => {
                                updateNeeds("Ecommerce");
                            }}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsContentPublishing">Content Publishing</label>
                            <input type="checkbox" id="inquiryNeedsContentPublishing" checked={inquiryForm.data.Needs.includes("Content Publishing")} onChange={e => {
                                updateNeeds("Content Publishing");
                            }}></input>
                        </div>
                        <div className="Option">
                            <label htmlFor="inquiryNeedsIntegrations">3rd Party Integrations</label>
                            <input type="checkbox" id="inquiryNeedsIntegrations" checked={inquiryForm.data.Needs.includes("Integrations")} onChange={e => {
                                updateNeeds("Integrations");
                            }}></input>
                        </div>
                    </div>
                </div>
                <div className="SubSection">
                    <h3>Estimated Time Frame:</h3>
                    <div className="Dates">
                        <div className="DateWrapper">
                            <input id="inquiryStartDate" value={inquiryForm.data["Start Date"]} type="date" onFocus={e => {
                                e.target.showPicker();
                            }} onChange={e => {
                                setInquiryForm(oldInquiry => {
                                    return {...oldInquiry,
                                        data: {...oldInquiry.data,
                                            "Start Date": e.target.value
                                        },
                                        error: {
                                            success: false,
                                            message: ''
                                        }
                                    }
                                });
                            }}></input>
                            <p className="Label">From:</p>
                            <div className="Display">
                                <label htmlFor="inquiryStartDate"><i className="fa-regular fa-calendar"></i></label>
                                <p placeholder=" ">{inquiryForm.data["Start Date"]}</p>
                            </div>
                        </div>
                        <div className="DateWrapper">
                            <input id="inquiryEndDate" value={inquiryForm.data["End Date"]} type="date" onFocus={e => {
                                e.target.showPicker();
                            }} onChange={e => {
                                setInquiryForm(oldInquiry => {
                                    return {...oldInquiry,
                                        data: {...oldInquiry.data,
                                            "End Date": e.target.value
                                        },
                                        error: {
                                            success: false,
                                            message: ''
                                        }
                                    }
                                });
                            }}></input>
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
                    <textarea placeholder=" " id="inquiryAvailability" value={inquiryForm.data["Availability"]} onChange={e => {
                        setInquiryForm(oldInquiry => {
                            return {...oldInquiry,
                                data: {...oldInquiry.data,
                                    "Availability": e.target.value
                                },
                                error: {
                                    success: false,
                                    message: ''
                                }
                            }
                        });
                        e.target.style.height = `0px`;
                        e.target.style.height = `${e.target.scrollHeight - 20}px`;
                    }}></textarea>
                </div>
                <div className="TextareaWrapper">
                    <label htmlFor="inquiryMessage">Additional Notes:</label>
                    <textarea placeholder=" " id="inquiryMessage" value={inquiryForm.data["Additional Notes"]} onChange={e => {
                        setInquiryForm(oldInquiry => {
                            return {...oldInquiry,
                                data: {...oldInquiry.data,
                                    "Additional Notes": e.target.value
                                },
                                error: {
                                    success: false,
                                    message: ''
                                }
                            }
                        });
                        e.target.style.height = `0px`;
                        e.target.style.height = `${e.target.scrollHeight - 20}px`;
                    }}></textarea>
                </div>
                {inquiryForm.isLoading ? 
                    <div className="Loading">
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </div> 
                :
                    <p className="ErrorMessage" style={{
                        color: inquiryForm.error.success ? 'var(--green)' : 'var(--lightRed)'
                    }}>{inquiryForm.error.message}</p>
                }
                <button className="Submit" onClick={inquirySubmit}>Submit</button>
            </form>
        </main>
        <Footer portfolioConfig={pageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Contact ServerProps={window.ServerProps} />);

export default Contact;
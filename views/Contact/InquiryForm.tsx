import React, { FunctionComponent, useState } from "react";

const InquiryForm: FunctionComponent = () => {
    // The options for the needs category
    const needs = ['Branding', 'Forms', 'Data Entry', 'Users', 'Ecommerce', 'Content Management', 'Integrations'];

    // Keeping state for inputted values, error messages, and submission for the inquiry form.
    const [formState, setFormState] = useState<{
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
    function handleInput(key: "Name" | "Email" | "Phone" | "Start Date" | "End Date" | "Availability" | "Additional Notes", e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newFormState = {...formState};
        
        newFormState.data[key] = e.target.value;
        newFormState.error = {
            success: false,
            message: ''
        };

        setFormState(newFormState);

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
        const newFormState = {...formState};

        if(!newFormState.data.Needs.includes(need)) {
            newFormState.data.Needs.push(need);
            newFormState.error = {
                success: false,
                message: ''
            };
        }
        else {
            newFormState.data.Needs.splice(newFormState.data.Needs.indexOf(need), 1);
            newFormState.error = {
                success: false,
                message: ''
            };
        }

        setFormState(newFormState);
    }
    
    /**
     * Event handler to submit the inquiry form's content and display the server's response in the error message.
     */
    async function submit(e:React.MouseEvent) { 
        // Preventing default so page doesn't reload.
        e.preventDefault();

        // Setting state to have a loading icon.
        setFormState(oldInquiry => {
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
            body: JSON.stringify(formState.data)
        })).json();

        // Setting state to remove loading icon and display the message from the server,
        setFormState(oldInquiry => {
            return {...oldInquiry,
                isLoading: false,
                error: response
            }
        });
    }
    
    return <form id="inquiry">
        <h2>Inquiry Form</h2>
        <p className="Description">
            Looking to make your dreams a reality? Fill out some prelimenary details so I can assess, plan, and reach out for a follow up meeting!
        </p>
        <div className="InputWrapper">
            <input
                placeholder=" "
                id="inquiryName"
                value={formState.data.Name}
                onChange={e => {handleInput('Name', e)}}
            ></input>
            <label htmlFor="inquiryName">Name:</label>
        </div>
        <div className="InputWrapper">
            <input
                placeholder=" "
                id="inquiryEmail"
                type="email"
                value={formState.data.Email}
                onChange={e => {handleInput('Email', e)}}
            ></input>
            <label htmlFor="inquiryEmail">Email:</label>
        </div>
        <div className="InputWrapper">
            <input
                placeholder=" "
                id="inquiryPhone"
                type="phone"
                value={formState.data.Phone}
                onChange={e => {handleInput('Phone', e)}}
            ></input>
            <label htmlFor="inquiryPhone">Phone:</label>
        </div>
        <div className="SubSection">
            <h3>Select Project Needs:</h3>
            <div className="ListWrapper">
                {needs.map((need, i) => {
                    return <div key={i} className="Option">
                        <label htmlFor={`inquiryNeeds${need.split(' ').join('')}`}>{need}</label>
                        <input
                            type="checkbox"
                            id={`inquiryNeeds${need.split(' ').join('')}`}
                            checked={formState.data.Needs.includes(need)}
                            onChange={e => {handleNeeds(need)}}
                        ></input>
                    </div>
                })}
            </div>
        </div>
        <div className="SubSection">
            <h3>Estimated Time Frame:</h3>
            <div className="Dates">
                <div className="DateWrapper">
                    <input
                        id="inquiryStartDate"
                        value={formState.data["Start Date"]}
                        type="date"
                        onFocus={e => {
                            // @ts-ignore       Another typescript L
                            e.target.showPicker();
                        }}
                        onChange={e => {handleInput('Start Date', e)}}
                    ></input>
                    <p className="Label">From:</p>
                    <div className="Display">
                        <label htmlFor="inquiryStartDate">
                            <i className="fa-regular fa-calendar"></i>
                        </label>
                        <p placeholder=" ">{formState.data["Start Date"]}</p>
                    </div>
                </div>
                <div className="DateWrapper">
                    <input
                        id="inquiryEndDate"
                        value={formState.data["End Date"]}
                        type="date"
                        onFocus={e => {
                            // @ts-ignore       Another typescript L
                            e.target.showPicker();
                        }}
                        onChange={e => {handleInput('End Date', e)}}
                    ></input>
                    <p className="Label">To:</p>
                    <div className="Display">
                        <label htmlFor="inquiryEndDate"><i className="fa-regular fa-calendar"></i></label>
                        <p placeholder=" ">{formState.data["End Date"]}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="TextareaWrapper">
            <label htmlFor="inquiryAvailability">Meeting Availability:</label>
            <textarea
                placeholder=" "
                id="inquiryAvailability"
                value={formState.data["Availability"]}
                onChange={e => {handleInput('Availability', e)}}
            ></textarea>
        </div>
        <div className="TextareaWrapper">
            <label htmlFor="inquiryMessage">Additional Notes:</label>
            <textarea
                placeholder=" "
                id="inquiryMessage"
                value={formState.data["Additional Notes"]}
                onChange={e => {handleInput('Additional Notes', e)}}
            ></textarea>
        </div>
        {formState.isLoading
            ? <div className="Loading">
                <i className="fa-solid fa-arrows-rotate"></i>
            </div> 
            : <p className="ErrorMessage" style={{
                color: formState.error.success ? 'var(--green)' : 'var(--lightRed)'
            }}>{formState.error.message}</p>
        }
        <button className="Submit" onClick={submit}>Submit</button>
    </form>;
}

export default InquiryForm;
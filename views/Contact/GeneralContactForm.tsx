import React, { FunctionComponent, useState } from "react";

/**
 * A React component that renders the form and handles the POST calls.
 */
const GeneralContactForm: FunctionComponent = () => {
    // Keeping state for inputted values, error messages, and submission for the form.
    const [formState, setFormState] = useState({
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
    function handleContactFormInput(key: keyof typeof formState.data, e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

    // Event handler to submit the contact form's content and display the server's response in the error message.
    async function generalSubmit(e:React.MouseEvent) {
        // Preventing default so page doesn't reload.
        e.preventDefault();

        // Setting state to have a loading icon.
        setFormState(oldContactForm => {
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
            body: JSON.stringify(formState.data)
        })).json();

        // Setting state to remove loading icon and display the message from the server,
        setFormState(oldContactForm => {
            return {...oldContactForm,
                isLoading: false,
                error: response
            }
        });
    }
    
    return <form id="general">
        <h2>General Contact Form</h2>
        <p className="Description">
            Got any questions or just saying hello? Fill out this contact form, and I'll get back to you as quickly as possible!
        </p>
        <div className="InputWrapper">
            <input
                placeholder=" "
                id="generalName"
                value={formState.data.Name}
                onChange={e => {handleContactFormInput('Name', e)}}
            ></input>
            <label htmlFor="generalName">Name:</label>
        </div>
        <div className="InputWrapper">
            <input
                placeholder=" "
                id="generalEmail"
                type="email"
                value={formState.data.Email}
                onChange={e => {handleContactFormInput('Email', e)}}
            ></input>
            <label htmlFor="generalEmail">Email:</label>
        </div>
        <div className="TextareaWrapper">
            <label htmlFor="generalMessage">Message:</label>
            <textarea
                placeholder=" "
                id="generalMessage"
                value={formState.data.Message}
                onChange={e => {handleContactFormInput('Message', e)}}
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
        <button className="Submit" onClick={generalSubmit}>Submit</button>
    </form>
}

export default GeneralContactForm;
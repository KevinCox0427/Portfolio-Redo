import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/**
 * A simple funciton to take parameters and parse them into a POST call to the SMTP2GO service.
 */
async function sendEmail(args: {
    to: {
        name: string,
        email: string
    }[],
    fromName: string,
    subject: string,
    body: string
}) {
    /**
     * Sending the email data to the SMTP Service
     */
    const response = (await axios.post('https://api.smtp2go.com/v3/email/send', {
        "api_key": process.env.SMTPAPIKEY,
        "to": args.to.map(to => {
            return `${to.name} <${to.email}>`
        }),
        "sender": `${args.fromName} <webalerts@thinkredbarn.com>`,
        "subject": args.subject,
        "html_body": args.body
    }, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    })).data;

    /**
     * Returning whether is was successful based on the syntax of SMTP2GO's responses.
     */
    return response.data.succeeded == 1;
}

export default sendEmail;
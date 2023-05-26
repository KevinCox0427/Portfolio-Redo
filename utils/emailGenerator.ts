/**
 * A Utility Class to generate a templated HTML file to send emails.
 * The constructor will create the template, while the functions use the template to fill in the necessary data and return it as a string.
 */
class EmailGenerator {
    message:string;
    name:string;
    subtitle:string;
    website:string;

    /**
     * @param name Used as the title of the header (will be linked to the provided website).
     * @param subtitle Used as the subtitle of the header (ideally a slogan or address).
     * @param message Used as disclaimer / message at the very bottom of the email.
     * @param websiteURL Used to link the headerImage and companyName
     */
    constructor(args: {
        image: string,
        name: string,
        subtitle?: string,
        message: string,
        websiteURL: string,
    }) {
        this.name = args.name;
        this.website = args.websiteURL;
        this.subtitle = args.subtitle ? args.subtitle : '';
        this.message = args.message;
    }

    /**
     * Fills in the templated email with data in a table format.
     * This one is inteneded for the customer, so this will include the disclaimer as the bottom.
     * 
     * @param subject The message at the very top of the email.
     * @param data The inserted data. All data MUST be an object but can be nested.
     * @returns an HTML email in a string format.
     */
    generateHTMLEmail(subject:string, data:object | string,) {
        /**
         * Returns an HTML document based on the paramters.
         */
        return `<!DOCTYPE html><html xml:lang="en" lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head></head><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=Edge"><meta name="format-detection" content="telephone=no, date=no, address=no, email=no"><meta name="x-apple-disable-message-reformatting"><title>${this.name} Confirmation Email</title></head><body style="background-color:#eee5e4 !important; color:#47484d !important; font-family:'Libre Franklin', sans-serif;"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Arima:wght@200&family=Libre+Franklin:ital,wght@0,200;0,400;1,200&display=swap" rel="stylesheet"><table border="0" cellpadding="0" cellspacing="0" width="600px" style="border-collapse: collapse; margin-left: auto; margin-right: auto; font-size: 16px;max-width: 100% !important;"><tbody><tr style="border-bottom:2px dashed #47484d;"><th colspan="2" style="font-size:18px;padding-top:10px;padding-bottom:10px;font-weight:200;font-style:italic;"><h1 style="font-weight:200;font-size:36px;line-height:38px;margin-bottom:0px;font-family:'Arima',serif;font-style:normal;">${this.name}</h1>${this.subtitle}</th></tr><tr><td colspan="2" style="font-size:24px;line-height:26px;text-align:center;padding-top:35px;padding-bottom:30px;font-family:'Arima',serif;font-weight:200;">${subject}</td></tr>${typeof data === 'string' ? `<tr><td colspan="2" style="font-size:18px;font-weight:200;padding-top:25px;padding-bottom:25px;">${data}</td></tr>` : createTableRows(data, 0)}<tr><td colspan="2" style="font-size:18px;text-align:center;padding-top:40px;padding-bottom:45px;font-style:italic;font-weight:200;">${this.message}</td></tr></tbody></table></body></html>`;

        /**
         * Creating each data field as a table row.
         * This is a function so we can call it recursively for nested data.
         * 
         * @param inputData The current data set that's been inserted into the table.
         * @param nestedIndex The index of how many times this function has been called recursevly. Used to add "padding-left" to the inserted values.
         */
        function createTableRows(inputData: object, nestedIndex: number): string {
            const rows = Object.keys(inputData).map(currentKey => {
                /**
                 * Getting the key. Adding 1 if it's an array
                 */
                const key = Array.isArray(inputData) ? parseInt(currentKey) + 1 : currentKey;

                /**
                 * The value at the given key.
                 */
                const value = inputData[currentKey as keyof typeof inputData];

                return `<tr><td style="padding-left:${10+(nestedIndex*15)}px;padding-top:5px;padding-bottom:5px;padding-right:5px;font-weight:${Array.isArray(inputData) ? 200 : 400};">${key}:</td><td style="padding-left:${10+(nestedIndex*15)}px;font-weight:200;word-break:break-word;">${typeof value !== 'object' ? value : ''}</td></tr>${typeof value === 'object' ? createTableRows(value, nestedIndex+1) : ''}`;
            }).join('');

            /**
             * Making every other row a brighter white.
             */
            return rows.split('<tr>').filter(row => row).map((row, i) => {
                return i % 2 == 0 ? `<tr>${row}` : `<tr style="background-color:#f7f7f7 !important;">${row}`;
            }).join('');
        }
    }
}

export default EmailGenerator;
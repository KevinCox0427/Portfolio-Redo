from app import app
from utils.portfolioConfig import portfolioConfig
from utils.serveHTML import serveHTML
from utils.regexTester import RegexTester
from utils.emailGenerator import EmailGenerator
from utils.smtp import sendEmail
from flask import request, Response, json
from dotenv import load_dotenv
from os import getenv

load_dotenv()

@app.route('/contact', methods=["GET"])
def contact():
    """
    GET route to render and serve the Contact react page.
    """

    # Loading the server properties to be passed to the client side.
    serverProps = {
        "portfolioConfig": portfolioConfig
    }

    # Rendering and serving the react file.
    renderedPage = serveHTML(
        pagePath='views/Contact/Contact.tsx',
        serverProps=serverProps,
        cssLinks=['/static/css/globals.css', '/static/css/Contact.css'],
        seoOptions={
            "title": 'Dream State - Contact',
            "name": 'Dream State',
            "description": 'Contact forms to reach out to Dream State for general questions or product inquiries.',
            "url": 'https://www.dreamstate.graphics/contact',
            "image": 'https://www.dreamstate.graphics/static/assets/favicon.png'
        }
    )

    if renderedPage:
       return Response(renderedPage, status=200);
    else:
       return Response(status=404)


# Instaniating a class to generate HTML emails based on a string or dictionary data set.
# See /utils/emailGenerator.py for more details.
emailGen = EmailGenerator(name='Dream State', message='Thank you for reaching out! I\'ll get back to you as quickly as I can.<br>- Kevin', subtitle='"Your bridge between dreams and reality"')

# Instaniating a class that compares a dictionary of regular expressions to the request bodies of the general contact form.
# See /utils/regexTester.py for more details.
generalFormRegex = RegexTester({
    "Name": r"[\w\s]{1,300}",
    "Email": r"^[a-zA-Z0-9+_.-]{1,200}@[\w]{1,10}.[a-z]{1,6}$",
    "Message": r"[\d\w\s\-!@#$%^&*()_+-=\\\/?<>.,;:\'\"]{1,4000}"
})

@app.route('/contact/general', methods=["POST"])
def general():
    """
    POST route for submitting the general contact form.
    """

    # Parsing the incoming request against a regular express object.
    parsedRequest = generalFormRegex.runTest(request.json)

    # If it returns a string, then it's an error message and just send to client side.
    if isinstance (parsedRequest, str):
        return Response(parsedRequest, status=400)
    
    # Generating HTML to send the email
    emailHTML = emailGen.generateHTMLEmail(subject='Your submission has been received! Here\'s what we got:', data=parsedRequest)

    # Sending the email to the client and me via SMTP2GO
    emailSuccess = sendEmail(
        to=[{
            "name": parsedRequest["Name"],
            "email": parsedRequest["Email"]
        }],
        fromName="Dream State",
        fromEmail=getenv("MyEmail"),
        subject="Your Dream State Submission Has Been Received!",
        body=emailHTML
    ) and sendEmail(
        to=[{
            "name": "Dream State",
            "email": getenv("MyEmail")
        }],
        fromName="Dream State",
        fromEmail=getenv("MyEmail"),
        subject="Your Dream State Submission Has Been Received!",
        body=emailHTML
    )

    # Returning a response to the client side based on the success of the email.
    if emailSuccess:
        return Response(json.dumps({
            "success": True,
            "message": 'Success! Check your email for a confirmation.' 
        }), status=200)
    else:
        return Response(json.dumps({
            "success": False,
            "message": 'Error: Email could not be sent. Contact server admin at kevin@dreamstate.graphics.' 
        }), status=400)


# Creating a class that compares a dictionary of regular expressions to the request bodies of the inquiry contact form.
# See utils.regexTester.py for more details.
inquiryFormRegex = RegexTester({
    "Name": r"[\w\s]{1,300}",
    "Email": r"^[a-zA-Z0-9+_.-]{1,200}@[\w]{1,10}.[a-z]{1,6}$",
    "Phone": r"[\d\-()]{1,15}",
    "Availability": r"[\d\w\s\-!@#$%^&*()_+-=\\\/?<>.,;:'\"]{1,1000}",
}, {
    "Needs": r"^(Graphic Design|Forms|Data Entry|Users|Ecommerce|Content Publishing|Integrations)$",
    "Start Date": r"^[\d]{4}-[\d]{2}-[\d]{2}$",
    "End Date": r"^[\d]{4}-[\d]{2}-[\d]{2}$",
    "Additional Notes": r"[\d\w\s\-!@#$%^&*()_+-=\\\/?<>.,;:'\"]{1,4000}"
})

@app.route('/contact/inquiry', methods=["POST"])
def inquiry():
    """
    POST route for submitting the inquiry form.
    """

    # Parsing the incoming request against a regular express object.
    parsedRequest = inquiryFormRegex.runTest(request.json)
    
    # If it returns a string, then it's an error message and just send to client side.
    if isinstance (parsedRequest, str):
        return Response(parsedRequest, status=400)
    
    # Generating HTML to send the email
    emailHTML = emailGen.generateHTMLEmail(subject='Your submission has been received! Here\'s what we got:', data=parsedRequest)
    
    # Sending the email to the client and me via SMTP2GO
    emailSuccess = sendEmail(
        to=[{
            "name": parsedRequest["Name"],
            "email": parsedRequest["Email"]
        }],
        fromName="Dream State",
        fromEmail=getenv("MyEmail"),
        subject="Your Dream State Inquiry Has Been Received!",
        body=emailHTML
    ) and sendEmail(
        to=[{
            "name": "Dream State",
            "email": getenv("MyEmail")
        }],
        fromName="Dream State",
        fromEmail=getenv("MyEmail"),
        subject="Your Dream State Inquiry Has Been Received!",
        body=emailHTML
    )

    # Returning a response to the client side based on the success of the email.
    if emailSuccess:
        return Response(json.dumps({
            "success": True,
            "message": 'Success! Check your email for a confirmation.' 
        }), status=200)
    else:
        return Response(json.dumps({
            "success": False,
            "message": 'Error: Email could not be sent. Contact server admin at kevin@dreamstate.graphics.' 
        }), status=400)
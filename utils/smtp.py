import requests
from dotenv import load_dotenv
from os import getenv

load_dotenv()

def sendEmail(to: list, fromName: str, fromEmail: str, subject: str, body: str) -> bool:
    """
    A function to format a POST call to the SMTP2GO service.

    params: 
        to ({name: str, email: str}[]): An array of senders' name and email
        fromName (str): The name listed on the sender
        fromEmail (str): The sender's email
        subject (str): The subject of the email.
        body (str): The body of the email

    returns (bool): A boolean representing the success of the POST call.
    """
    try:
        response = requests.post('https://api.smtp2go.com/v3/email/send', json={
            "api_key": getenv('SMTPAPIKEY'),
            "to": list(map(lambda to:
                f'{to["name"]} <{to["email"]}>'
            , to)),
            "sender": f'{fromName} <{fromEmail}>',
            "subject": subject,
            "html_body": body
        }, headers={
            "Accept": "application/json",
            "Content-Type": "application/json"
        }).json()

        return response["data"]["succeeded"] == 1
    
    except Exception as e:
        print(e)
        return False
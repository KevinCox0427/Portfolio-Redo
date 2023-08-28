from dotenv import load_dotenv
from flask import send_file, send_from_directory
from app import app

load_dotenv()

@app.route('/about', methods=["GET"])
def about():
    """
    GET route to serve the about react page.
    """
    return send_from_directory('public/html', 'About.html')


@app.route('/about/resume', methods=["GET"])
def resume():
    """
    GET route to download my resume as a pdf.
    """
    return send_from_directory('public/assets', 'Kevin Cox Resume.pdf', as_attachment=True)
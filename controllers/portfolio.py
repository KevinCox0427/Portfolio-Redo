from app import app
from flask import send_from_directory, Response, request
from functools import reduce

@app.route('/portfolio', methods=["GET"])
def portfolio():
    """
    GET route to render and serve the Portfolio react page.
    """
    return send_from_directory('static/html', 'Portfolio.html')


@app.route('/portfolio/<projectName>', methods=["GET"])
def project(projectName):
    """
    GET route to render and serve the Project react page.
    """
    return Response(send_from_directory('static/html', f'{projectName}.html'))
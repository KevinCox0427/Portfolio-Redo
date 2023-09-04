from app import app, checkPrerender
from flask import send_from_directory

@app.route('/portfolio', methods=["GET"])
@checkPrerender
def portfolio():
    """
    GET route to render and serve the Portfolio react page.
    """
    return send_from_directory('public/html', 'Portfolio.html')


@app.route('/portfolio/<projectName>', methods=["GET"])
@checkPrerender
def project(projectName):
    """
    GET route to render and serve the Project react page.
    """
    return send_from_directory('public/html', f'{projectName}.html')
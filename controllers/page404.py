from flask import send_from_directory
from app import app

@app.errorhandler(404)
def paeg404(e):
    """
    A 404 route to render a 404 page.
    """
    return send_from_directory('public/html', 'Page404.html')
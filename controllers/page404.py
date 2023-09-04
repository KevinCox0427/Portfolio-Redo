from flask import send_from_directory
from app import app, checkPrerender

@app.errorhandler(404)
@checkPrerender
def paeg404(e):
    """
    A 404 route to render a 404 page.
    """
    return send_from_directory('public/html', 'Page404.html')
from flask import Response
from app import app
from utils.serveHTML import serveHTML
from utils.portfolioConfig import portfolioConfig

@app.errorhandler(404)
def paeg404(e):
    """
    A 404 route to render a 404 page.
    """

    # Loading the server properties to be passed to the client side.
    serverProps = {
        "portfolioConfig": portfolioConfig,
    }

    # Rendering and serving the react file.
    renderedPage = serveHTML(
        pagePath='views/Page404/Page404.tsx',
        serverProps=serverProps,
        cssLinks=['/static/css/globals.css', '/static/css/Page404.css'],
        seoOptions={
            "title": 'Dream State',
            "name": 'Dream State',
            "description": 'Your bridge between dreams and reality. A full stack web development and graphic design agency made by Kevin Cox. Take a look, and see what I can do!',
            "url": 'https://www.dreamstate.graphics/',
            "image": 'https://www.dreamstate.graphics/static/assets/favicon.png'
        }
    )

    if renderedPage:
       return Response(renderedPage, status=404)
    else:
       return Response('Error: Could not render page.', status=404)
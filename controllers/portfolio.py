from app import app
from utils.serveHTML import serveHTML
from flask import Response, request
from utils.portfolioConfig import portfolioConfig
from functools import reduce

@app.route('/portfolio', methods=["GET"])
def portfolio():
    """
    GET route to render and serve the Portfolio react page.
    """

    # Loading the server properties to be passed to the client side.
    serverProps = {
        "portfolioConfig": portfolioConfig,
        "currentTag": request.args.get("tag") if isinstance(request.args.get("tag"), str) else 'all'
    }

    # Rendering and serving the react file.
    renderedPage = serveHTML(
        pagePath='views/Portfolio/Portfolio.tsx',
        serverProps=serverProps,
        cssLinks=['/static/css/globals.css', '/static/css/Portfolio.css']
    )

    if renderedPage:
       return Response(renderedPage, status=200)
    else:
       return Response('Error: Could not render page.', status=404)


@app.route('/portfolio/<projectName>', methods=["GET"])
def project(projectName):
    """
    GET route to render and serve the Project react page.
    """

    # Getting the index of a project based on its name.
    projectIndex = reduce(lambda previousIndex, index:
        index[0] if portfolioConfig[index[0]]["route"] == projectName else previousIndex
    , enumerate(portfolioConfig), -1)

    print(projectIndex)

    # If not found, redirect to 404 page.
    if projectIndex == -1:
        return Response(status=404)

    # Loading the server properties to be passed to the client side.
    serverProps = {
        "portfolioConfig": portfolioConfig,
        "projectIndex": projectIndex
    }

    # Rendering and serving the react file.
    renderedPage = serveHTML(
        pagePath='views/Portfolio/Project.tsx',
        serverProps=serverProps,
        cssLinks=['/static/css/globals.css', '/static/css/Project.css']
    )

    if renderedPage:
       return Response(renderedPage, status=200)
    else:
       return Response(status=404)
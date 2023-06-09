import requests
from dotenv import load_dotenv
from os import getenv
from utils.portfolioConfig import portfolioConfig
from utils.serveHTML import serveHTML
from flask import Response, send_file
from app import app

load_dotenv()

@app.route('/about', methods=["GET"])
def about():
    """
    GET route to render and serve the about react page.
    """

    # Loading default info for my github repos.
    githubData = [{
        "owner": {
            "avatar_url": '/assets/headshot.jpg',
            "login": 'KevinCox0427',
            "repos": []
        }
    }]

    # Fetching my Github profile and most recent repos.
    try:
        response = requests.get('https://api.github.com/users/KevinCox0427/repos?sort=pushed', headers={
            "Authorization": 'Bearer {githubAPIKey}'.format(githubAPIKey=getenv("GithubAPIKey"))
        }).json()
        githubData = response
    except Exception as e:
        print(e)

    # Loading the server properties to be passed to the client side.
    serverProps = {
        "portfolioConfig": portfolioConfig,
        "github": {
            "avatar": githubData[0]["owner"]["avatar_url"],
            "owner": githubData[0]["owner"]["login"],
            "repos": list(map(lambda repo:
                {
                    "name": repo["name"],
                    "url": repo["html_url"],
                    "description": repo["description"],
                    "language": repo["language"],
                    "topics": repo["topics"],
                    "pushed": repo["pushed_at"]
                }
            , githubData))
        }
    }

    # Rendering and serving the react file.
    renderedPage = serveHTML(
        pagePath='views/About/About.tsx',
        serverProps=serverProps,
        cssLinks=['/static/css/globals.css', '/static/css/About.css'],
        seoOptions={
            "title": 'Dream State - About',
            "name": 'Dream State',
            "description": 'About page for Kevin Cox. A holistic, ideas-driven full stack developer and graphic designer that uses a diverse skill-set to supply any technical or graphical need.',
            "url": 'https://www.dreamstate.graphics/about',
            "image": 'https://www.dreamstate.graphics/static/assets/favicon.png'
        }
    )

    if renderedPage:
       return Response(renderedPage, status=200)
    else:
       return Response(status=404)


@app.route('/about/resume', methods=["GET"])
def resume():
    """
    GET route to download my resume as a pdf.
    """
    return send_file('static/assets/Kevin Cox Resume.pdf', as_attachment=True)
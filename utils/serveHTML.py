import requests

def serveHTML(pagePath, serverProps={}, cssLinks=[], seoOptions={
    "title": "Flask App",
    "url": "",
    "description": "",
    "name": "",
    "image": ""
}):
    """
    Formats an HTML document based on the specified TSX & SCSS file paths.

    Args:
        pagePath (str): The location of the TSX file
        serverProps (dict): An object of any properties you want to pass to your page. Defaults to {}
        cssLinks (str | str[]): The path(s) of the css files to link. Defaults to []
        seoOptions? (dict): A map of various string values for seo meta tags. Defaults to empty strings.

    Returns:
        str | None: An HTML document to serve to the end-user, or None with an error printed upon failure
    """
    
    response = requests.post('http://localhost:3001', json = {
        "pagePath": pagePath,
        "serverProps": serverProps,
        "cssLinks": cssLinks,
        "seoOptions": seoOptions
    })

    if(response.status_code != 200):
        print("\n" + response.text)
        return None

    return response.text
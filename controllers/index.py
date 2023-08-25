from app import app
from flask import send_from_directory, request, Response, json
import requests
from dotenv import load_dotenv
from os import getenv
from bcrypt import kdf, gensalt
from base64 import b64encode
import time

load_dotenv()

@app.route('/', methods=["GET"])
def index():
    """
    GET route to serve the rendered React Homepage.
    """
    return send_from_directory('static/html', 'Home.html')



@app.route('/location', methods=["POST"])
def location():
    """
    A POST route to get a user ip and return some information on where they're located.
    """
    try:
        # Getting ip from request.
        ip = request.headers['X-Forwarded-For']
        print(ip)

        # Getting info on the user based on their ip.
        response = requests.get(f'https://ipinfo.io/{ip}?token={getenv("IpToken")}').json()

        # Returning user data if found.
        if "city" in response:
            return Response({
                "ip": response["ip"],
                "city": f'{response["city"]}, {response["region"]}, {response["country"]}',
                "ll": response["loc"].split(',')
            }, status=200)
        else:
            return Response(False, response=500)
    except Exception as e:
        print(e)
        return Response(False, response=500)


    
@app.route('/encrypt', methods=["POST"])
def encrypt():
    """
    POST route to encrypt a password and return it to end user
    Runs pbkdf2 encryption once since this is just a demo
    """

    # Guard clause to make sure a string password is sent in the request body.
    if(not ("password" in request.json and isinstance(request.json["password"], str) and len(request.json["password"]) < 200)):
        return Response('Invalid Request', status=400)
    
    # Generating a random salt and hashing the password. Returning it to client.
    salt = gensalt()
    return Response(json.dumps({
        "hash": b64encode(kdf(bytes(request.json["password"], encoding='utf-8'), salt, 100, 1)).decode('ASCII'),
        "salt": b64encode(salt).decode('ASCII')
    }), status=200)



# Storing a reference to an active spotify bearer token
bearerToken = {
    'token':'',
    'timestamp': -1
}

def getBearerToken() -> dict:
    global bearerToken

    # If the current bearer token isn't expired, just return that
    if(time.time() - bearerToken["timestamp"] < 60*60):
        return bearerToken["token"]
    
    # Otherwise make a POST request to Spotify to get a new bearer token and return that.
    else:
        try:
            response = requests.post('https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id={SpotifyClientID}&client_secret={SpotifyClientSecret}'.format(SpotifyClientID=getenv("SpotifyClientID"), SpotifyClientSecret=getenv("SpotifyClientSecret")), headers={
                "Content-Type": "application/x-www-form-urlencoded"
            }).json()

            bearerToken = {
                "token": response["access_token"],
                "timestamp": time.time()
            }

            return bearerToken["token"]
        except Exception as e:
            print(e)



@app.route('/spotify', methods=["POST"])
def spotify():
    """
    POST endpoint to allow the user to search or get recommendations for spotify songs.
    """

    # Guard clause to make sure the incoming requests include a valid string
    if not (request.json and (("search" in request.json and isinstance(request.json["search"], str)) or ("id" in request.json and isinstance(request.json["id"], str)))):
        return Response('Invalid request.', status=400)
    
    # Loading a default reponse for failute.
    response = []
    
    try:
        # If the request body has "search", then ping the search endpoint on Spotify's servers.
        if("search" in request.json):
            # Setting the response as a list of tracks.
            response = requests.get('https://api.spotify.com/v1/search?q={search}&type=track&market=US&limit=40'.format(search=request.json["search"]), headers={
                "Authorization": 'Bearer ' + getBearerToken(),
                "Accept": 'application/json'
            }).json()["tracks"]["items"]
        # Otherwise ping the recommendations endpoint on Spotify's servers.
        else:
            # Setting the response as a list of tracks.
            response = requests.get('https://api.spotify.com/v1/recommendations?seed_tracks={id}&market=US&limit=40'.format(id=request.json["id"]), headers={
                "Authorization": 'Bearer ' + getBearerToken(),
                "Accept": 'application/json'
            }).json()["tracks"]
    except Exception as e:
        print(e)

    # Returning a parse list of tracks based on Spotify's response syntax.
    return Response(json.dumps(list(map(lambda track:
        {
            "type": 'track',
            "name": track["name"],
            "id": track["id"],
            "artists": list(map(lambda artist: 
                {
                    "name": artist["name"],
                    "url": artist["external_urls"]["spotify"]
                },
            track["artists"])),
            "url": track["external_urls"]["spotify"],
            "image": track["album"]["images"][0]["url"],
            "length": track["duration_ms"],
            "release": track["album"]["release_date"],
            "album": { 
                "name": track["album"]["name"],
                "url": track["album"]["external_urls"]["spotify"],
                "discNumber": track["track_number"],
                "length": track["album"]["total_tracks"]
            }
        },
    response))), status=200)
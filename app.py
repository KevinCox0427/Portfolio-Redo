from flask import Flask
from redis import Redis;

# Initalizing the Flask application
app = Flask(__name__, static_url_path='', static_folder='public', template_folder='templates')

# Connecting the redis client.
redis = Redis(host='localhost', port=6379, decode_responses=True)

# Importing all our controllers.
from controllers import index, about, contact, portfolio, page404
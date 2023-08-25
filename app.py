from flask import Flask

# Initalizing the Flask application
app = Flask(__name__, static_url_path='', static_folder='public', template_folder='templates')

# Importing all our controllers.
from controllers import index, about, contact, portfolio, page404
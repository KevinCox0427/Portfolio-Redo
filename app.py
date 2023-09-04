from flask import Flask
from functools import wraps
import time
import subprocess

# Prerendering the react pages and timestamping to be done every 24 hours.
renderTimestamp = time.time()
subprocess.Popen(['npm', 'run', 'build'])

# Initalizing the Flask application
app = Flask(__name__, static_url_path='', static_folder='public', template_folder='templates')

# The middleware function to prerender all react content after 24 hours.
def checkPrerender(f):
    global renderTimestamp
    @wraps(f)
    def decorated(*args, **kwargs):
        global renderTimestamp
        # If the difference between the recorded timestamp and the current time is more than 24 hours, we must re-render.
        if(time.time() - renderTimestamp > 60*60*24):
            renderTimestamp = time.time()
            subprocess.Popen(['npm', 'run', 'build'])
        return f(*args, **kwargs)
    return decorated

# Importing all our controllers.
from controllers import index, about, contact, portfolio, page404
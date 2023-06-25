from flask import Flask
import subprocess
import signal
import atexit

# Initalizing the Flask application
app = Flask(__name__)

# Initializing the Node application to server-side render our React pages.
nodeApp = subprocess.Popen(['npm', 'run', 'start'])

# Making sure our Node server is killed when the Flask app is.
def exit_handler():
    nodeApp.send_signal(signal.SIGTERM)

atexit.register(exit_handler)

# Importing all our controllers.
from controllers import index, about, contact, portfolio, page404
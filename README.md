# My new portfolio website

### The idea:

This website is intended to show my abilities in creating high-quality branding and development through a "show don't tell" mentality.
The main focus is the homepage, which features consistent and professional typography, several user interface demos, and a scalable back-end infrastructure. (albeit quite overkill for this project)

___

### The stack:

This stack mainly uses Python, Typescript, and SCSS for its languages.
The back-end uses Flask for its routing, and a single-file Express server to render the React pages server-side.
This is done through a non-exposed HTTP request from Flask to Express.
The front-end uses React.js, which is bundled by Webpack to be hydrated on the client-side, along with a few extra front-end libraries such as Leaflet.js and Quill.js
Finally, this is all containerized in a Docker image for deployment.

___


### Important files:

[Server.tsx](https://github.com/KevinCox0427/Portfolio-Redo/blob/main/server.tsx): This is the express server that listens for HTTP requests, SSRs the react files, and returns them to the python server.

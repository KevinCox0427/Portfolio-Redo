# My new portfolio website

### The idea:

This website is intended to show my abilities in creating high-quality branding and development through a "show don't tell" mentality.
The main focus is the homepage, which features consistent and professional typography, several user interface demos, and a scalable back-end infrastructure.

___

### The stack:

This stack mainly uses Python, Typescript, and SCSS for its languages.
The back-end uses Flask for its routing, and a single-file typesript file to pre-render all of the react content to be hydrated.
The front-end uses React/Redux, which is bundled by Vite to be hydrated on the client-side, along with a few extra front-end libraries such as Leaflet.js and Quill.js.
Finally, this is all containerized in a Docker image for deployment.

___


### Important files:

* [app.py](https://github.com/KevinCox0427/Portfolio-Redo/blob/main/app.py): A small but important file that starts the node server and imports all the routes made in the [controllers](https://github.com/KevinCox0427/Portfolio-Redo/tree/main/controllers) directory.
* [views/Home/Home.tsx](https://github.com/KevinCox0427/Portfolio-Redo/blob/main/views/Home/Home.tsx): The homepage and by far the largest React page rendered for this website.
* [views/store/store.ts](https://github.com/KevinCox0427/Portfolio-Redo/blob/main/views/store/store.ts): A redux store that caches its data into local storage to save its state across many sessions.
* [views/styles/globals.scss](https://github.com/KevinCox0427/Portfolio-Redo/blob/main/views/styles/globals.scss): A SCSS file that is bundled for every webpage served.
* [utils/regexTester.py](https://github.com/KevinCox0427/Portfolio-Redo/blob/main/utils/regexTester.py): A utility class made to validate a incoming JSON request body against a formatted object with regular expressions as the values.
* [utils/portfolioConfig.py](https://github.com/KevinCox0427/Portfolio-Redo/blob/main/utils/portfolioConfig.py): An array containing all the information for each rendered project on the portfolio.

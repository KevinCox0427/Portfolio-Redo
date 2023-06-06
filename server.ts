/**
 * A website to have my portfolio, resume, and contact information.
 * Uses a hydrated React.js front-end, and express server to render and serve the front-end.
 * @author Kevin Cox
 */


/**
 * Loading environmental variables.
 */
import dotenv from 'dotenv';
dotenv.config();


/**
 * Initializing our express server.
 * JSON & url-encoding everything.
 */
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/**
 * Need to trust proxy to get users IP address. This is used in the homepage, doesn't NEED to be accurate.
 */
app.set('trust proxy', true);


/**
 * Declaring properties to pass from server side to client side for each react page.
 * Properties are declared globally in their corresponding pages.
 */
declare global { 
    type ServerPropsType = Partial<{
        homePageProps: HomePageProps,
        portfolioPageProps: PortfolioPageProps,
        page404Props: Page404Props,
        projectPageProps: ProjectPageProps,
        contactPageProps: ContactPageProps,
        aboutPageProps: AboutPageProps
    }>
}


/**
 * Declaring routing. Files can be found in the "routes" directory.
 */
import index from './routes/index';
import portfolio from './routes/portfolio';
import contact from './routes/contact';
import about from './routes/about';

app.use('/', index);
app.use('/portfolio', portfolio);
app.use('/contact', contact);
app.use('/about', about);


/**
 * Declaring static files in the assets folder.
 */
app.use('/assets', express.static('dist/public/assets'));
app.use('/css', express.static('dist/public/css'));
app.use('/js', express.static('dist/public/js'));


/**
 * Creating a 404 route.
 */
import route404 from './routes/route404';
app.use('*', route404);


/**
 * Listening at port.
 */
app.listen(process.env.PORT || 3000);
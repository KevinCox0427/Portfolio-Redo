/**
 * Loading environmental variables.
 */
import dotenv from 'dotenv';
dotenv.config();


/**
 * Initializing our express server.
 */
import express from "express";
export const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('trust proxy', true);


/**
 * Declare your server prop types.
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
export type { ServerPropsType };


/**
 * Declare your routes
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
 * Declaring static files in the assets folder and starting up server
 */
app.use('/assets', express.static('dist/public/assets'));
app.use('/css', express.static('dist/public/css'));
app.use('/js', express.static('dist/public/js'));


/**
 * Creating 404 route.
 */
import route404 from './routes/route404';
app.use('*', route404);


app.listen(process.env.PORT || 3000);
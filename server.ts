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
        location: LocationData
    }>

    type LocationData = {
        ip: string,
        city: string,
        ll: number[]
    } | null
}
export type { ServerPropsType };


/**
 * Declare your routes
 */
import index from './routes/index';

app.use('/', index);


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
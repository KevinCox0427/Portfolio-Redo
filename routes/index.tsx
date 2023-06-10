import express from "express";
import React from "react";
import Home from "../pages/Home/Home";
import serveHTML from "../utils/serveHTML";
import { pbkdf2Sync, randomBytes } from 'crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import dotenv from 'dotenv';
import axios from 'axios';
import portfolioConfig from "../utils/portfolioConfig";

dotenv.config();

const index = express.Router();

index.route('/')
    /**
     * GET route to serve the homepage.
     */
    .get(async (req, res) => {
        /**
         * Getting the ip from the request. Ik this can be easily spoofed, but it's is just a demo.
         * Also converts from IPv6 to IPv4.
         */
        const ip = ((req.headers['x-forwarded-for'] || req.ip) as string).split('::ffff:').join('');

        /**
         * Storing default location data if IP not found.
         */
        let locationData = {
            ip: '',
            city: '',
            ll: [0,0]
        }

        try {
            /**
             * Making a request to ipinfo.io. This is an API service that can give us stored information on the location of it.
             */
            const response = (await axios.get(`https://ipinfo.io/${ip}?token=${process.env.IPToken}`)).data;

            /**
             * If it has a city, then the response was a success, and overwrite the location data.
             */
            if(response.city) locationData = {
                ip: response.ip,
                city: `${response.city}, ${response.region}, ${response.country}`,
                ll: response.loc.split(',')
            }
        }
        /**
         * If axios request failed do nothing.
         */
        catch (e) {}

        /**
         * Creating the server properties to be passed to the client side
         */
        const serverProps:ServerPropsType = {
            homePageProps: {
                portfolioConfig: portfolioConfig,
                domain: req.get('host') || '',
                locationData: locationData
            }
        }

        /**
         * Rendering and serving the react file.
         * See utils/serveHtml.ts for more details.
         */
        res.status(200).send(serveHTML(<Home ServerProps={serverProps}/>, 'Home', serverProps, {
            title: 'Dream State',
            name: 'Dream State',
            description: 'Your bridge between dreams and reality. A full stack web development and graphic design agency made by Kevin Cox. Take a look, and see what I can do!',
            url: 'https://www.dreamstate.graphics/',
            image: 'https://www.dreamstate.graphics/favicon.png'
        }));
    });

index.route('/encrypt')
    /**
     * A POST request to intake a string and return it with type 8 encrypted.
     * This is used in the "authentication" section on the homepage.
     */
    .post(async (req, res) => {
        /**
         * Making sure it's a string.
         */
        if(typeof req.body.password !== 'string') {
            res.status(400).send('Invalid Request');
            return;
        }

        /**
         * Also making sure we're not encrypting something ridiculous.
         */
        if(req.body.password.length > 100) {
            res.status(400).send('Invalid Request');
            return;
        }

        /**
         * Sending the encrypted string in base64.
         */
        const salt = randomBytes(16).toString('base64');
        res.status(200).send({
            salt: salt,
            hash: pbkdf2Sync(req.body.password, salt, 10000, 100, 'sha256').toString('base64')
        });
    })

/**
 * Saving a bearer token in memory to make API requests to spotify.
 * This will also recorded in db/spotifyBearerToken.json
 * Timestamp is used to see if the token is expired. Its max age is 1 hour.
 */
let bearerToken: {
    token: string,
    timestamp: number
};

/**
 * A helper function to request a bearer token via by authenticating the spotify account.
 * 
 * @returns A boolean representing whether it was successful or not.
 */
async function createSpotifyBearerToken() {
    /**
     * Making the POST request with the credentials.
     */
    const url = `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${process.env.SpotifyClientID}&client_secret=${process.env.SpotifyClientSecret}`;

    const result = await axios.post(url, {}, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    /**
     * Seeing if the response is valid.
     */
    if(typeof result !== 'undefined' && typeof result.data === 'object' && typeof result.data.access_token === 'string') {
        bearerToken = {
            token: result.data.access_token,
            timestamp: Date.now()
        }
        /**
         * Saving the result to a JSON file.
         */
        writeFileSync('./db/spotifyBearerToken.json', JSON.stringify(bearerToken));
        return true;
    }
    else return false;
}

/**
 * A helper function to read the bearer token from the JSON file.
 * If it doesn't exist or is expired, then we'll create a new one.
 * 
 * @returns A boolean representing whether the operation was successful or not.
 */
async function readSpotifyBearerToken() {
    /**
     * If the directory doesn't exists, then we need to make one.
     */
    if(!existsSync('./db')) mkdirSync('./db');

    /**
     * Attempting to read the JSON file. If t
     */
    try {
        const readResult = JSON.parse(readFileSync('./db/spotifyBearerToken.json').toString());

        /**
         * If the read result doesn't exist, has bad syntax, or is expired, then throw an error.
         * Otherwise just set the variable and return true.
         */
        if(
            typeof readResult !== 'undefined' &&
            typeof readResult.token === 'string' &&
            typeof readResult.timestamp === 'number' &&
            Date.now() - bearerToken.timestamp > 60*60*1000
        ) {
            bearerToken = readResult;
            return true;
        }
        else {
            throw new Error("Invalid Data Type");
        }
    } 
    /**
     * If there's an error, then we'll attempt to create a new bearer token and return the success of the operation.
     */
    catch (e) {
        return (await createSpotifyBearerToken());
    }
}

index.route('/spotify')
    /**
     * A POST route to search or get song recommendations from Spotify's API.
     */
    .post(async (req, res) => {
        /**
         * Guard clause to ensure we have a valid request body.
         */
        if( ! (
            typeof req.body !== 'undefined' && 
            (typeof req.body.search === 'string' || typeof req.body.id === 'string')
        )) {
            res.status(400).send('Error: Bad Request');
            return;
        }

        /**
         * Attempting to get current bearer token.
         * If it's expired, then it'll create a new one.
         */
        const readResult = await readSpotifyBearerToken();
        if(!readResult) {
            res.status(400).send('Error: Spotify API configuration is not working');
            return;
        }
        
        /**
         * Forming the correct url based on request body.
         */
        const url = req.body.search ? 
            `https://api.spotify.com/v1/search?q=${req.body.search}&type=track&market=US&limit=40` 
        :   
            `https://api.spotify.com/v1/recommendations?seed_tracks=${req.body.id}&market=US&limit=40`;

        /**
         * Then we'll make the request, parse only the information we want out of it, and send it to the client.
         */
        try {
            const result = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${bearerToken.token}`,
                    Accept: 'application/json'
                }
            });

            const tracks = (req.body.search ? result.data.tracks.items : result.data.tracks) as {
                album: {
                    artists: {
                        name: string,
                        external_urls: {
                            spotify: string
                        }
                    }[],
                    external_urls: {
                        spotify: string
                    },
                    images: {
                        url: string
                    }[],
                    name: string,
                    release_date: string,
                    total_tracks: number
                },
                artists: {
                    name: string,
                    external_urls: {
                        spotify: string
                    }
                }[],
                disc_number: number,
                duration_ms: number,
                external_urls: {
                    spotify: string
                },
                id: string,
                name: string,
                track_number: number,
            }[];

            const parsedResponse = tracks.map(track => {
                 return {
                    type: 'track',
                    name: track.name,
                    id: track.id,
                    artists: track.artists.map(artist => {
                        return {
                            name: artist.name,
                            url: artist.external_urls.spotify
                        }
                    }),
                    url: track.external_urls.spotify,
                    image: track.album.images[0].url,
                    length: track.duration_ms,
                    release: track.album.release_date,
                    album: { 
                        name: track.album.name,
                        url: track.album.external_urls.spotify,
                        discNumber: track.track_number,
                        length: track.album.total_tracks
                    }
                }
            });

            res.status(200).send(parsedResponse);
        }
        /**
         * Otherwise if the API request returns an error, then we'll send the error message to the client.
         */
        catch (e:any) {
            console.log(e);

            res.status(400).send({
                error: typeof e.response === 'object' ? e.response.data.error.message : e
            });
        }
    })

export default index;
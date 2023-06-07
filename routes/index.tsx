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

        const serverProps:ServerPropsType = {
            homePageProps: {
                portfolioConfig: portfolioConfig,
                domain: req.get('host') || '',
                locationData: locationData
            }
        }

        res.status(200).send(serveHTML(<Home ServerProps={serverProps}/>, 'Home', serverProps, {
            title: 'Dream State',
            name: 'Dream State',
            description: 'Your bridge between dreams and reality. A full stack web development and graphic design agency made by Kevin Cox. Take a look, and see what I can do!',
            url: 'https://www.dreamstate.graphics/',
            image: 'https://www.dreamstate.graphics/favicon.png'
        }));
    });

index.route('/encrypt')
    .post(async (req, res) => {
        const salt = randomBytes(16).toString('base64');
        res.status(200).send({
            salt: salt,
            hash: pbkdf2Sync(req.body.password, salt, 10000, 100, 'sha256').toString('base64')
        });
    })


type SongType = {
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
}

function readSpotifyBearerToken() {
    if(!existsSync('./db')) mkdirSync('./db');

    try {
        const result = JSON.parse(readFileSync('./db/spotifyBearerToken.json').toString());

        if(typeof result != 'undefined' && typeof result.token === 'string' && typeof result.timestamp === 'number') {
            bearerToken = result;
            return true;
        }
        else {
            throw new Error("Invalid Data Type");
        }
    } catch (e) {
        bearerToken = {
            token: '',
            timestamp: 0
        }
        writeFileSync('./db/spotifyBearerToken.json', JSON.stringify(bearerToken));
        return false;
    }
}

async function getSpotifyBearerToken() {
    const url = `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${process.env.SpotifyClientID}&client_secret=${process.env.SpotifyClientSecret}`;

    const result = await axios.post(url, {}, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    if(typeof result !== 'undefined' && typeof result.data === 'object' && typeof result.data.access_token === 'string') {
        bearerToken = {
            token: result.data.access_token,
            timestamp: Date.now()
        }
        writeFileSync('./db/spotifyBearerToken.json', JSON.stringify(bearerToken));
        return true;
    }
    else return false;
}

let bearerToken: {
    token: string,
    timestamp: number
};
readSpotifyBearerToken();

index.route('/spotify')
    .post(async (req, res) => {
        if( ! (
            typeof req.body !== 'undefined' && 
            (typeof req.body.search === 'string' || typeof req.body.id === 'string')
        )) {
            res.status(400).send('Error: Bad Request');
            return;
        }

        const readResult = readSpotifyBearerToken();
        if(!readResult || Date.now() - bearerToken.timestamp > 60*60*1000) {
            const writeResult = await getSpotifyBearerToken();
            if(!writeResult) {
                res.status(400).send('Error: Spotify API configuration is not working');
                return;
            }
        }
        
        const url = req.body.search ? 
            `https://api.spotify.com/v1/search?q=${req.body.search}&type=track&market=US&limit=40` 
        :   
            `https://api.spotify.com/v1/recommendations?seed_tracks=${req.body.id}&market=US&limit=40`;

        try {
            const result = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${bearerToken.token}`,
                    Accept: 'application/json'
                }
            });

            const tracks = (req.body.search ? result.data.tracks.items : result.data.tracks) as SongType[];

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
        } catch (e:any) {
            console.log(e);
            res.status(400).send({
                error: typeof e.response === 'object' ? e.response.data.error.message : e
            });
        }
    })

export default index;
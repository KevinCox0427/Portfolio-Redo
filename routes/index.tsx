import express from "express";
import React from "react";
import Home from "../pages/Home";
import serveHTML from "../utils/serveHTML";
import { pbkdf2Sync, randomBytes } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import dotenv from 'dotenv';
import axios from 'axios';
import portfolioConfig from "../utils/portfolioConfig";

dotenv.config();

const index = express.Router();

index.route('/')
    .get(async (req, res) => {
        const serverProps:ServerPropsType = {
            portfolioConfig: portfolioConfig
        }

        res.status(200).send(serveHTML(<Home ServerProps={serverProps}/>, 'Home', serverProps));
    });

index.route('/encrypt')
    .post(async (req, res) => {
        const salt = randomBytes(16).toString('base64');
        res.status(200).send({
            salt: salt,
            hash: pbkdf2Sync(req.body.password, salt, 10000, 100, 'sha256').toString('base64')
        });
    })


let bearerToken: {
    token: string,
    timestamp: number
};
readSpotifyBearerToken();

type AlbumType = {
    artists: ArtistType[],
    external_urls: {
        spotify: string
    },
    images: {
        url: string
    }[],
    name: string,
    release_date: string,
    total_tracks: number
}

type TrackType = {
    album: AlbumType,
    artists: ArtistType[],
    disc_number: number,
    duration_ms: number,
    external_urls: {
        spotify: string
    },
    id: string,
    name: string,
    track_number: number,
}

type ArtistType = {
    external_urls: {
        spotify: string
    },
    name: string
}

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

            const tracks = req.body.search ? result.data.tracks.items as TrackType[] : result.data.tracks as TrackType[];

            const parsedResponse:{
                type: string,
                id: string,
                name: string,
                url: string,
                image: string,
                length: number,
                release: string,
                artists: {
                    name: string,
                    url:string
                }[],
                album: {
                    name: string,
                    url:string,
                    length: number,
                    discNumber: number
                }
            }[] = [];

            tracks.forEach((track, i) => {
                parsedResponse.push({
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
                })
            })

            res.status(200).send(parsedResponse);
        } catch (e:any) {
            console.log(e);
            res.status(400).send({
                error: typeof e.response === 'object' ? e.response.data.error.message : e
            });
        }
    })

function readSpotifyBearerToken() {
    try {
        const result = JSON.parse(readFileSync('./db/spotifyBearerToken.json').toString());
        if(typeof result != 'undefined' && typeof result.token === 'string' && typeof result.timestamp === 'number') {
            bearerToken = result;
            return true;
        }
        else throw new Error("Invalid Data Type");
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

    if(typeof result != 'undefined' && typeof result.data == 'object' && typeof result.data.access_token == 'string') {
        bearerToken = {
            token: result.data.access_token,
            timestamp: Date.now()
        }
        writeFileSync('./db/spotifyBearerToken.json', JSON.stringify(bearerToken));
        return true;
    }
    else return false;
}

export default index;
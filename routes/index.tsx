import express from "express";
import React from "react";
import Home from "../pages/Home";
import serveHTML from "../utils/serveHTML";
import { pbkdf2Sync, randomBytes } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const index = express.Router();

index.route('/')
    .get(async (req, res) => {
        res.send(serveHTML(<Home/>, 'Home'));
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

index.route('/spotify')
    .post(async (req, res) => {
        if( !(
            typeof req.body !== 'undefined' && 
            typeof req.body.search === 'string' &&
            typeof req.body.recommend === 'boolean'
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
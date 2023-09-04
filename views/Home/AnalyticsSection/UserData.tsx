import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { setBrowserData } from "../../store/browserData";

/**
 * Because typescript hates leaflet.js
 */
declare const L:any;

/**
 * A component in the Analytics seciton for the homepage to display user data collected via their IP address.
 */
const UserData:FunctionComponent = () => {
    const dispatch = useDispatch();
    const browserData = useSelector(state => state.browserData);

    // A references to store leaflet's map and market object.
    const map = useRef<any>(null);
    const marker = useRef<any>(null);

    useEffect(() => {
        if(browserData.locationData.city === '') {
            fetch('/location', {
                method: 'POST'
            }).then(response => {
                if(response === null) return;
                response.json().then(jsonResponse => {
                    if(!jsonResponse.success) return;
                    dispatch(setBrowserData(jsonResponse.data));
                });
            });
        }
    }, []);

    useEffect(() => {
        if(browserData.locationData.ll.length === 2) loadMap();
    }, [browserData]);


    /**
     * A function that load leafet's map and a marker based on the user's location.
     * View leaflet.js's documentation for more information.
     */
    function loadMap() {
        map.current = L.map('map', {
            center: new L.LatLng(browserData.locationData.ll[0], browserData.locationData.ll[1]),
            zoom: 7,
            minZoom: 4,
            maxZoom: 19,
            layers: [
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                })
            ],
            attributionControl: false,
            scrollWheelZoom: false
        });
        
        marker.current = L.marker(new L.LatLng(browserData.locationData.ll[0], browserData.locationData.ll[1])).addTo(map.current).bindPopup(`
            IP Address: ${browserData.locationData.ip}<br>
            City: ${browserData.locationData.city}
        `);
    }

    return <div className="Graph UserData">
        <h3>User Data:</h3>
        <div className="DataWrapper">
            <div className="Location">
                <p>Ip Address: <span>{browserData.locationData.ip}</span></p>
                <p>City: <span>{browserData.locationData.city}</span></p>
                <p>Browser: <span>{browserData.browser}</span></p>
                <p>Operating System: <span>{browserData.os}</span></p>
            </div>
            <div className="MapWrapper">
                <div id="map"></div>
                <div className="Feather"></div>
            </div>
        </div>
    </div>
}

export default UserData;
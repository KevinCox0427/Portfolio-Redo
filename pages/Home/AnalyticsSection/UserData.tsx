import React, { FunctionComponent, useEffect, useRef, useState } from "react";

/**
 * Because typescript hates leaflet.js
 */
declare const L:any;

type Props = {
    locationData: {
        ip: string,
        city: string,
        ll: number[]
    }
}

/**
 * A component in the Analytics seciton for the homepage to display user data collected via their IP address.
 * @param locationData An object representing data gathered about a user's location. This is recieved from the server.
 */
const UserData:FunctionComponent<Props> = (props) => {
    /**
     * Declaring a state variable to store information about their browser and os.
     */
    const [browserData, setBrowserData] = useState({
        os: '',
        browser: ''
    });

    /**
     * A references to store leaflet's map and market object.
     */
    const map = useRef<any>(null);
    const marker = useRef<any>(null);
    
    /**
     * On page load, we'll gather information about the user's os and browser and then set state.
     * We'll also load leaflet's map and place a marker where the user's locaiton is.
     */
    useEffect(() => {
        setBrowserData({
            os: window.navigator.userAgent.split(')')[0].split('(')[1].split(';')[1],
            browser: window.navigator.userAgent.split(')')[1]
        });
        
        if(!map.current) loadMap();
    }, []);

    /**
     * A function that load leafet's map and a marker based on the user's location.
     * View leaflet.js's documentation for more information.
     */
    function loadMap() {
        if(!props.locationData.city) return;

        map.current = L.map('map', {
            center: new L.LatLng(props.locationData.ll[0], props.locationData.ll[1]),
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
        
        marker.current = L.marker(new L.LatLng(props.locationData.ll[0], props.locationData.ll[1])).addTo(map.current).bindPopup(`
            IP Address: ${props.locationData.ip}<br>
            City: ${props.locationData.city}
        `);
    }

    return <div className="Graph UserData">
        <h3>User Data:</h3>
        <div className="DataWrapper">
            <div className="Location">
                <p>Ip Address: <span>{props.locationData.ip}</span></p>
                <p>City: <span>{props.locationData.city}</span></p>
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
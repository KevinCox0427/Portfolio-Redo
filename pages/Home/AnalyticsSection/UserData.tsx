import React, { FunctionComponent, useEffect, useRef, useState } from "react";

declare const L:any;

type Props = {
    locationData: {
        ip: string,
        city: string,
        ll: number[]
    }
    cacheHasLoaded: boolean
}

const UserData:FunctionComponent<Props> = (props) => {
    const [browserData, setBrowserData] = useState({
        os: '',
        browser: ''
    });

    const map = useRef<any>(null);
    const marker = useRef<any>(null);
    
    useEffect(() => {
        setBrowserData({
            os: window.navigator.userAgent.split(')')[0].split('(')[1].split(';')[1],
            browser: window.navigator.userAgent.split(')')[1]
        });
        
        if(!props.locationData.city) return;
        if(!map.current) loadMap();
    }, []);

    async function loadMap() {
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
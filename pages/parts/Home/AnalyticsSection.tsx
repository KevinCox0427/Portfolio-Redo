import React, { FunctionComponent } from "react";

type Props = {
    location: LocationData
}

declare const L:any;

const AnalyticsSection:FunctionComponent<Props> = (props) => {
    if(typeof window != 'undefined') { 
        window.addEventListener('load', () => {
            setTimeout(() => {
                if(!props.location) return;
                const map = L.map('map').setView(props.location.ll, 8);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                L.marker(props.location.ll).addTo(map).bindPopup(`
                    IP Address: ${props.location.ip}<br>
                    City: ${props.location.city}
                `);
            }, 100);
        });
    }

    return <div id="analytics" className='Section'>
        <h3 className='Title'>
            The more detailed the analytics, the more detailed the strategy...
        </h3>
        <p className='Description'>
            Data collect provides invaluable 
            <span>Here's some examples of your activity on this page! <em>Don't worry, none of this is stored, you can check the network calls :)</em></span>
        </p>
        <div className="GraphWrapper">
            <div className="Graph UserData">
                <h3>User Location:</h3>
                {props.location ? <>
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin=""/>
                    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossOrigin=""></script>
                    <p>Ip Address: <span>{props.location.ip}</span></p>
                    <p>City: <span>{props.location.city}</span></p>
                    <div id="map"></div>
                </> :
                    <p>No location data was found.</p>
                }
            </div>
        </div>
    </div>
}

export default AnalyticsSection;
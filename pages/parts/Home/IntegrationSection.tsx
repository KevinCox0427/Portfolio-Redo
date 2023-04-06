import React, { FunctionComponent } from "react";

declare const L:any;
if(typeof window != 'undefined') {
    setTimeout(() => {
        const map = new L.Map('map', {
            center: new L.LatLng(40.731253, -73.996139),
            zoom: 12,
        });
        L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(map);
    }, 100);
}

const IntegrationSection:FunctionComponent = () => {

    return <div id='integrations'>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossOrigin=""></script>
        <div id="map"></div>
    </div>
}

export default IntegrationSection;
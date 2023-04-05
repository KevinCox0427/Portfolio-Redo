import React, { FunctionComponent } from "react";

const IntegrationSection:FunctionComponent = () => {
    if(typeof window != 'undefined') {
        const map = new L.Map('map', {
            center: new L.LatLng(40.731253, -73.996139),
            zoom: 12,
        });
    }

    return <div id='integrations'>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossOrigin=""></script>
        <div id="map"></div>
    </div>
}

export default IntegrationSection;
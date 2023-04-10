import React, { FunctionComponent, useState } from "react";
import { cacheLocalStorage } from "../../Home";

declare const L:any;

const AnalyticsSection:FunctionComponent = () => {
    const [analytics, setAnalytics] = useState({
        location: {
            ip: '',
            city: '',
            ll: [0,0]
        }
    });
    cacheLocalStorage('DreamStateAnalytics', analytics, setAnalytics);

    async function getLocationData() {
        const ip = await (await fetch('https://api.ipify.org?format=json', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })).json();

        const locationResponse = await (await fetch(`http://ip-api.com/json/${ip.ip}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })).json();
        
        if(locationResponse.status === 'success') return {
            ip: locationResponse.query,
            city: `${locationResponse.city}, ${locationResponse.region}, ${locationResponse.countryCode}`,
            ll: [locationResponse.lat as number, locationResponse.lon as number]
        }
        else return {
            ip: '',
            city: '',
            ll: [0, 0]
        }
    }

    if(typeof window != 'undefined') { 
        window.addEventListener('load', () => {
            setTimeout(async () => {
                let locationData = analytics.location;
                if(!locationData.ip) {
                    locationData = await getLocationData();
                    setAnalytics({...analytics,
                        location: locationData
                    });
                }
                if(!locationData.ip) return;

                const map = L.map('map', {
                    zoomControl: false,
                    center: new L.LatLng(locationData.ll[0], locationData.ll[1]),
                    zoom: 7,
                    minZoom: 4,
                    maxZoom: 19,
                    layers: [
                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        })
                    ],
                    attributionControl: false
                });
                
                L.marker(locationData.ll).addTo(map).bindPopup(`
                    IP Address: ${locationData.ip}<br>
                    City: ${locationData.city}
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
                <div id="map"></div>
                <div className="Location">
                    {analytics.location.city ? <>
                        <p>Ip Address: <span>{analytics.location.ip}</span></p>
                        <p>City: <span>{analytics.location.city}</span></p>
                    </> :
                        <p className="Error">No location data was found.</p>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default AnalyticsSection;
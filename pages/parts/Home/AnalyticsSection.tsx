import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { cacheLocalStorage, hasLoaded } from "../../Home";

declare const L:any;
let map;

const AnalyticsSection:FunctionComponent = () => {
    const map = useRef(null);
    const [analytics, setAnalytics] = useState({
        userData: {
            location: {
                ip: '',
                city: '',
                ll: [0,0]
            },
            agent: {
                os: '',
                browser: ''
            }
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

    async function loadMap() {
        let locationData = analytics.userData.location;

        console.log(locationData)

        if(!locationData.city) {
            locationData = await getLocationData();
            setAnalytics({...analytics,
                userData: {...analytics.userData,
                    location: locationData
                }
            });
        }

        map.current = L.map('map', {
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
        
        L.marker(new L.LatLng(locationData.ll[0], locationData.ll[1])).addTo(map.current).bindPopup(`
            IP Address: ${locationData.ip}<br>
            City: ${locationData.city}
        `);
    }

    if(typeof window != 'undefined') {
        useEffect(() => {
            if(!hasLoaded) return;
            console.log(analytics)
            if(!map.current) loadMap();
        }, [analytics]);

        window.addEventListener('load', () => {
            setAnalytics({...analytics,
                userData: {...analytics.userData,
                    agent: {
                        os: window.navigator.userAgent.split(')')[0].split('(')[1].split(';')[1],
                        browser: window.navigator.userAgent.split(')')[1]
                    }
                }
            })
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
                <h3>User Data:</h3>
                <div className="Location">
                    {analytics ? <>
                        <p>Ip Address: <span>{analytics.userData.location.ip}</span></p>
                        <p>City: <span>{analytics.userData.location.city}</span></p>
                        <p>Browser: <span>{analytics.userData.agent.browser}</span></p>
                        <p>Operating System: <span>{analytics.userData.agent.os}</span></p>
                    </> :
                        <p className="Error">No location data was found.</p>
                    }
                </div>
                <div className="MapWrapper">
                    <div id="map"></div>
                    <div className="Feather"></div>
                </div>
            </div>
            <div className="Graph">

            </div>
        </div>
    </div>
}

export default AnalyticsSection;
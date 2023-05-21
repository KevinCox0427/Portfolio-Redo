import React, { FunctionComponent, useEffect, useRef } from "react";
import { Analytics } from "./AnalyticsSection";

declare const L:any;

type Props = {
    analytics: Analytics,
    setAnalytics: React.Dispatch<React.SetStateAction<Analytics>>,
    cacheHasLoaded: boolean
}

const UserData:FunctionComponent<Props> = (props) => {
    useEffect(() => {
        if(props.cacheHasLoaded && !props.analytics.userData.location.city) {
            getUserData();
        }
    }, [props.cacheHasLoaded]);

    useEffect(() => {
        if(!props.analytics.userData.location.city) return;
        if(!map.current) loadMap();
    }, [props.analytics]);

    const map = useRef<any>(null);
    const marker = useRef<any>(null);

    async function loadMap() {
        const locationData = props.analytics.userData.location;

        map.current = L.map('map', {
            center: new L.LatLng(locationData.ll[0], locationData.ll[1]),
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
        
        marker.current = L.marker(new L.LatLng(locationData.ll[0], locationData.ll[1])).addTo(map.current).bindPopup(`
            IP Address: ${locationData.ip}<br>
            City: ${locationData.city}
        `);
    }

    async function getUserData() {
        const ip = await (await fetch('http://api.ipify.org/?format=json', {
            method: 'GET'
        })).json();

        const locationResponse = await (await fetch(`http://ip-api.com/json/${ip.ip}`, {
            method: 'GET'
        })).json();
        
        if(locationResponse.status === 'success') {
            props.setAnalytics(oldAnalytics => {
                return {...oldAnalytics,
                    userData: {...oldAnalytics.userData,
                        agent: {
                            os: window.navigator.userAgent.split(')')[0].split('(')[1].split(';')[1],
                            browser: window.navigator.userAgent.split(')')[1]
                        },
                        location: {
                            ip: locationResponse.query,
                            city: `${locationResponse.city}, ${locationResponse.region}, ${locationResponse.countryCode}`,
                            ll: [locationResponse.lat as number, locationResponse.lon as number]
                        }
                    }
                }
            });
        }

        if(map.current) {
            if(marker.current) map.current.removeLayer(marker.current);

            L.marker(new L.LatLng(locationResponse.lat as number, locationResponse.lon as number)).addTo(map.current).bindPopup(`
                IP Address: ${locationResponse.query}<br>
                City: ${locationResponse.city}, ${locationResponse.region}, ${locationResponse.countryCode}
            `);

            map.current.flyTo(new L.LatLng(locationResponse.lat as number, locationResponse.lon as number));
        }
    }

    return <div className="Graph UserData">
        <h3>
            User Data:
            <i className="fa-solid fa-rotate-left Reset" onClick={() => {
                props.setAnalytics(oldAnalytics => {
                    return {...oldAnalytics,
                        userData: {
                            location: {
                                ip: '',
                                city: '',
                                ll: [-1,-1]
                            },
                            agent: {
                                os: '',
                                browser: ''
                            }
                        }
                    }
                });
                getUserData();
            }}></i>
        </h3>
        <div className="DataWrapper">
            <div className="Location">
                {props.analytics ? <>
                    <p>Ip Address: <span>{props.analytics.userData.location.ip}</span></p>
                    <p>City: <span>{props.analytics.userData.location.city}</span></p>
                    <p>Browser: <span>{props.analytics.userData.agent.browser}</span></p>
                    <p>Operating System: <span>{props.analytics.userData.agent.os}</span></p>
                </> :
                    <p className="Error">No location data was found.</p>
                }
            </div>
            <div className="MapWrapper">
                <div id="map"></div>
                <div className="Feather"></div>
            </div>
        </div>
    </div>
}

export default UserData;
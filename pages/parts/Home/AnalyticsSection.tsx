import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "../../windowCache";
import WatchTime from "./Analytics/WatchTime";

declare const L:any;

type Props = {
    windowCache: WindowCache,
    watchTime: {
        start: number,
        timeStamps: {
            [sectionName: string]: number
        }
    },
    currentSection: number
}

const AnalyticsSection:FunctionComponent<Props> = (props) => {
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

    props.windowCache.registerCache('DreamStateAnalytics', analytics, setAnalytics, getUserData);

    useEffect(() => {
        if(!analytics.userData.location.city) return;
        if(!map.current) loadMap();
    }, [analytics]);


    const map = useRef(null);
    async function loadMap() {
        const locationData = analytics.userData.location;

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
        
        L.marker(new L.LatLng(locationData.ll[0], locationData.ll[1])).addTo(map.current).bindPopup(`
            IP Address: ${locationData.ip}<br>
            City: ${locationData.city}
        `);
    }

    async function getUserData() {
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
        
        if(locationResponse.status === 'success') {
            setAnalytics(newAnalytics => {
                return {...newAnalytics,
                    userData: {...analytics.userData,
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
            })
        }
    }

    const [heatMap, setHeatMap] = useState<{
        height: number,
        width: number, 
        values: number[][]
    }>({
        height: 0,
        width: 0,
        values: []
    });

    useEffect(() => {
        const root = document.getElementById('root') as HTMLDivElement;
        const wrapper = document.getElementsByClassName('HeatmapWrapper')[0] as HTMLDivElement
        if(!root || !wrapper) return;

        root.addEventListener('click', e => {
            console.log(e.clientY, root.scrollTop);
            const coordinate = [Math.round((e.clientX / window.innerWidth)*100), Math.round(((e.clientY + root.scrollTop) / root.scrollHeight)*100)];
            setHeatMap(oldHeatMap => {
                return {...oldHeatMap, 
                    values: [...oldHeatMap.values, coordinate]
                };
            })
        });

        setHeatmapSize();
        window.addEventListener('resize', setHeatmapSize);

        function setHeatmapSize() {
            setHeatMap({...heatMap,
                height: Math.ceil(wrapper.clientWidth * (root.scrollHeight / window.innerWidth)),
                width: Math.ceil(wrapper.clientWidth)
            });
        }
    }, []);

    return <div id="analytics" className='Section'>
        <h3 className='Title'>
            The more detailed the analytics, the more detailed the strategy...
        </h3>
        <p className='Description'>
            Data collect provides invaluable 
            <span>
                Here's some examples of your activity on this page! 
                <small>Don't worry, none of this is stored or sent to my server, you can check the network calls :)</small>
            </span>
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
            <WatchTime watchTime={props.watchTime} currentSection={props.currentSection}></WatchTime>
            <div className="Graph Heatmap">
                <h3>Interaction Heatmap</h3>
                <div className="HeatmapScroll">
                    <div className="HeatmapWrapper">
                        <div className="Gradient" style={{
                            width: heatMap.width,
                            height: heatMap.height
                        }}>
                            {heatMap.values.map((value, i) => {
                                return <div className="Circle" key={i} style={{
                                    left: `${value[0]}%`,
                                    top: `${value[1]}%`
                                }}></div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="Graph"></div>
        </div>
    </div>
}

export default AnalyticsSection;
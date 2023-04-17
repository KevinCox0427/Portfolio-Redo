import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "../../windowCache";
import html2canvas from 'html2canvas';

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
    props.windowCache.registerCache('DreamStateAnalytics', analytics, setAnalytics, getUserData);

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

    useEffect(() => {
        if(!analytics.userData.location.city) return;
        if(!map.current) loadMap();
    }, [analytics]);

    const [screenShot, setScreenShot] = useState<string>('');
    const [heatMap, setHeatMap] = useState<number[][]>([[]]);

    async function loadHeatMap() {
        const root = document.getElementById('root') as HTMLDivElement;
        const canvas = await html2canvas(root, {
            height: root.scrollHeight,
            windowHeight: root.scrollHeight, 
        });
        setScreenShot(canvas.toDataURL());

        const height = Math.ceil((root.scrollHeight + root.clientHeight)/100);
        const width = Math.ceil(root.clientWidth/100);
        
        setHeatMap(Array.from({length: height}, () => Array.from({length: width}, () => 0)));
    }

    if(typeof window !== 'undefined') window.addEventListener('load', loadHeatMap);

    function createTimeString(time: number) {
        const hours = Math.floor((time/1000) / 3600);
        const minutes = Math.floor((time/1000) / 60) % 60;
        const seconds = Math.floor((time/100) % 600) / 10;
        return (hours ? `${hours}h ` : '') + (minutes ? `${minutes}m ` : '') + `${seconds}s`;
    }

    const XAxisLabels = ["Landing Page", "Optimized Data", "Secure Authentication", "Seamless Integrations", "Detailed Analytics", "User Interfaces", "Beautiful Websites", "Footer"];

    let largestTimestamp = 0;
    Object.keys(props.watchTime.timeStamps).forEach(timeStampKey => {
        const value = props.watchTime.timeStamps[timeStampKey as keyof typeof props.watchTime.timeStamps];
        if(value > largestTimestamp) largestTimestamp = value;
    });

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
            <div className="Graph WatchTime">
                <h3>Watch Time:</h3>
                <div className="AxisWrapper" style={{
                    gridTemplateColumns: `4.5em ${'3.5em '.repeat(XAxisLabels.length)}`
                }}>
                    <div className="Column">
                        <div className="YLabels">
                            {['','','',''].map((value, i) => {
                                return <p key={i}>{createTimeString(largestTimestamp*((4-i)/4))}</p>
                            })}
                            <p>0s</p>
                        </div>
                        <div className="Spacer"></div>
                    </div>
                    {Object.keys(props.watchTime.timeStamps).map((timeStampKey, i) => {
                        const value = props.watchTime.timeStamps[timeStampKey as keyof typeof props.watchTime.timeStamps];
                        return <div key={i} className="Column">
                            <div className="Timestamp">
                                <p className="Value" style={{
                                    height: props.currentSection === 4 ? `${(value/largestTimestamp) * 100}%` : '0%'
                                }}>
                                    {createTimeString(value)}
                                </p>
                            </div>
                            <p className="XLabel">
                                <span>{XAxisLabels[i]}</span>
                            </p>
                        </div>
                    })}
                </div>
            </div>
            <div className="Graph Heatmap">
                <h3>Interaction Heatmap</h3>
                <div className="HeatmapScroll">
                    <div className="HeatmapWrapper">
                        {screenShot ? <img src={screenShot}></img> : <></>}
                        <svg className="Gradient" viewBox={`0 0 ${heatMap.length} ${heatMap[0].length}`} xmlns="http://www.w3.org/2000/svg">
                            {heatMap.map((row, i) => {
                                return heatMap.map((value, j) => {
                                    return <rect key={(i*heatMap.length) + j} x={j} y={i} height={1} width={1}></rect>
                                });
                            })}
                        </svg>
                    </div>
                </div>
            </div>
            <div className="Graph"></div>
        </div>
    </div>
}

export default AnalyticsSection;
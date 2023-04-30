import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Header from './parts/Header';
import Footer from './parts/Footer';
import FloralSVG from './parts/Home/FloralSVG';
import HandSVG from './parts/Home/HandSVG';
import DataSection from './parts/Home/DataSection/DataSection';
import NavBars from './parts/Home/NavBars';
import AuthSection from './parts/Home/AuthSection/AuthSection';
import IntegrationSection from './parts/Home/IntegrationSection/IntegrationSection';
import AnalyticsSection from './parts/Home/AnalyticsSection/AnalyticsSection';
import WindowCache from './parts/windowCache';
import UISection from './parts/Home/UISection/UISection';

export type { SectionContent, AllSectionContent }

type SectionContent = {
    order: number,
    navName: string,
    content: string
}

type AllSectionContent = {
    data: SectionContent,
    authentication: SectionContent,
    integration: SectionContent,
    analytics: SectionContent,
    ui: SectionContent,
    web: SectionContent
}

const Home:FunctionComponent = () => {
    const [cacheHasLoaded, setCacheHasLoaded] = useState(false)
    const windowCache = useRef(new WindowCache(setCacheHasLoaded));

    const iframeUrls = ['red','orange','yellow','green', 'blue', 'purple'];
    const sliderRate = 7;
    const sliderWrapper = useRef<HTMLDivElement>(null);
    const contentWrapper = useRef<HTMLDivElement>(null);

    const [currentSection, setCurrentSection] = useState('');
    const [watchTime, setWatchTime] = useState({
        start: Date.now(),
        timeStamps: {
            home: 0,
            data: 0,
            authentication: 0,
            integration: 0,
            analytics: 0,
            ui: 0,
            web: 0,
            footer: 0
        }
    });
    windowCache.current.registerCache('DreamStateWatchTime', watchTime, setWatchTime);

    function resetWatchTime() {
        setWatchTime({
            start: Date.now(),
            timeStamps: {
                home: 0,
                data: 0,
                authentication: 0,
                integration: 0,
                analytics: 0,
                ui: 0,
                web: 0,
                footer: 0
            }
        });
    }

    useEffect(() => {
        if(currentSection === 'analytics') {
            const interval = setInterval(() => {
                setWatchTime(previousWatchTime => {
                    return {...previousWatchTime,
                        start: previousWatchTime.start + 1000,
                        timeStamps: {...previousWatchTime.timeStamps,
                            analytics: previousWatchTime.timeStamps.analytics + 1000
                        }
                    }
                })
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [currentSection]);
    
    const scrollTimeoutBuffer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if(!cacheHasLoaded) return;

        setWatchTime(oldWatchTime => {
            return {...oldWatchTime,
                start: Date.now()
            }
        });
        
        document.getElementById('root')!.addEventListener('scroll', e => {
            if(scrollTimeoutBuffer.current) clearTimeout(scrollTimeoutBuffer.current)
            scrollTimeoutBuffer.current = setTimeout(checkSections, 100);
        });
    }, [cacheHasLoaded]);

    function checkSections() {
        const clamp = (num:number, min:number, max:number) => Math.min(Math.max(num, min), max);

        const elementArray = [
            document.getElementById('home') as HTMLDivElement,
            ...Array.from(document.getElementsByClassName('Section')) as HTMLDivElement[],
            document.getElementById('footer') as HTMLDivElement
        ];

        let sections: {
            [sectionName: string]: {
                el: HTMLDivElement,
                screenArea: number
            }
        } = {};
        
        elementArray.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;

            sections = {...sections,
                [section.id]: {
                    el: section,
                    screenArea: clamp(sectionBottom, 0, window.innerHeight) - clamp(sectionTop, 0, window.innerHeight)
                }
            }
        });

        const newSection = Object.keys(sections).reduce((previousSectionName, currentSectionName, i) => {
            const currentArea = sections[currentSectionName].screenArea;
            const previousArea = sections[previousSectionName] ? sections[previousSectionName].screenArea : 0;

            if(currentArea < window.innerHeight/3) return previousSectionName;
            else return currentArea > previousArea ? currentSectionName : previousSectionName;
        }, '');

        if(newSection !== currentSection) {
            if(currentSection !== '') setWatchTime(previousWatchTime => {
                return {...previousWatchTime,
                    start: Date.now(),
                    timeStamps: {...previousWatchTime.timeStamps,
                        [currentSection]: previousWatchTime.timeStamps[currentSection as keyof typeof previousWatchTime.timeStamps] + (Date.now() - previousWatchTime.start)
                    }
                }
            });
            setCurrentSection(newSection);
        }
    }

    const [sectionContent, setSectionContent] = useState({
        data: {
            order: 1,
            navName: 'Optimized Data',
            content: '<h3>It always starts with the data...</h3><p>Creating a functional and intuitive website entirely depends on modeling good quality data upfront. I can model simplistic yet highly effective data structures, not only to create fast websites now, but to provide a solid foundation for additions in the future.</p><p><em>Let\'s fill in a data structure to create some new products together!</em></p>'
        },
        authentication: {
            order: 2,
            navName: 'Secure authentication',
            content: '<h3>In order to have users, you need secure authentication...</h3><p>Authentication on the web has given us many of the things we tend to take for granted: ecommerce, cloud storage, social media. I can give you the peace of mind by securely implementing many different methods of authentication, whether it be through an OAuth2 provider like Google, or entirely from stratch.</p><p><em>Let\'s create you a user from stratch together!</em></p>'
        },
        integration: {
            order: 3,
            navName: 'Seamless integrations',
            content: '<h3>Integrations give more power to your applications...</h3><p>Integrations have been instrumental in translating collected user data into real-world action items. This is responsible for many aspects of the web, such as online payments, automated emails, analytics, cloud storage, CMS tools, or any resource managment software. I can assess and integrate any software that your technology stack needs, whether it uses an SDK, an API, or an RPC.</p><p><em>Let\'s use an integration with Spotify together to find you some new music!</em></p>'
        },
        analytics: {
            order: 4,
            navName: 'Detailed analytics',
            content: '<h3>The more detailed the analytics, the more detailed the strategy...</h3><p>Data collect is an invaluable resource for growing, adapting, and focusing your business operations.<p><em>Here\'s some examples of your activity on this page!<small>Don\'t worry, none of this is stored or sent to my server, you can check the network calls :)</small></em></p>'
        },
        ui: {
            order: 5,
            navName: 'User interfaces to control it all',
            content: '<h3>Powerful user interfaces give you the greatest control...</h3><p><em>Let\'s use a user interface to screw up all my hard work!</em></p>'
        },
        web: {
            order: 6,
            navName: 'Beautiful websites to show it all',
            content: ''
        }
    });
    windowCache.current.registerCache('sectionText', sectionContent, setSectionContent);
    
    //setInterval(moveIframes, sliderRate*1000);

    function moveIframes() {
        if(!sliderWrapper.current) return;
        sliderWrapper.current.append(sliderWrapper.current.children[0]);
    }

    // console.log('Rerendering', new Date().toString().split(':').map((value, i) => {
    //     if(i === 0) return value.substring(value.length-2, value.length);
    //     if(i === 2) return value.substring(0, 2);
    //     else return value;
    // }).join(':'));

    return <>
        <Header></Header>
        <div id='home' className='SplashImage'>
            <div className='MainCopy'>
                <h1>Dream State</h1>
                <h3>Your bridge between</h3>
                <h3>
                    <span className='Titling'>Dreams</span>
                    <span>and</span>
                    <span className='Titling'>Reality</span></h3>
                <div className='Subtitle'>
                    <h2>Full stack developer & graphic designer</h2>
                    <div className='LinkWrapper'>
                        <a href='/#WhatICanDo'>See what I can do</a>
                    </div>
                </div>
            </div>
            <div className='IframeSlider'>
                <div className='IframeWrapper' ref={sliderWrapper} style={{
                    animation: `${sliderRate}s linear 0s infinite Slide`
                }}>
                    {iframeUrls.map((url, i) => {
                        return <div key={i} style={{
                            backgroundColor: url,
                            animation: `0.3s ease-out ${5.5+(i*0.15)}s forwards SlideDown`
                        }}></div>;
                    })}
                </div>
            </div>
            <svg id="RightCover" viewBox="0 0 1000 2000" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0 L 0 1590 L 250 1750 L 475 1750 L 675 2000 L 2000 2000 L 2000 0 Z" fill="#eee5e4"/></svg>
            <FloralSVG></FloralSVG>
            <HandSVG></HandSVG>
        </div>
        <div id="WhatICanDo" className='Contain'>
            <NavBars contentWrapper={contentWrapper} currentSection={currentSection} sectionContent={sectionContent}></NavBars>
            <div className='Content' ref={contentWrapper}>
                <DataSection windowCache={windowCache.current} sectionContent={sectionContent.data} style={{
                    order: sectionContent.data.order
                }}></DataSection>
                <AuthSection windowCache={windowCache.current} sectionContent={sectionContent.authentication} style={{
                    order: sectionContent.authentication.order
                }}></AuthSection>
                <IntegrationSection windowCache={windowCache.current} sectionContent={sectionContent.integration} style={{
                    order: sectionContent.integration.order
                }}></IntegrationSection>
                <AnalyticsSection windowCache={windowCache.current} watchTime={watchTime} currentSection={currentSection} cacheHasLoaded={cacheHasLoaded} resetWatchTime={resetWatchTime} sectionContent={sectionContent.analytics} style={{
                    order: sectionContent.analytics.order
                }}></AnalyticsSection>
                <UISection sectionContent={sectionContent.ui} allSectionContent={sectionContent} setSectionContent={setSectionContent} style={{
                    order: sectionContent.ui.order
                }}></UISection>
            </div>
        </div>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home/>);

export default Home;
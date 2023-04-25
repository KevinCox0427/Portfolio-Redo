import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Header from './parts/Header';
import Footer from './parts/Footer';
import FloralSVG from './parts/Home/FloralSVG';
import HandSVG from './parts/Home/HandSVG';
import DataSection from './parts/Home/DataSection';
import NavBars from './parts/Home/NavBars';
import AuthSection from './parts/Home/AuthSection';
import IntegrationSection from './parts/Home/IntegrationSection';
import AnalyticsSection from './parts/Home/AnalyticsSection';
import WindowCache from './parts/windowCache';
import UISection from './parts/Home/UISection';

export type { SectionContent }

type SectionContent = {
    name: string,
    navName: string,
    content: string
}

const Home:FunctionComponent = () => {
    const [cacheHasLoaded, setCacheHasLoaded] = useState(false)
    const windowCache = useRef(new WindowCache(setCacheHasLoaded));

    const iframeUrls = ['red','orange','yellow','green', 'blue', 'purple'];
    const sliderRate = 7;
    const sliderWrapper = useRef<HTMLDivElement>(null);
    const contentWrapper = useRef<HTMLDivElement>(null);

    const [currentSection, setCurrentSection] = useState(-1);
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
        if(currentSection === 4) {
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
        document.getElementById('root')!.addEventListener('scroll', e => {
            if(scrollTimeoutBuffer.current) clearTimeout(scrollTimeoutBuffer.current)
            scrollTimeoutBuffer.current = setTimeout(checkSections, 100);
        });
    }, [cacheHasLoaded, checkSections]);


    function checkSections() {
        const clamp = (num:number, min:number, max:number) => Math.min(Math.max(num, min), max);
        const sections = [document.getElementsByClassName('SplashImage')[0], ...Array.from(document.getElementsByClassName('Section')), document.getElementById('Footer')] as HTMLElement[];

        const sectionMap = sections.map(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            return clamp(sectionBottom, 0, window.innerHeight) - clamp(sectionTop, 0, window.innerHeight);
        });

        const newSection = sectionMap.reduce((previousIndex, current, i) => {
            if(current < window.innerHeight/3) return previousIndex;
            else return current > sectionMap[previousIndex] ? i : previousIndex;
        }, 0);

        if(newSection !== currentSection) {
            if(currentSection !== -1) setWatchTime(previousWatchTime => {
                const timeStampName = Object.keys(previousWatchTime.timeStamps)[currentSection];

                return {...previousWatchTime,
                    start: Date.now(),
                    timeStamps: {...previousWatchTime.timeStamps,
                        [timeStampName]: previousWatchTime.timeStamps[timeStampName as keyof typeof previousWatchTime.timeStamps] +  (Date.now() - previousWatchTime.start)
                    }
                }
            });
            setCurrentSection(newSection);
        }
    }

    const [sectionContent, setSectionContent] = useState<SectionContent[]>([
        {
            name: 'data',
            navName: 'Optimized Data',
            content: '<h3 class="Title">It always starts with the data...</h3><p class="Description">Creating a functional and intuitive website entirely depends on modeling good quality data upfront. I can model simplistic yet highly effective data structures, not only to create fast websites now, but to provide a solid foundation for additions in the future.<span>Let\'s fill in a data structure to create some new products together!</span></p>'
        },
        {
            name: 'authentication',
            navName: 'Secure authentication',
            content: '<h3 class="Title">In order to have users, you need secure authentication...</h3><p class="Description">Authentication on the web has given us many of the things we tend to take for granted: ecommerce, cloud storage, social media. I can give you the peace of mind by securely implementing many different methods of authentication, whether it be through an OAuth2 provider like Google, or entirely from stratch.<span>Let\'s create you a user from stratch together!</span></p>'
        },
        {
            name: 'integrations',
            navName: 'Seamless integrations',
            content: '<h3 class="Title">Integrations give more power to your applications...</h3><p class="Description">Integrations have been instrumental in translating collected user data into real-world action items. This is responsible for many aspects of the web, such as online payments, automated emails, analytics, cloud storage, CMS tools, or any resource managment software. I can assess and integrate any software that your technology stack needs, whether it uses an SDK, an API, or an RPC.<span>Let\'s use an integration with Spotify together to find you some new music!</span></p>'
        },
        {
            name: 'analytics',
            navName: 'Detailed analytics',
            content: '<h3 class="Title">The more detailed the analytics, the more detailed the strategy...</h3><p class="Description">Data collect is an invaluable resource for growing, adapting, and focusing your business operations.<span>Here\'s some examples of your activity on this page!<small>Don\'t worry, none of this is stored or sent to my server, you can check the network calls :)</small></span></p>'
        },
        {
            name: 'ui',
            navName: 'User interfaces to control it all',
            content: '<h3 class="Title">Powerful user interfaces give you the greatest control...</h3><p class="Description"> <span>Let\'s use a user interface to screw up all my hard work!</span></p>'
        },
        {
            name: 'web',
            navName: 'Beautiful websites to show it all',
            content: '<h3 class="Title"> </h3><p class="Description"><span></span></p>'
        }
    ]);
    windowCache.current.registerCache('sectionText', sectionContent, setSectionContent);
    
    //setInterval(moveIframes, sliderRate*1000);

    function moveIframes() {
        if(!sliderWrapper.current) return;
        sliderWrapper.current.append(sliderWrapper.current.children[0]);
    }

    return <>
        <Header></Header>
        <div className='SplashImage'>
            <div className='MainCopy'>
                <h1>Dream State</h1>
                <h3>Your bridge between</h3>
                <h3>
                    <span className='Titling'>Dreams</span>
                    <span>and</span>
                    <span className='Titling'>Reality</span></h3>
                <div className='Subtitle'>
                    <h2>Full stack developer & full graphic designer</h2>
                    <div className='LinkWrapper'>
                        <a href='/#WhatICanDo'>Learn More</a>
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
                {sectionContent.map((currentSectionContent, i) => {
                    switch(currentSectionContent.name) {
                        case 'data':
                            return <Fragment key={i}>
                                <DataSection windowCache={windowCache.current} sectionContent={currentSectionContent}></DataSection>
                            </Fragment>
                        case 'authentication':
                            return <Fragment key={i}>
                                <AuthSection windowCache={windowCache.current} sectionContent={currentSectionContent}></AuthSection>
                            </Fragment>
                        case 'integrations':
                            return <Fragment key={i}>
                                <IntegrationSection windowCache={windowCache.current} sectionContent={currentSectionContent}></IntegrationSection>
                            </Fragment>
                        case 'analytics':
                            return <Fragment key={i}>
                                <AnalyticsSection windowCache={windowCache.current} watchTime={watchTime} currentSection={currentSection} cacheHasLoaded={cacheHasLoaded} resetWatchTime={resetWatchTime} sectionContent={currentSectionContent}></AnalyticsSection>
                            </Fragment>
                        case 'ui':
                            return <Fragment key={i}>
                                <UISection sectionContent={currentSectionContent} allSectionContent={sectionContent} setSectionContent={setSectionContent}></UISection>
                            </Fragment>
                        case 'web':
                            return <Fragment key={i}></Fragment>
                    }
                })}
            </div>
        </div>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home/>);

export default Home;
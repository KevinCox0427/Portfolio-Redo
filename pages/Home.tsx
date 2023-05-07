import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Header from './parts/Header';
import Footer from './parts/Footer';
import FloralSVG from './Home/FloralSVG';
import HandSVG from './Home/HandSVG';
import DataSection from './Home/DataSection/DataSection';
import NavBars from './Home/NavBars';
import AuthSection from './Home/AuthSection/AuthSection';
import IntegrationSection from './Home/IntegrationSection/IntegrationSection';
import AnalyticsSection from './Home/AnalyticsSection/AnalyticsSection';
import WindowCache from './parts/windowCache';
import UISection from './Home/UISection/UISection';
import WebSection from './Home/WebSection/WebSection';
import WebsiteSlider from './Home/WebsitesSliders';

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

type Props = {
    ServerProps: ServerPropsType
}

const Home:FunctionComponent<Props> = (props) => {
    const [cacheHasLoaded, setCacheHasLoaded] = useState(false)
    const windowCache = useRef(new WindowCache(setCacheHasLoaded));

    const scrollTimeoutBuffer = useRef<NodeJS.Timeout | null>(null);
    const contentWrapper = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState('');

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

    useEffect(() => {
        if(!cacheHasLoaded) return;

        setWatchTime(oldWatchTime => {
            return {...oldWatchTime,
                start: Date.now()
            }
        });
        
        document.addEventListener('scroll', e => {
            if(scrollTimeoutBuffer.current) clearTimeout(scrollTimeoutBuffer.current)
            scrollTimeoutBuffer.current = setTimeout(checkSections, 100);
        });
    }, [cacheHasLoaded, currentSection, setCurrentSection]);

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

    const sectionDefaults = {
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
            content: '<h3>Beautiful websites give your messages the widest reach...</h3><p></p><p><em></em></p>'
        }
    }
    const [sectionContent, setSectionContent] = useState(sectionDefaults);
    windowCache.current.registerCache('sectionText', sectionContent, setSectionContent);
    
    const sliderUrls = ['/assets/Well_Tank_Goodness.jpg','/assets/Red_Barn_HPC.jpg','/assets/New_York_Land_Quest.jpg', '/assets/Little_Venice_Restaurant.jpg', '/assets/Beck_Speedster.jpg', '/assets/Peggys_Gems.jpg'];


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

    return <>
        <Header></Header>
        <div id='home' className='SplashImage'>
            <div className='MainCopy'>
                <h3>Your bridge between</h3>
                <h3>
                    <span className='Titling'>Dreams</span>
                    <span>and</span>
                    <span className='Titling'>Reality</span>
                </h3>
                <div className='Subtitle'>
                    <h2>Full stack developer & Full graphic designer</h2>
                    <div className='LinkWrapper'>
                        <a href='/#MyServices'>View services</a>
                    </div>
                </div>
            </div>
            <WebsiteSlider sliderUrls={sliderUrls}></WebsiteSlider>
            <p className='ScrollDown'>Scroll down to see how I do it!<i className="fa-solid fa-angles-down"></i></p>
            <svg id="RightCover" viewBox="0 0 1000 2000" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0 L 0 1590 L 250 1750 L 475 1750 L 675 2000 L 2000 2000 L 2000 0 Z" fill="#eee5e4"/></svg>
            <FloralSVG></FloralSVG>
            <HandSVG></HandSVG>
        </div>
        <div id="MyServices" className='Contain'>
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
                <UISection sectionContent={sectionContent.ui} allSectionContent={sectionContent} setSectionContent={setSectionContent} defaultSectionContent={sectionDefaults} cacheHasLoaded={cacheHasLoaded} style={{
                    order: sectionContent.ui.order
                }}></UISection>
                <WebSection sectionContent={sectionContent.web} portfolioConfig={props.ServerProps.portfolioConfig ? props.ServerProps.portfolioConfig : []} style={{
                    order: sectionContent.web.order
                }}></WebSection>
            </div>
        </div>
        <Footer portfolioConfig={props.ServerProps.portfolioConfig ? props.ServerProps.portfolioConfig : []}></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home ServerProps={window.ServerProps}/>);

export default Home;
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloralSVG from './components/FloralSVG';
import HandSVG from './components/HandSVG';
import DataSection from './DataSection/DataSection';
import NavBars from './components/NavBars';
import AuthSection from './AuthSection/AuthSection';
import IntegrationSection from './IntegrationSection/IntegrationSection';
import AnalyticsSection from './AnalyticsSection/AnalyticsSection';
import WindowCache from '../components/windowCache';
import UISection from './UISection/UISection';
import WebSection from './WebSection/WebSection';
import WebsiteSlider from './components/WebsitesSliders';

declare global {
    type HomePageProps = {
        portfolioConfig: PortfolioConfig[]
        domain: string,
        locationData: {
            ip: string,
            city: string,
            ll: number[]
        }
    }

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
}

type Props = {
    ServerProps: ServerPropsType
}

const Home:FunctionComponent<Props> = (props) => {
    const pageProps = props.ServerProps.homePageProps;
    if(typeof pageProps === 'undefined') return <></>;

    const [cacheHasLoaded, setCacheHasLoaded] = useState(false);
    const windowCache = useRef(new WindowCache(setCacheHasLoaded));

    const scrollTimeoutBuffer = useRef<NodeJS.Timeout | null>(null);
    const contentWrapper = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState('');

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

    const [watchTime, setWatchTime] = useState<{
        start: number,
        timeStamps: {
            [sectionName:string]: number
        }
    }>({
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
    windowCache.current.registerCache('watchTime', watchTime, setWatchTime);

    const sectionDefaults = {
        data: {
            order: 1,
            navName: 'Optimized Data',
            content: '<h3>It always starts with the data...</h3><p>Creating a functional and intuitive website entirely depends on modeling good quality data upfront. I can model simplistic yet highly effective data structures, not only to create fast websites now, but to provide a solid foundation for additions in the future.</p><p><em>Let\'s fill in a data structure to create some new products together!</em></p>'
        },
        integration: {
            order: 2,
            navName: 'Seamless integrations',
            content: '<h3>Integrations give more power to your applications...</h3><p>Integrations have been instrumental in translating collected user data into real-world action items. This is responsible for many aspects of the web, such as online payments, automated emails, analytics, cloud storage, CMS tools, or any resource management software. I can assess and integrate any software your technology stack needs, whether it uses an SDK, an API, webhooks, or an RPC.</p><p><em>Let\'s use an integration with Spotify together to find you some new music!</em></p>'
        },
        authentication: {
            order: 3,
            navName: 'Secure authentication',
            content: '<h3>In order to have users, you need secure authentication...</h3><p>Authentication on the web has given us many functionalities we tend to take for granted: ecommerce, cloud storage, social media. I can give you peace of mind through secure implementations of many different methods of authentication, whether it be through an OAuth2 provider like Google, or entirely from stratch.</p><p><em>Let\'s create you a user from scratch together!</em></p>'
        },
        analytics: {
            order: 4,
            navName: 'Detailed analytics',
            content: '<h3>The more detailed the analytics, the more detailed the strategy...</h3><p>Data collection is an invaluable resource for growing, adapting, and focusing your business operations. Whether it\s analysizing page views, what\'s being viewed, or down to every user interaction, I can create, measure, and store any type of data analysis your business needs to succeed.<p><em>Here\'s some examples of your activity on this page! (Don\'t worry, none of this is stored or sent, you can check the network calls)</em></p><p></p>'
        },
        ui: {
            order: 5,
            navName: 'User interfaces to control it all',
            content: '<h3>Powerful user interfaces give you the greatest control...</h3><p>UIs are the primary way users interact with any software. This enables users to enter large datasets, change important functionalities, or customize the look down to the smallest of details. So, the better the implementation, the better the user experience. I can create, adjust, and expand your website\'s UIs to enable you and your teams with powerful tools that best suit you.</p><p><em>Let\'s use a UI to screw up all my hard work!</em></p>'
        },
        web: {
            order: 6,
            navName: 'Beautiful websites to show it all',
            content: '<h3>Beautiful websites give your messages the widest reach...</h3><p>In an age where the majority of customers\' first encounters with an organization takes place online, it becomes vitally important to provide not only unique experiences, but effective ones. These serve to strengthen the perception of the organization, trickling into their products or services. I can create, plan, design, and mockup any graphical materials to fit, further strengthen, or form your brand.</p><p><em>Check out my portfolio to see some of my work!</em></p>'
        }
    }
    
    const [sectionContent, setSectionContent] = useState(sectionDefaults);
    windowCache.current.registerCache('sectionText', sectionContent, setSectionContent);

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
        <h1 style={{
            display: 'none'
        }}>Dream State</h1>
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
            <WebsiteSlider portfolioConfig={pageProps.portfolioConfig}></WebsiteSlider>
            <p className='ScrollDown'>
                Scroll down to see how I do it!
                <i className="fa-solid fa-angles-down"></i>
            </p>
            <svg id="RightCover" viewBox="0 0 1000 2000" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0 L 0 1590 L 250 1750 L 475 1750 L 675 2000 L 2000 2000 L 2000 0 Z" fill="#eee5e4"/></svg>
            <FloralSVG></FloralSVG>
            <HandSVG></HandSVG>
        </div>
        <div id="MyServices" className='Contain'>
            <NavBars contentWrapper={contentWrapper} currentSection={currentSection} sectionContent={sectionContent}></NavBars>
            <div className='Content' ref={contentWrapper}>
                <DataSection windowCache={windowCache.current} sectionContent={sectionContent.data} style={{
                    order: sectionContent.data.order,
                    zIndex: Object.keys(sectionContent).length - sectionContent.data.order
                }}></DataSection>
                <AuthSection windowCache={windowCache.current} cachedHadLoaded={cacheHasLoaded} sectionContent={sectionContent.authentication} style={{
                    order: sectionContent.authentication.order,
                    zIndex: Object.keys(sectionContent).length - sectionContent.authentication.order
                }}></AuthSection>
                <IntegrationSection windowCache={windowCache.current} sectionContent={sectionContent.integration} style={{
                    order: sectionContent.integration.order,
                    zIndex: Object.keys(sectionContent).length - sectionContent.integration.order
                }}></IntegrationSection>
                <AnalyticsSection windowCache={windowCache.current} watchTime={watchTime} currentSection={currentSection} cacheHasLoaded={cacheHasLoaded} portfolioConfig={pageProps.portfolioConfig} setWatchTime={setWatchTime} sectionContent={sectionContent.analytics} domain={pageProps.domain} locationData={pageProps.locationData} style={{
                    order: sectionContent.analytics.order,
                    zIndex: Object.keys(sectionContent).length - sectionContent.analytics.order
                }}></AnalyticsSection>
                <UISection sectionContent={sectionContent.ui} allSectionContent={sectionContent} setSectionContent={setSectionContent} defaultSectionContent={sectionDefaults} cacheHasLoaded={cacheHasLoaded} style={{
                    order: sectionContent.ui.order,
                    zIndex: Object.keys(sectionContent).length - sectionContent.ui.order
                }}></UISection>
                <WebSection sectionContent={sectionContent.web} portfolioConfig={pageProps.portfolioConfig} style={{
                    order: sectionContent.web.order,
                    zIndex: Object.keys(sectionContent).length - sectionContent.web.order
                }}></WebSection>
            </div>
        </div>
        <Footer portfolioConfig={pageProps.portfolioConfig}></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home ServerProps={window.ServerProps}/>);

export default Home;
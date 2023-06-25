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

/**
 * Declaring what properties this page should inherited from the server
 */
type Props = {
    ServerProps: {
        portfolioConfig: PortfolioConfig[]
        domain: string,
        locationData: {
            ip: string,
            city: string,
            ll: number[]
        }
    }
}

/**
 * A React page that will render the homepage. This is being rendered on the server and hydrated on the client.
 * @param portfolioConfig The configuration of the portfolio to render its content appropriately.
 * @param domain The name of the domain being used. This is mostly to properly render a site map in the "Analytics" section.
 * @param locationData Data collected from the user's IP address. This is for the "Analytics" section.
 */
const Home:FunctionComponent<Props> = (props) => {
    // Guard clause to make sure we recieved the properties from the server.
    const pageProps = props.ServerProps;
    if(typeof pageProps === 'undefined') return <></>;

    // Creating a utility class to save and load state variables in local storage.
    // This will be used throughout the homepage to retain statefulness across user sessions.
    // See utils/windowCache.ts for more details.
    const [cacheHasLoaded, setCacheHasLoaded] = useState(false);
    const windowCache = useRef(new WindowCache(setCacheHasLoaded));

    // Keeping track of what section the user has currently scrolled to.
    const contentWrapper = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState('');

    // Setting a scroll event on page load to test for what section the user is currently on.
    // This is buffered such that the callback function will only fire if a user has stopped scrolling for 100ms.
    const scrollTimeoutBuffer = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        checkSections();
        document.addEventListener('scroll', e => {
            if(scrollTimeoutBuffer.current) clearTimeout(scrollTimeoutBuffer.current)
            scrollTimeoutBuffer.current = setTimeout(() => {
                checkSections();
            }, 100);
        });
    }, [checkSections]);

    /**
     * function to determine what section the user is on based on scroll position.
     */
    function checkSections() {
        /**
         * Helper function to clamp a number between minimum and maximum bounds.
         * @param num The number being clamped.
         * @param min The minimum bound.
         * @param max The maximum bound.
         * @returns The number inside the minimum and maximum bounds.
         */
        function clamp(num:number, min:number, max:number) {
            return Math.min(Math.max(num, min), max);
        }

        /**
         * Helper function to get the amount of space the element takes up on screen.
         * @param el The element being tested for.
         * @returns The amount of screen real-estate it takes up in pixels.
         */
        function getArea(el: HTMLElement) {
            const sectionTop = el.getBoundingClientRect().top;
            const sectionBottom = el.getBoundingClientRect().bottom;
            return clamp(sectionBottom, 0, window.innerHeight) - clamp(sectionTop, 0, window.innerHeight);
        }

        // Getting references to each section on the homepage.
        const elementArray = [
            document.getElementById('home') as HTMLDivElement,
            ...Array.from(document.getElementsByClassName('Section')) as HTMLDivElement[],
            document.getElementById('footer') as HTMLDivElement
        ];

        // Reducing the elements into the one that takes up the most screen real-estate.
        const newSection = elementArray.reduce((previousElement, currentElement) => {
            const currentArea = getArea(currentElement);
            const previousArea = getArea(previousElement);
            return currentArea > previousArea
                ? currentElement 
                : previousElement;
        });

        // If the section on screen changes, then we'll update the current section and the watch time of the previous section.
        if(newSection.id !== currentSection) {
            setCurrentSection(newSection.id);
            if(!currentSection) return;
            
            setWatchTime(previousWatchTime => {
                return {...previousWatchTime,
                    start: Date.now(),
                    timeStamps: {...previousWatchTime.timeStamps,
                        [currentSection]: previousWatchTime.timeStamps[currentSection as keyof typeof previousWatchTime.timeStamps] + (Date.now() - previousWatchTime.start)
                    }
                }
            });
        }
    }

    // A state variable keeping track of how much time the user has spent on each section when they've switched sections.
    // "Start" represents the starting timestamp of a new seciton.
    // This will then be subtracted from the current time once a user has scrolled past it, and will stored in the "timeStamps" for the appropriate section.
    // This is also being saved to local storage upon state change.
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

    // A callback function to start the time for the user session on page load.
    useEffect(() => {
        if(!cacheHasLoaded) return;

        setWatchTime(oldWatchTime => {
            return {...oldWatchTime,
                start: Date.now()
            }
        });
    }, [cacheHasLoaded, currentSection]);

    // Setting the default order and HTML content for each section.
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
    
    // Assigning a state variable to keep track of the order and HTML content for each section.
    // This will be stored in local storage upon state change.
    const [sectionContent, setSectionContent] = useState(sectionDefaults);
    windowCache.current.registerCache('sectionText', sectionContent, setSectionContent);

    return <>
        <Header></Header>
        <h1 style={{ display: 'none' }}>Dream State</h1>
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
            <WebsiteSlider
                portfolioConfig={pageProps.portfolioConfig}
            ></WebsiteSlider>
            <p className='ScrollDown'>
                Scroll down to see how I do it!
                <i className="fa-solid fa-angles-down"></i>
            </p>
            <svg id="RightCover" viewBox="0 0 1000 2000" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0 L 0 1590 L 250 1750 L 475 1750 L 675 2000 L 2000 2000 L 2000 0 Z" fill="#eee5e4"/></svg>
            <FloralSVG></FloralSVG>
            <HandSVG></HandSVG>
        </div>
        <div id="MyServices" className='Contain'>
            <NavBars
                contentWrapper={contentWrapper}
                currentSection={currentSection}
                sectionContent={sectionContent}
            ></NavBars>
            <div className='Content' ref={contentWrapper}>
                <DataSection
                    windowCache={windowCache.current}
                    sectionContent={sectionContent.data}
                ></DataSection>
                <AuthSection
                    windowCache={windowCache.current}
                    cachedHadLoaded={cacheHasLoaded}
                    sectionContent={sectionContent.authentication}
                ></AuthSection>
                <IntegrationSection
                    windowCache={windowCache.current}
                    sectionContent={sectionContent.integration}
                ></IntegrationSection>
                <AnalyticsSection
                    windowCache={windowCache.current}
                    watchTime={watchTime}
                    currentSection={currentSection}
                    cacheHasLoaded={cacheHasLoaded}
                    portfolioConfig={pageProps.portfolioConfig}
                    setWatchTime={setWatchTime}
                    sectionContent={sectionContent.analytics}
                    domain={pageProps.domain}
                    locationData={pageProps.locationData}
                ></AnalyticsSection>
                <UISection
                    sectionContent={sectionContent.ui}
                    allSectionContent={sectionContent}
                    setSectionContent={setSectionContent}
                    defaultSectionContent={sectionDefaults}
                    cacheHasLoaded={cacheHasLoaded}
                ></UISection>
                <WebSection
                    sectionContent={sectionContent.web}
                    portfolioConfig={pageProps.portfolioConfig}
                ></WebSection>
            </div>
        </div>
        <Footer
            portfolioConfig={pageProps.portfolioConfig}
        ></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home ServerProps={window.ServerProps}/>);

export default Home;
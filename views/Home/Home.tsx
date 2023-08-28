import React, { FunctionComponent, useEffect, useRef } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { useDispatch, useSelector } from '../store/store';
import { setNewTimeStamp } from '../store/watchTime';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FloralSVG from './components/FloralSVG';
import HandSVG from './components/HandSVG';
import DataSection from './DataSection/DataSection';
import NavBars from './components/NavBars';
import AuthSection from './AuthSection/AuthSection';
import IntegrationSection from './IntegrationSection/IntegrationSection';
import AnalyticsSection from './AnalyticsSection/AnalyticsSection';
import UISection from './UISection/UISection';
import WebSection from './WebSection/WebSection';
import WebsiteSlider from './components/WebsitesSliders';
import { setCurrentSection } from '../store/currentSection';
import AddPageView from '../components/AddPageView';

// Declaring what properties this page should inherited from the server
declare global {
    type HomePageProps = {
        domain: string
    }
}

type Props = {
    ServerProps: HomePageProps
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

    const dispatch = useDispatch();
    const currentSection = useSelector(state => state.currentSection);

    // Keeping track of what section the user has currently scrolled to.
    const contentWrapper = useRef<HTMLDivElement>(null);

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
            dispatch(setCurrentSection(newSection.id as Store["currentSection"]));
            if(!currentSection) return;
            dispatch(setNewTimeStamp(currentSection));
        }
    }

    return <>
        <AddPageView></AddPageView>
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
            <WebsiteSlider></WebsiteSlider>
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
            ></NavBars>
            <div className='Content' ref={contentWrapper}>
                <DataSection></DataSection>
                <AuthSection></AuthSection>
                <IntegrationSection></IntegrationSection>
                <AnalyticsSection
                    domain={pageProps.domain}
                ></AnalyticsSection>
                <UISection></UISection>
                <WebSection></WebSection>
            </div>
        </div>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home ServerProps={window.ServerProps.homePageProps!}/>);

export default Home;
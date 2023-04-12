import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
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
import WindowCache from './windowCache';

const Home:FunctionComponent = () => {
    const windowCache = new WindowCache();

    const iframeUrls = ['red','orange','yellow','green','blue', 'purple'];
    const sliderRate = 7;
    const sliderWrapper = useRef<HTMLDivElement>(null);
    const [startAnimations, setStartAnimations] = useState<React.CSSProperties[]>([{},{},{},{},{}]);
    const contentWrapper = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState(-1);
    
    const scrollTimeoutBuffer = useRef<NodeJS.Timeout | null>(null);
    if(typeof window != 'undefined') {
        const diffuseIn = {
            filter: 'blur(0px)',
            opacity: 1
        }
        const slideRight = {
            transform: 'translateX(0)',
            opacity: 1
        }
        const slideDown = {
            transform: 'translateY(0)',
            opacity: 1
        }
        window.addEventListener('load', () => {
            setTimeout(() => {
                setStartAnimations([diffuseIn, {}, {}, {}, {}]);
            }, 500);
            setTimeout(() => {
                setStartAnimations([diffuseIn, slideRight, {}, {}, {}]);
            }, 1000);
            setTimeout(() => {
                setStartAnimations([diffuseIn, slideRight, slideDown, {}, {}]);
            }, 1500);
            setTimeout(() => {
                setStartAnimations([diffuseIn, slideRight, slideDown, slideDown, {}]);
            }, 4500);
            setTimeout(() => {
                setStartAnimations([diffuseIn, slideRight, slideDown, slideDown, slideDown]);
            }, 4750);
        });

        document.getElementById('root')!.addEventListener('scroll', () => {
            if(scrollTimeoutBuffer.current) clearTimeout(scrollTimeoutBuffer.current)
            scrollTimeoutBuffer.current = setTimeout(() => {checkSections()}, 20);
        });
    }

    function checkSections() { 
        const clamp = (num:number, min:number, max:number) => Math.min(Math.max(num, min), max);
        const sections = Array.from(document.getElementsByClassName('Section'));
        const sectionMap = sections.map(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            return clamp(sectionBottom, 0, window.innerHeight) - clamp(sectionTop, 0, window.innerHeight);
        });
        setCurrentSection(sectionMap.reduce((previousIndex, current, i) => {
            if(current < window.innerHeight/3) return previousIndex;
            if(previousIndex == -1) return i;
            return current > sectionMap[previousIndex] ? i : previousIndex;
        }, -1));
    }
    
    setInterval(moveIframes, sliderRate*1000);

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
                    <span className='Titling' style={startAnimations[0]}>Dreams</span>
                    <span style={startAnimations[1]}>and</span>
                    <span className='Titling' style={startAnimations[2]}>Reality</span></h3>
                <div className='Subtitle'>
                    <h2 style={startAnimations[3]}>Full stack developer & full graphic designer</h2>
                    <a style={startAnimations[4]} href='/#WhatICanDo'>Learn More</a>
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
            <NavBars contentWrapper={contentWrapper} currentSection={currentSection}></NavBars>
            <div className='Content' ref={contentWrapper}>
                <DataSection windowCache={windowCache}></DataSection>
                <AuthSection windowCache={windowCache}></AuthSection>
                <IntegrationSection windowCache={windowCache}></IntegrationSection>
                <AnalyticsSection windowCache={windowCache}></AnalyticsSection>
            </div>
        </div>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home/>);

export default Home;
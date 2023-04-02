import React, { FunctionComponent, useRef, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Header from './parts/Header';
import Footer from './parts/Footer';
import FloralSVG from './parts/Home/FloralSVG';
import HandSVG from './parts/Home/HandSVG';
import Link from './parts/Home/Link';
import DataSection from './parts/Home/DataSection';

const Home:FunctionComponent = () => {
    const iframeUrls = ['red','orange','yellow','green','blue', 'purple'];
    const sliderRate = 7;
    const sliderWrapper = useRef<HTMLDivElement>(null);
    const [startAnimations, setStartAnimations] = useState<React.CSSProperties[]>([{},{},{},{},{}]);
    const navBarTop = useRef<HTMLDivElement>(null);
    const navBarBottom = useRef<HTMLDivElement>(null);
    const contentWrapper = useRef<HTMLDivElement>(null);
    const [isNavBarStatic, setIsNavBarStatic] = useState(false);
    

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

            testNavBars();
            document.getElementById('root')!.addEventListener('scroll', testNavBars);
        });
    }

    function testNavBars () {
        if(!contentWrapper.current || !navBarTop.current || !navBarBottom.current) return;
        const contentBox = contentWrapper.current.getBoundingClientRect();
        const navBarTopBox = navBarTop.current.getBoundingClientRect();
        const navBarBottomBox = navBarBottom.current.getBoundingClientRect();

        const isContentOnscreen = contentBox.top < window.innerHeight && contentBox.bottom > 0;
        const areNavBarsOnscreen = window.innerWidth > 1400 ? (navBarTopBox.top + (navBarTopBox.height/2) < window.innerHeight/2) && (navBarBottomBox.top + (navBarBottomBox.height/2) > window.innerHeight/2) : navBarTopBox.top < 0;

        setIsNavBarStatic(isContentOnscreen && areNavBarsOnscreen);
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
            <div className='NavBars'>
                <div className='NavBar Top' ref={navBarTop} style={{
                    opacity: isNavBarStatic ? 0 : 1
                }}>
                    <h2>I can create:</h2>
                    <div className='LinksWrapper'>
                        <Link url="/#data" text="Optimized data" activated={false}></Link>
                        <Link url="/#authentication" text="Secure authentication" activated={false}></Link>
                        <Link url="/#integrations" text="Seamless integrations" activated={false}></Link>
                        <Link url="/#analytics" text="Detailed analytics" activated={false}></Link>
                        <Link url="/#ui" text="User interfaces to control it all" activated={false}></Link>
                        <Link url="/#websites" text="Beautiful websites to show it all" activated={false}></Link>
                    </div>
                </div>
                <div className='NavBar Bottom' ref={navBarBottom} style={{
                    opacity: isNavBarStatic ? 0 : 1
                }}>
                    <h2>I can create:</h2>
                    <div className='LinksWrapper'>
                        <Link url="/#data" text="Optimized data" activated={false}></Link>
                        <Link url="/#authentication" text="Secure authentication" activated={false}></Link>
                        <Link url="/#integrations" text="Seamless integrations" activated={false}></Link>
                        <Link url="/#analytics" text="Detailed analytics" activated={false}></Link>
                        <Link url="/#ui" text="User interfaces to control it all" activated={false}></Link>
                        <Link url="/#websites" text="Beautiful websites to show it all" activated={false}></Link>
                    </div>
                </div>
                <div className='NavBar Static' style={{
                    display: isNavBarStatic ? 'flex' : 'none'
                }}>
                    <h2>I can create:</h2>
                    <div className='LinksWrapper'>
                        <Link url="/#data" text="Optimized data" activated={false}></Link>
                        <Link url="/#authentication" text="Secure authentication" activated={false}></Link>
                        <Link url="/#integrations" text="Seamless integrations" activated={false}></Link>
                        <Link url="/#analytics" text="Detailed analytics" activated={false}></Link>
                        <Link url="/#ui" text="User interfaces to control it all" activated={false}></Link>
                        <Link url="/#websites" text="Beautiful websites to show it all" activated={false}></Link>
                    </div>
                </div>
            </div>
            <div className='Content' ref={contentWrapper}>
                <DataSection></DataSection>
            </div>
        </div>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home/>);

export default Home;
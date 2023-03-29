import React, { FunctionComponent } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Header from './parts/Header';
import Footer from './parts/Footer';
import FloralSVG from './parts/FloralSVG';
import HandSVG from './parts/HandSVG';

const Home:FunctionComponent = () => {
    if(typeof window != 'undefined') {
        window.addEventListener('load', () => {
            const iframeSliderItems = Array.from(document.getElementsByClassName('IframeSlider')[0]!.getElementsByTagName('iframe')) as HTMLIFrameElement[];
            console.log(iframeSliderItems)
            iframeSliderItems.forEach((item, i) => {
                item.style.animation = `0.35s ease-out ${5.5 + (i*0.15)}s forwards SlideDown`;
            });
        });
    }

    return <>
        <Header></Header>
        <main>
            <div className='SplashImage'>
                <div className='MainCopy'>
                    <h1>Dream State</h1>
                    <h3>Your bridge between</h3>
                    <h3><span className='Titling'>Dreams</span><span>and</span><span className='Titling'>Reality</span></h3>
                    <div className='Subtitle'>
                        <h2>Full stack developer & full graphic designer</h2>
                        <a href='/'>Learn More</a>
                    </div>
                </div>
                <div className='IframeSlider'>
                    <iframe></iframe>
                    <iframe></iframe>
                    <iframe></iframe>
                    <iframe></iframe>
                    <iframe></iframe>
                    <iframe></iframe>
                </div>
                <svg id="RightCover" viewBox="0 0 1000 2000" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0 L 0 1590 L 250 1750 L 475 1750 L 675 2000 L 2000 2000 L 2000 0 Z" fill="#eee5e4"/></svg>
                <FloralSVG></FloralSVG>
                <HandSVG></HandSVG>
            </div>
        </main>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home/>);

export default Home;
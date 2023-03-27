import React, { FunctionComponent } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Header from './parts/Header';
import Footer from './parts/Footer';

const Home:FunctionComponent = () => {
    return <>
        <Header></Header>
        <main>
            <div className='MainCopy'>
                <h1>Dream State</h1>
                <h3>Your bridge between</h3>
                <h3><span>Dreams</span>and<span>Reality</span></h3>
                <div className='Subtitle'>
                    <h2>Full stack developer & full graphic designer</h2>
                    <a>Learn More</a>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLElement, <Home/>);

export default Home;
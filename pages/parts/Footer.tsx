import React, { FunctionComponent } from 'react';

const Footer:FunctionComponent = () => {

    return <footer id="footer">
        <div className='Contain'>
            <div className='Left'>
                <h1>Dream State</h1>
                <p>The bridge between dreams and reality</p>
            </div>
            <div className='Right'>
                <div className='Column'>
                    <a className="Link" href="/" target='_self'>
                        <p>Home</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                    <a className="Sublink" href="/#WhatICanDo" target='_self'>
                        <p>What I can do</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                    <a className="Sublink" href="/#data" target='_self'>
                        <p>Optimized Data</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                    <a className="Sublink" href="/#authentication" target='_self'>
                        <p>Secure Authentication</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                    <a className="Sublink" href="/#integration" target='_self'>
                        <p>Seamless Integrations</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                    <a className="Sublink" href="/#anayltics" target='_self'>
                        <p>Detailed Analytics</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                    <a className="Sublink" href="/#ui" target='_self'>
                        <p>User Interfaces</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                    <a className="Sublink" href="/#web" target='_self'>
                        <p>Beautiful Websites</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                </div>
                <div className='Column'>
                    <a className="Link" href="/portfolio" target='_self'>
                        <p>My portfolio</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                </div>
                <div className='Column'>
                    <a className="Link" href="/resume" target='_self'>
                        <p>My resume</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                </div>
                <div className='Column'>
                    <a className="Link" href="/about" target='_self'>
                        <p>About me</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                </div>
                <div className='Column'>
                    <a className="Link" href="/contact" target='_self'>
                        <p>Contact me</p>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
}
export default Footer;
import React, { FunctionComponent } from 'react';

type Props = {
    portfolioConfig: PortfolioConfig[]
}

const Footer:FunctionComponent<Props> = (props) => {

    return <footer id="footer">
        <div className='Contain'>
            <div className='Left'>
                <a className='DreamStateWrapper' href="/">
                    <img src="https://dreamstateospublic.s3.us-east-2.amazonaws.com/logo.png" alt='Dream State Logo'></img>
                    <div>
                        <h2>Dream State</h2>
                        <p>"Your bridge between dreams and reality"</p>
                    </div>
                </a>
            </div>
            <div className='Right'>

            </div>
            <div className='Links'>
                <div className='Row'>
                    <a className="Link" href="/">Home</a>
                    <div className='SubLinks'>
                        <a href="/#MyServices">My Services</a>
                        <a href="/#data">Optimized Data</a>
                        <a href="/#authentication">Secure Authentication</a>
                        <a href="/#integration">Seamless Integrations</a>
                        <a href="/#anayltics">Detailed Analytics</a>
                        <a href="/#ui">User Interfaces</a>
                        <a href="/#web">Beautiful Websites</a>
                    </div>
                </div>
                <div className='Row'>
                    <a className="Link" href="/portfolio">Portfolio</a>
                    <div className='SubLinks'>{
                        props.portfolioConfig.map((porfolio, i) => {
                            return <a key={i} href={`/portfolio/${porfolio.route}`}>{porfolio.name}</a>
                        })}
                    </div>
                </div>
                <div className='Row'>
                    <a className="Link" href="/about">Resume</a>
                    <div className='SubLinks'>
                        <a href="/about/resume">Download (PDF)</a>
                        <a href="https://github.com/KevinCox0427" rel="nofollow" target='_blank'>My Github Account</a>
                        <a href="https://www.linkedin.com/in/kevincox0427/" rel="nofollow" target='_blank'>My Linked In Account</a>
                    </div>
                </div>
                <div className='Row'>
                    <a className="Link" href="/contact">Contact</a>
                    <div className='SubLinks'>
                        <a href="/contact/#general">General Contact Form</a>
                        <a href="/contact/#inquiry">Inquiry Form</a>
                    </div>
                </div>
                <div className='Row' style={{
                    display: 'none'
                }}>
                    <a className="Link" href="/account">Dream State Account</a>
                </div>
            </div>
        </div>
    </footer>
}
export default Footer;
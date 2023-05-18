import React, { FunctionComponent, useState } from 'react';

type Props = {
    portfolioConfig: PortfolioConfig[]
}

const Footer:FunctionComponent<Props> = (props) => {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    })

    return <footer id="footer">
        <div className='Contain'>
            <div className='Left'>
                <div className='DreamStateWrapper'>
                    <h1>Dream State</h1>
                    <p>Your bridge between dreams and reality</p>
                </div>
            </div>
            <div className='Right'>
                
            </div>
            <div className='Links'>
                <div className='Row'>
                    <a className="Link" href="/" target='_self'>
                        <p>Home</p>
                    </a>
                    <div className='SubLinks'>
                        <a href="/#MyServices" target='_self'>
                            <p>My Services</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                        <a href="/#data" target='_self'>
                            <p>Optimized Data</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                        <a href="/#authentication" target='_self'>
                            <p>Secure Authentication</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                        <a href="/#integration" target='_self'>
                            <p>Seamless Integrations</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                        <a href="/#anayltics" target='_self'>
                            <p>Detailed Analytics</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                        <a href="/#ui" target='_self'>
                            <p>User Interfaces</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                        <a href="/#web" target='_self'>
                            <p>Beautiful Websites</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                    </div>
                </div>
                <div className='Row'>
                    <a className="Link" href="/portfolio" target='_self'>
                        <p>Portfolio</p>
                    </a>
                    <div className='SubLinks'>
                        {props.portfolioConfig.map((porfolio, i) => {
                            return <a key={i} href={`/portfolio/${porfolio.route}`}>
                                <p>{porfolio.name}</p>
                                <i className="fa-solid fa-angle-right"></i>
                            </a>
                        })}
                    </div>
                </div>
                <div className='Row'>
                    <a className="Link" href="/about" target='_self'>
                        <p>About</p>
                    </a>
                    <div className='SubLinks'>
                        <a href="/resume">
                            <p>My Resume</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                        <a href="https://github.com/KevinCox0427">
                            <p>My Github Account</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                    </div>
                </div>
                <div className='Row'>
                    <a className="Link" href="/contact" target='_self'>
                        <p>Contact</p>
                    </a>
                    <div className='SubLinks'>
                        <a href="/contact/#general">
                            <p>General Contact Form</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                        <a href="/contact/#inquiry">
                            <p>Inquiry Form</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </a>
                    </div>
                </div>
                <div className='Row' style={{
                    display: 'none'
                }}>
                    <a className="Link" href="/account">
                        <p>Dream State Account</p>
                    </a>
                </div>
            </div>
        </div>
    </footer>
}
export default Footer;
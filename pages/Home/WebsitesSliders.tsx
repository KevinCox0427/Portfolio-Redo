import React, { FunctionComponent, useEffect, useState } from "react";

type Props = {
    portfolioConfig: PortfolioConfig[]
}

const WebsiteSlider: FunctionComponent<Props> = (props) => {
    const [revealDelay, setRevealDelay] = useState(3.5);
    useEffect(() => {
        setRevealDelay(window.innerWidth < 800 ? 0.5 : 3.5);
    }, [])

    let sliderProjects = [...props.portfolioConfig];
    
    const offset = sliderProjects.splice(sliderProjects.length-1, 1)[0];
    sliderProjects = [offset, ...sliderProjects];

    for(let i = 0; i < Math.ceil(10/sliderProjects.length) - 1; i++) {
        sliderProjects = [...sliderProjects, ...props.portfolioConfig];
    }

    const sliderRate = sliderProjects.length * 8;
    
    return <div className='SliderWrapper'>
        <div className='Slider' style={{
            animation: `${sliderRate}s linear 0s infinite MoveFrontIframes`
        }}>
            {sliderProjects.map((project, i) => {
                return <div className='BrowserWrapper' key={i} style={{
                    animation: `0.3s ease-out ${ revealDelay + (0.15*sliderProjects.length - i*0.15)}s forwards SlideDown`
                }}>
                    <a className='WebsiteWrapper' href={`/portfolio/${project.route}`}>
                        <img src={project.gallery[0]} alt={`${project.name} website screenshot`}></img>
                    </a>
                    <div className='FakeBrowser'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <a href={`/portfolio/${project.route}`}>{project.name}</a>
                    </div>
                </div>
            })}
        </div>
        <div className='Slider' style={{
            animation: `${sliderRate}s linear ${sliderRate/2}s infinite MoveBackIframes`
        }}>
            {sliderProjects.map((project, i) => {
                const offsetAmount = Math.round(sliderProjects.length / 2);
                const offset = (i + offsetAmount) % sliderProjects.length;

                return <div className='BrowserWrapper' key={i} style={{
                    animation: `0.3s ease-out ${(offsetAmount*0.15) + revealDelay + (i*0.15)}s forwards SlideDown`
                }}>
                    <a className='WebsiteWrapper' href={`/portfolio/${sliderProjects[offset].route}`}>
                        <img src={sliderProjects[offset].gallery[0]} alt={`${project.name} website screenshot`}></img>
                    </a>
                    <div className='FakeBrowser'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <a href={`/portfolio/${sliderProjects[offset].route}`}>{sliderProjects[offset].name}</a>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default WebsiteSlider;
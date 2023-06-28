import React, { FunctionComponent, useEffect, useState } from "react";

type Props = {
    portfolioConfig: PortfolioConfig[]
}

/**
 * A component to create an infinite sliding gallery of websites for each portfolio project.
 * We'll create two duplicate sliders to mimic it being infinite, with one ontop of the other.
 * The second slider will be offset horizontally for half of the gallery.
 * After a full rotation, the first one will then revert back to it's original position, and then you have an infinite slider!
 * @param portfolioConfig The configuration of the portfolio. 
 */
const WebsiteSlider:FunctionComponent<Props> = (props) => {
    // Guard clause to make sure we have slides.
    if(props.portfolioConfig.length === 0) return <></>;

    // Because there's a delay in revealing at the slides, we'll move the last index to the first position so it still seems like it's in order.
    // Then we'll duplicate the array until there are at least 10 slides to avoid the gallery being empty.
    let sliderProjects = [...props.portfolioConfig];
    sliderProjects.unshift(sliderProjects.pop()!);

    for(let i = 0; i < (Math.floor(10/props.portfolioConfig.length) * props.portfolioConfig.length); i++) {
        sliderProjects.push(sliderProjects[i % props.portfolioConfig.length])
    }

    // Creating the rate in seconds of how long it takes for a full rotation.
    const sliderRate = sliderProjects.length * 8;

    // Because there are load animations on the homepage, we want to stagger when the content is revealed.
    // useState() and useEffect() are being used since the delay will changed based on if we have a mobile device or not, and we can't test for it on the server.
    const [revealDelay, setRevealDelay] = useState(3.5);
    useEffect(() => {
        setRevealDelay(window.innerWidth < 900 ? 0.5 : 3.5 - (sliderProjects.length - 10)/10);
    }, [])
    
    return <div className='SliderWrapper'>
        <div className='Slider' style={{
            animation: `${sliderRate}s linear 0s infinite MoveFrontIframes`
        }}>
            {sliderProjects.map((project, i) => {
                return <div className='BrowserWrapper' key={i} style={{
                    animation: `0.3s ease-out ${revealDelay + (0.15*sliderProjects.length - i*0.15)}s forwards SlideDown`
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
                        <img src={sliderProjects[offset].gallery[0]} alt={`${project.name} website screenshot`} loading="lazy"></img>
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
import React, { FunctionComponent } from "react";

type Props = {
    portfolioConfig: PortfolioConfig[]
}

const WebsiteSlider: FunctionComponent<Props> = (props) => {
    const revealDelay = 3.5;

    let sliderProjects = props.portfolioConfig;
    for(let i = 0; i < Math.ceil(10/props.portfolioConfig.length) - 1; i++) {
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
                        <img src={project.gallery[0]}></img>
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
                        <img src={sliderProjects[offset].gallery[0]}></img>
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
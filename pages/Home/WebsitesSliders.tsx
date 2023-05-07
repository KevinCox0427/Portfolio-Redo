import React, { FunctionComponent } from "react";

type Props = {
    sliderUrls: string[]
}

const WebsiteSlider: FunctionComponent<Props> = (props) => {
    const revealDelay = 4.75;

    let sliderUrls = props.sliderUrls;
    for(let i = 0; i < Math.ceil(10/props.sliderUrls.length) - 1; i++) {
        sliderUrls = [...sliderUrls, ...props.sliderUrls];
    }

    const sliderRate = sliderUrls.length * 8;
    
    return <div className='SliderWrapper'>
        <div className='Slider' style={{
            animation: `${sliderRate}s linear 0s infinite MoveFrontIframes`
        }}>
            {sliderUrls.map((url, i) => {
                return <div className='BrowserWrapper' key={i} style={{
                    animation: `0.3s ease-out ${revealDelay + (i*0.15)}s forwards SlideDown`
                }}>
                    <div className='FakeBrowser'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className='WebsiteWrapper'>
                        <img src={url}></img>
                    </div>
                </div>
            })}
        </div>
        <div className='Slider' style={{
            animation: `${sliderRate}s linear ${sliderRate/2}s infinite MoveBackIframes`
        }}>
            {sliderUrls.map((url, i) => {
                const offsetAmount = Math.round(sliderUrls.length / 2);
                const offset = (i + offsetAmount) % sliderUrls.length;

                return <div className='BrowserWrapper' key={i} style={{
                    animation: `0.3s ease-out ${(offsetAmount*0.15) + revealDelay + (i*0.15)}s forwards SlideDown`
                }}>
                    <div className='FakeBrowser'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className='WebsiteWrapper'>
                        <img src={props.sliderUrls[offset]}></img>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default WebsiteSlider;
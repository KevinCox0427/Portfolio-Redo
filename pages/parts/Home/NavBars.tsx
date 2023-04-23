import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import Link from "./Link";
import { SectionContent } from "../../Home";

type Props = {
    sectionContent: SectionContent[],
    contentWrapper: React.RefObject<HTMLDivElement>,
    currentSection: number
}

const NavBars:FunctionComponent<Props> = (props) => {
    const navBarStatic = useRef<HTMLDivElement>(null);
    const navBarTop = useRef<HTMLDivElement>(null);
    const navBarBottom = useRef<HTMLDivElement>(null);

    const [isNavBarStatic, setIsNavBarStatic] = useState(false);
    const [navBarStaticLimit, setNavBarStaticLimit] = useState(0);

    if(typeof window != 'undefined') {
        window.addEventListener('load', () =>{
            setTimeout(testNavBars, 50);
            document.getElementById('root')!.addEventListener('scroll', testNavBars);
            window.addEventListener('resize', testNavBars);
        })
    }

    function testNavBars () {
        if(!props.contentWrapper.current || !navBarTop.current || !navBarBottom.current || !navBarStatic.current) return;
        const contentBox = props.contentWrapper.current.getBoundingClientRect();
        const navBarTopBox = navBarTop.current.getBoundingClientRect();
        const navBarBottomBox = navBarBottom.current.getBoundingClientRect();

        const isContentOnscreen = contentBox.top < window.innerHeight && Math.floor(contentBox.bottom) > 0;
        const areNavBarsOnscreen = window.innerWidth > 1400 ? (navBarTopBox.top + (navBarTopBox.height/2) < window.innerHeight/2) && (navBarBottomBox.top + (navBarBottomBox.height/2) > window.innerHeight/2) : navBarTopBox.top < 0;
        
        setIsNavBarStatic(isContentOnscreen && areNavBarsOnscreen);
        setNavBarStaticLimit(window.innerWidth < 1400 && navBarStatic.current.clientHeight - contentBox.bottom > 0 ? -(navBarStatic.current.clientHeight - contentBox.bottom) : 0);
    }

    return <div className='NavBars'>
        <div className='NavBar Top' ref={navBarTop} style={{
            opacity: isNavBarStatic ? 0 : 1
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                {props.sectionContent.map((content, i) => {
                    return <Fragment key={i}>
                        <Link url={`/#${content.name}`} text={content.navName} activated={props.currentSection === i+1}></Link>
                    </Fragment>
                })}
            </div>
        </div>
        <div className='NavBar Bottom' ref={navBarBottom} data-html2canvas-ignore={true} style={{
            opacity: isNavBarStatic ? 0 : 1
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                {props.sectionContent.map((content, i) => {
                    return <Fragment key={i}>
                        <Link url={`/#${content.name}`} text={content.navName} activated={props.currentSection === i+1}></Link>
                    </Fragment>
                })}
            </div>
        </div>
        <div className='NavBar Static' ref={navBarStatic} data-html2canvas-ignore={true} style={navBarStaticLimit < 0 ? {
            opacity: isNavBarStatic ? 1 : 0,
            zIndex: isNavBarStatic ? 1 : -1000,
            top: navBarStaticLimit
        } : {
            opacity: isNavBarStatic ? 1 : 0,
            zIndex: isNavBarStatic ? 1 : -1000
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                {props.sectionContent.map((content, i) => {
                    return <Fragment key={i}>
                        <Link url={`/#${content.name}`} text={content.navName} activated={props.currentSection === i+1}></Link>
                    </Fragment>
                })}
            </div>
        </div>
    </div>
}

export default NavBars
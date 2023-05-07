import React, { FunctionComponent, useRef, useState } from "react";
import { SectionContent } from "../Home";

type Props = {
    sectionContent: {
        [sectionName: string]: SectionContent
    },
    contentWrapper: React.RefObject<HTMLDivElement>,
    currentSection: string
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
            document.addEventListener('scroll', testNavBars);
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
                {Object.keys(props.sectionContent).map((sectionName, i) => {
                    const currentSectionContent = props.sectionContent[sectionName as keyof typeof props.sectionContent];

                    return <a key={i} className={`Link ${props.currentSection === sectionName ? 'Activated' : ' '}`} href={`/#${sectionName}`} target='_self' style={{
                        order: currentSectionContent.order,
                        pointerEvents: isNavBarStatic ? "none" : "all"
                    }}>
                        {currentSectionContent.navName}
                    </a>
                })}
            </div>
        </div>
        <div className='NavBar Bottom' ref={navBarBottom} data-html2canvas-ignore={true} style={{
            opacity: isNavBarStatic ? 0 : 1
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                {Object.keys(props.sectionContent).map((sectionName, i) => {
                    const currentSectionContent = props.sectionContent[sectionName as keyof typeof props.sectionContent];

                    return <a key={i} className={`Link ${props.currentSection === sectionName ? 'Activated' : ' '}`} href={`/#${sectionName}`} target='_self' style={{
                        order: currentSectionContent.order,
                        pointerEvents: isNavBarStatic ? "none" : "all"
                    }}>
                        {currentSectionContent.navName}
                    </a>
                })}
            </div>
        </div>
        <div className='NavBar Static' ref={navBarStatic} data-html2canvas-ignore={true} style={navBarStaticLimit < 0 ? {
            opacity: isNavBarStatic ? 1 : 0,
            top: navBarStaticLimit
        } : {
            opacity: isNavBarStatic ? 1 : 0,
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                {Object.keys(props.sectionContent).map((sectionName, i) => {
                    const currentSectionContent = props.sectionContent[sectionName as keyof typeof props.sectionContent];

                    return <a key={i} className={`Link ${props.currentSection === sectionName ? 'Activated' : ' '}`} href={`/#${sectionName}`} target='_self' style={{
                        order: currentSectionContent.order,
                        pointerEvents: isNavBarStatic ? "all" : "none"
                    }}>
                        {currentSectionContent.navName}
                    </a>
                })}
            </div>
        </div>
    </div>
}

export default NavBars
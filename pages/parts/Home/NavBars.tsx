import React, { FunctionComponent, useRef, useState } from "react";
import Link from "./Link";

type Props = {
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
                <Link url="/#data" text="Optimized data" activated={props.currentSection == 0}></Link>
                <Link url="/#authentication" text="Secure authentication" activated={props.currentSection == 1}></Link>
                <Link url="/#integrations" text="Seamless integrations" activated={props.currentSection == 2}></Link>
                <Link url="/#analytics" text="Detailed analytics" activated={props.currentSection == 3}></Link>
                <Link url="/#ui" text="User interfaces to control it all" activated={props.currentSection == 4}></Link>
                <Link url="/#websites" text="Beautiful websites to show it all" activated={props.currentSection == 5}></Link>
            </div>
        </div>
        <div className='NavBar Bottom' ref={navBarBottom} style={{
            opacity: isNavBarStatic ? 0 : 1
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                <Link url="/#data" text="Optimized data" activated={props.currentSection == 0}></Link>
                <Link url="/#authentication" text="Secure authentication" activated={props.currentSection == 1}></Link>
                <Link url="/#integrations" text="Seamless integrations" activated={props.currentSection == 2}></Link>
                <Link url="/#analytics" text="Detailed analytics" activated={props.currentSection == 3}></Link>
                <Link url="/#ui" text="User interfaces to control it all" activated={props.currentSection == 4}></Link>
                <Link url="/#websites" text="Beautiful websites to show it all" activated={props.currentSection == 5}></Link>
            </div>
        </div>
        <div className='NavBar Static' ref={navBarStatic} style={navBarStaticLimit < 0 ? {
            opacity: isNavBarStatic ? 1 : 0,
            zIndex: isNavBarStatic ? 1 : -1000,
            top: navBarStaticLimit
        } : {
            opacity: isNavBarStatic ? 1 : 0,
            zIndex: isNavBarStatic ? 1 : -1000
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                <Link url="/#data" text="Optimized data" activated={props.currentSection == 0}></Link>
                <Link url="/#authentication" text="Secure authentication" activated={props.currentSection == 1}></Link>
                <Link url="/#integrations" text="Seamless integrations" activated={props.currentSection == 2}></Link>
                <Link url="/#analytics" text="Detailed analytics" activated={props.currentSection == 3}></Link>
                <Link url="/#ui" text="User interfaces to control it all" activated={props.currentSection == 4}></Link>
                <Link url="/#websites" text="Beautiful websites to show it all" activated={props.currentSection == 5}></Link>
            </div>
        </div>
    </div>
}

export default NavBars
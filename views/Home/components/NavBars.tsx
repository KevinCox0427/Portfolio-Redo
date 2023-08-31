import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useSelector } from "../../store/store";

type Props = {
    contentWrapper: React.RefObject<HTMLDivElement>
}

/**
 * A component to render all the navigation bars for the homepage sections.
 * @param contentWrapper The wrapper element that sorrounds all the sections. 
 */
const NavBars:FunctionComponent<Props> = (props) => {
    const sections = useSelector(state => state.sectionContent);
    const currentSection = useSelector(state => state.currentSection);

    // References for each navigation bar.
    const navBarStatic = useRef<HTMLDivElement>(null);
    const navBarTop = useRef<HTMLDivElement>(null);
    const navBarBottom = useRef<HTMLDivElement>(null);

    // State variable to determine whether the navigation bar is sticky.
    const [isNavBarSticky, setIsNavBarSticky] = useState(false);
    
    // State variable to determine the bounds of the sticky navigation bar.
    // This is for when the nav bar is in mobile view, as it has fixed positioning at the top of the screen, and at some point it needs to scroll up out of the screen.
    const [navBarStaticLimit, setNavBarStaticLimit] = useState(0);

    // Setting event listeners to change navigation bars state.
    useEffect(() => {
        testNavBars();
        document.addEventListener('scroll', testNavBars);
        window.addEventListener('resize', testNavBars);
    }, [testNavBars]);

    /**
     * Function to test for the scroll position and update navigation bar state.
     */
    function testNavBars() {
        // Make sure elements are present and getting their bounding boxes.
        if(!props.contentWrapper.current || !navBarTop.current || !navBarBottom.current || !navBarStatic.current) {
            return;
        }

        const contentBox = props.contentWrapper.current.getBoundingClientRect();
        const navBarTopBox = navBarTop.current.getBoundingClientRect();
        const navBarBottomBox = navBarBottom.current.getBoundingClientRect();

        // Testing whether the wrapper div's top is at least on the bottom of the screen and it's bottom is at least at the top of the screen.
        const isContentOnscreen = contentBox.top < window.innerHeight && Math.floor(contentBox.bottom) > 0;
        // If the screen width is larger than 1400px, then we'll test if the center of the top nav bar is at least above center screen, and if the center of the bottom nav bar is at least below center screen.
        const areNavBarsOnscreen = window.innerWidth > 1400 ? (navBarTopBox.top + (navBarTopBox.height/2) < window.innerHeight/2) && (navBarBottomBox.top + (navBarBottomBox.height/2) > window.innerHeight/2) : navBarTopBox.top < 0;

        // If both are true, that means the scroll position requires a sticky nav bar to scroll with it.
        setIsNavBarSticky(isContentOnscreen && areNavBarsOnscreen);
        
        // If we are in mobile view, then we need to scroll the sticky nav with the bottom of the content box so it scrolls out of screen.
        setNavBarStaticLimit(window.innerWidth < 1400 && navBarStatic.current.clientHeight - contentBox.bottom > 0 && contentBox.bottom > -25 ? -(navBarStatic.current.clientHeight - contentBox.bottom) : 0);
    }

    return <div className='NavBars'>
        <div className='NavBar Top' ref={navBarTop} style={{
            opacity: isNavBarSticky ? 0 : 1
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                {Object.keys(sections).map((sectionName, i) => {
                    const currentSectionContent = sections[sectionName as keyof Store["sectionContent"]];
                    return <a key={i} className={`Link ${currentSection === sectionName ? 'Activated' : ' '}`} href={`/#${sectionName}`} target='_self' style={{
                        order: currentSectionContent.order,
                        pointerEvents: isNavBarSticky ? "none" : "all"
                    }}>
                        {currentSectionContent.navName}
                    </a>
                })}
            </div>
        </div>
        <div className='NavBar Bottom' ref={navBarBottom} style={{
            opacity: isNavBarSticky ? 0 : 1
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                {Object.keys(sections).map((sectionName, i) => {
                    const currentSectionContent = sections[sectionName as keyof Store["sectionContent"]];
                    return <a key={i} className={`Link ${currentSection === sectionName ? 'Activated' : ' '}`} href={`/#${sectionName}`} target='_self' style={{
                        order: currentSectionContent.order,
                        pointerEvents: isNavBarSticky ? "none" : "all"
                    }}>
                        {currentSectionContent.navName}
                    </a>
                })}
            </div>
        </div>
        <div className='NavBar Static' ref={navBarStatic} style={navBarStaticLimit < 0 ? {
            opacity: isNavBarSticky ? 1 : 0,
            top: navBarStaticLimit
        } : {
            opacity: isNavBarSticky ? 1 : 0,
        }}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                {Object.keys(sections).map((sectionName, i) => {
                    const currentSectionContent = sections[sectionName as keyof Store["sectionContent"]];
                    return <a key={i} className={`Link ${currentSection === sectionName ? 'Activated' : ' '}`} href={`/#${sectionName}`} target='_self' style={{
                        order: currentSectionContent.order,
                        pointerEvents: isNavBarSticky ? "all" : "none"
                    }}>
                        {currentSectionContent.navName}
                    </a>
                })}
            </div>
        </div>
    </div>
}

export default NavBars
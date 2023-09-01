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

    // Reference for the navigation bar.
    const navBar = useRef<HTMLDivElement>(null);

    // State variable to determine whether the navigation bar is sticky.
    const [navBarState, setNavBarState] = useState<'top' | 'bottom' | 'sticky'>('top');

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
        if(!props.contentWrapper.current || !navBar.current) return;

        const contentBox = props.contentWrapper.current.getBoundingClientRect();
        const navBarBox = navBar.current.getBoundingClientRect();

        if(window.innerWidth <= 1400) {
            setNavBarState(
                (contentBox.top < 0
                && contentBox.bottom > navBarBox.height
                && navBarBox.bottom < contentBox.bottom) 
                    ? 'sticky'
                    : contentBox.bottom > navBarBox.height
                        ? 'top'
                        : 'bottom'
            );
            return;
        }

        setNavBarState(
            (200 + contentBox.top + (navBarBox.height/2) <= window.innerHeight/2
            && contentBox.bottom - (navBarBox.height/2) >= window.innerHeight/2)
                ? 'sticky'
                : contentBox.top > 0
                    ? 'top'
                    : 'bottom'
        );
    }

    return <>
        <div className='NavBarPlaceHolder'></div>
        <nav className={`NavBar ${navBarState}`} ref={navBar}>
            <h2>I can create:</h2>
            <div className='LinksWrapper'>
                {Object.keys(sections).map((sectionName, i) => {
                    const currentSectionContent = sections[sectionName as keyof Store["sectionContent"]];
                    return <a key={i} className={`Link ${currentSection === sectionName ? 'Activated' : ' '}`} href={`/#${sectionName}`} target='_self' style={{
                        order: currentSectionContent.order
                    }}>
                        {currentSectionContent.navName}
                    </a>
                })}
            </div>
        </nav>
    </>
}

export default NavBars
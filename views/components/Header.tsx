import React, { FunctionComponent } from 'react';

/**
 * A simple header component to be used in all our pages.
 */
const Header:FunctionComponent = () => {
    return <header id="Header">
        <a className='Logo' href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.74 1722.05">
                <path d="m1034.74,0H90C40.29,0,0,40.29,0,90v1542.05c0,10.87,1.93,21.3,5.46,30.95.5,1.38,1.04,2.74,1.61,4.09.28.67.58,1.34.88,2.01,1.5,3.32,3.2,6.54,5.08,9.63.38.62.76,1.23,1.15,1.84,1.17,1.83,2.41,3.61,3.7,5.34.43.58.87,1.15,1.32,1.72,11.13,14.17,26.43,24.91,44.04,30.39.7.22,1.41.43,2.12.63,3.56,1.01,7.21,1.81,10.93,2.38,4.47.68,9.05,1.04,13.71,1.04h944.74c4.66,0,9.24-.35,13.71-1.04,3.72-.57,7.37-1.37,10.93-2.38.71-.2,1.42-.41,2.12-.63,17.61-5.48,32.91-16.22,44.04-30.39.45-.57.88-1.14,1.32-1.72,1.3-1.73,2.53-3.51,3.7-5.34.39-.61.77-1.22,1.15-1.84,1.88-3.09,3.58-6.31,5.08-9.63.3-.66.59-1.33.88-2.01.57-1.35,1.11-2.71,1.61-4.09,3.53-9.65,5.46-20.07,5.46-30.95V90c0-49.71-40.29-90-90-90Z"/>
                <path fill="#fff" d="m293.38,1621.58c0,21.35-9.48,29.67-33.8,29.67h-91.91v-38.98h72.44c4.14,0,7.5-3.36,7.5-7.5v-37.76c0-4.14-3.36-7.5-7.5-7.5h-38.94c-20.69,0-33.5-4.91-33.5-29.38v-68.44c0-22.41,9.48-31.15,33.8-31.15h86.01v38.99h-66.54c-4.14,0-7.5,3.36-7.5,7.5v35.99c0,4.14,3.36,7.5,7.5,7.5h38.35c24.85,0,34.09,8.84,34.09,32.62v68.44Zm119,29.67v-174.22c0-4.14,3.36-7.5,7.5-7.5h42.94v-38.99h-146.66v38.99h42.94c4.14,0,7.5,3.36,7.5,7.5v174.22h45.77Zm177.66,0v-55.92c0-4.14-3.36-7.5-7.5-7.5h-38.94c-4.14,0-7.5,3.36-7.5,7.5v55.92h-45.77v-189.56c0-22.41,9.56-31.15,34.09-31.15h111.38v220.7h-45.77Zm0-174.22c0-4.14-3.36-7.5-7.5-7.5h-38.94c-4.14,0-7.5,3.36-7.5,7.5v64.9c0,4.14,3.36,7.5,7.5,7.5h38.94c4.14,0,7.5-3.36,7.5-7.5v-64.9Zm169.49,174.22v-174.22c0-4.14,3.36-7.5,7.5-7.5h42.94v-38.99h-146.66v38.99h42.95c4.14,0,7.5,3.36,7.5,7.5v174.22h45.77Zm77.95,0h121.88v-38.98h-68.61c-4.14,0-7.5-3.36-7.5-7.5v-38.05c0-4.14,3.36-7.5,7.5-7.5h68.61v-38.69h-68.61c-4.14,0-7.5-3.36-7.5-7.5v-35.99c0-4.14,3.36-7.5,7.5-7.5h68.61v-38.99h-121.88v220.7Zm-593.72-320.13c0,20.52-10.24,29.67-33.21,29.67h-112.27v-220.7h112.27c23.28,0,33.21,8.96,33.21,29.96v161.07Zm-45.77-151.75h-53.94v142.44h53.94v-142.44Zm182.16,181.42v-79.35h-49.51v79.35h-45.77v-220.7h106.96c24.54,0,34.09,8.73,34.09,31.14v60.47c0,12.92-4.78,19.64-16.51,23.21l-5.32,1.62v12.71l6.51.87c7.13.95,15.32,4.12,15.32,20.29v70.38h-45.77Zm0-181.72h-49.51v63.67h49.51v-63.67Zm208.66.54v-38.98h-121.88v220.7h121.88v-38.98h-76.11v-53.59l76.11.54v-38.69h-76.11v-50.99h76.11Zm139.25,181.18v-63.42h-53.94v63.42h-45.77v-189.56c0-22.41,9.56-31.14,34.09-31.14h111.38v220.7h-45.77Zm0-174.22c0-4.14-3.36-7.5-7.5-7.5h-38.94c-4.14,0-7.5,3.36-7.5,7.5v64.9c0,4.14,3.36,7.5,7.5,7.5h38.94c4.14,0,7.5-3.36,7.5-7.5v-64.9Zm300.27,174.22v-220.7h-36.43l-70.19,128.42-71.13-128.42h-35.58v220.7h44.88v-125.36l61.65,104.8,61.91-103.91v124.46h44.88Z"/>
                <path fill="#27ffac" d="m567.66,504.91c52.12,55.93,101.75,113.75,153.93,174.54,88.4,102.99,188.37,219.45,330.68,362.53,7.1-10.66,11.05-23.32,11.05-36.39v-456.79c-12.36,12.35-26.49,23.52-42.12,33.19-32.42,20.06-71.44,33.78-112.84,39.7-16.03,2.29-32.4,3.43-48.94,3.43-43.18,0-87.62-7.75-130.79-22.98-57.51-20.29-111.54-52.95-160.99-97.24Z"/>
                <path fill="#8400ff" d="m600.68,467.37c44.65,40.06,93.18,69.49,144.6,87.63,52.14,18.39,106.09,24.34,156.02,17.21,69.07-9.87,126.07-44.53,152.48-92.7,3.75-6.84,6.91-14,9.37-21.28.06-.16.12-.32.18-.48V123.49c0-36.19-29.44-65.63-65.63-65.63h-271.68c-9.07,0-13.84,6.18-15.29,11.96s-.14,13.39,7.8,17.62c71.24,37.98,121.38,82.15,149.02,131.29,25.16,44.71,29.96,91,13.88,133.86-16.71,44.57-54.51,80.79-106.44,101.99-51.6,21.07-111.66,25.43-174.31,12.78Z"/>
                <path fill="#ffc219" d="m1009.74,1070.11c-139.83-141.09-238.59-256.15-326.09-358.09-52.39-61.04-102.2-119.06-154.27-174.83,31.73,53.44,53.79,112.27,64.15,171.42,11.31,64.58,8.78,129.65-7.31,188.18-12.6,45.84-33.03,86.91-60.72,122.08-15.48,19.66-33.01,37.13-52.41,52.35h524.6c4.08,0,8.11-.38,12.05-1.11Z"/>
                <path fill="#f04" d="m77.5,695.41c-5.6,1.53-11.59,6.33-11.59,15.18v295c0,36.19,29.44,65.63,65.63,65.63h242.3c1.28-.82,2.65-1.54,4.1-2.14,5.96-2.43,11.89-5.1,17.63-7.92,35.72-17.55,66.22-42.19,90.66-73.22,23.55-29.9,40.97-65.03,51.79-104.4,14.14-51.45,16.31-108.96,6.27-166.31-8.37-47.82-25.3-95.49-49.43-139.67,3.61,54.91-7.88,106.18-33.6,149.12-26.06,43.51-65.65,76-111.47,91.47-44.25,14.94-90.67,13.35-134.26-4.59-47.24-19.44-88.85-57.83-120.34-111-3.39-5.72-8.52-7.75-13.24-7.75-1.55,0-3.06.22-4.45.6Z"/>
                <path fill="#fff" d="m575,438.62l-202.76-200.8,112.86-112.86L63.56,57.87l67.72,420.91,126.76-126.76,202.76,200.8c6.47,6.47,16.95,6.47,23.42,0l90.78-90.78c6.47-6.47,6.47-16.95,0-23.42Z"/>
            </svg>
        </a>
        <nav className='Links'>
            <a href='/#MyServices'>Services</a>
            <a href='/portfolio'>Portfolio</a>
            <a href='/about'>Resume</a>
            <a href='/contact'>Contact</a>
        </nav>
    </header>
}

export default Header;
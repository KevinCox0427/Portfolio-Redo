import React, { FunctionComponent } from "react";

type Props = {
    pageViews: {
        [pageName:string]: number
    },
    resetPageViews: () => void,
    domain: string
}

const PageViews: FunctionComponent<Props> = (props) => {
    
    return <div className="Graph PageViews">
        <h3>
            Page Views:
            <i className="fa-solid fa-rotate-left Reset" onClick={props.resetPageViews}></i>
        </h3>
        <div className="Wrapper">
            {Object.keys(props.pageViews).sort((a, b) => {
                if(a === b) return 0;
                return a > b ? 1 : -1;
            }).map((pageName, i) => {
                return <div className="Row" key={i} style={{
                    paddingLeft: `${(pageName.split('/').length - 1) * 2}em`
                }}>
                    <a href={`/${pageName}`}>
                        {pageName.split('/').length === 1 ? props.domain : ''}
                        /
                        {pageName.split('/')[pageName.split('/').length - 1]}:</a>
                    <p>{props.pageViews[pageName]}</p>
                </div>
            })}
        </div>
    </div>
}

export default PageViews;
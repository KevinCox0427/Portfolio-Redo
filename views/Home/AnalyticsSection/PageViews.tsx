import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { resetPageViews } from "../../store/pageViews";

type Props = {
    domain: string
}

/**
 * A component to be used in the analytics section for the homepage to display to the user how many times they've visited each page.
 * @param portfolioConfig The portfolio configuration object. This is used to list each project's page and its viewcount.
 * @param domain The name of the domain that this is currently running on. This is used to display full urls on the view coutns.
 */
const PageViews: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    const pageViews = useSelector(state => state.pageViews);
    
    return <div className="Graph PageViews">
        <h3>
            Page Views:
            <i className="fa-solid fa-rotate-left Reset" onClick={() => dispatch(resetPageViews())}></i>
        </h3>
        <div className="Wrapper">
            {Object.keys(pageViews).sort((a, b) => {
                if(a === b) return 0;
                return a > b
                    ? 1
                    : -1;
            }).map((pageName, i) => {
                return <div className="Row" key={i} style={{
                    paddingLeft: `${(pageName.split('/').length - 1) * 2}em`
                }}>
                    <a href={`/${pageName}`}>
                        {pageName.split('/').length === 1 ? props.domain : ''}
                        /
                        {pageName.split('/')[pageName.split('/').length - 1]}:</a>
                    <p>{pageViews[pageName]}</p>
                </div>
            })}
        </div>
    </div>
}

export default PageViews;
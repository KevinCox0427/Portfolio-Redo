import React, { FunctionComponent } from "react";

type Props = {
    project: PortfolioConfig,
    style?: React.CSSProperties,
    tagCallback?: React.MouseEventHandler<HTMLParagraphElement>
}

/**
 * A React Component to render a portfolio project as a linkable card.
 * 
 * @param project The data from the porfolio config of a specific project.
 * @param style (optional) Any additional CSS styling.
 * @param tagCallback (optional) A callback function if you want to adjust what happens when a user clicks on its tag. This is mostly used for the porfolio search page, as we don't want the page to reload, but rather we just want to set the state for a tag filter. 
 */
const PortfolioCard: FunctionComponent<Props> = (props) => {
    /**
     * A function to determine where to redirect the user if the tag is clicked.
     */
    function handleTagLink(e:React.MouseEvent<HTMLParagraphElement>) {
        /**
         * Otherwise, if a tagCallback is provided, we'll just use that.
         */
        if(props.tagCallback) {
            props.tagCallback(e);
        }
        /**
         * Otherwise the tag is a <p> element since we can't nest an <a> inside an <a> (Ik it's ugly)
         * So, instead we'll preventDefault() and manually enter the link.
         */
        else {
            e.preventDefault();
            window.location.href = `/portfolio?tag=${props.project.tag.split(' ').join('')}`;
        }
    }

    return <a className="Project"  href={`/portfolio/${props.project.route}`} style={props.style ? props.style : {}}>
        <div className="ImageWrapper">
            <img src={props.project.logo} alt={`${props.project.name} logo`}></img>
        </div>
        <div className="Card">
            <h2>{props.project.name}</h2>
            <p className="Description">{
                props.project.description[0].length > 200 ? 
                    props.project.description[0].substring(0,197) + '...' 
                : 
                    props.project.description[0]
            }</p>
            <div className="Tags">
                <p className="Tag" onClick={handleTagLink}>{
                    props.project.tag
                }</p>
                <ul className="Skills">
                    {props.project.skills.map((skill, i) => {
                        return <li key={i}>{skill}</li>
                    })}
                </ul>
            </div>
        </div>
    </a>
}

export default PortfolioCard;
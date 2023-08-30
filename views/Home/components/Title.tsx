import React, { FunctionComponent } from "react";
import parse, { Element } from 'html-react-parser';

type Props = {
    content: string
}

/**
 * A component to render the customizable title and descriptions of each section.
 * These are html stirngs created by Quill.js, and just need to be parsed into React components.
 * @param content The HTML string to parse. Only accepts elemts with tag p, h3, a, span, em, strong, small, and image.
 */
const Title:FunctionComponent<Props> = (props) => {
    return <div className="TitleWrapper">
        {parse(props.content, {
            // A callback function to filter only accepted HTML elements.
            replace: (node) => {
                const validTags = ['P', 'H3', 'A', 'SPAN', 'EM', 'STRONG', 'SMALL', 'IMAGE', 'BLOCKQUOTE', 'SUP', 'S', 'U'];
                if(!(node instanceof Element)) return node;
                if(validTags.includes(node.tagName)) return node;
                return false;
            }
        })}
    </div>
}

export default Title;
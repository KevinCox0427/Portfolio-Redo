import React, { FunctionComponent } from "react";
import parse, { Element } from 'html-react-parser';

type Props = {
    content: string
}

const Title: FunctionComponent<Props> = (props) => {
    
    return <div className="TitleWrapper">
        {parse(props.content, {
            replace: (node) => {
                const validTags = ['P', 'H3', 'A', 'SPAN', 'EM', 'STRONG', 'SMALL', 'IMAGE'];
                if(!(node instanceof Element)) return node;
                if(validTags.includes(node.tagName)) return node;
                return false;
            }
        })}
    </div>
}

export default Title;
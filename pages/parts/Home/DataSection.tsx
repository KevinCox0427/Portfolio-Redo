import React, { FunctionComponent, useState } from "react";
import WindowCache from "../windowCache";
import JsonInput from "./DataSection/JsonInput";
import Result from "./DataSection/Result";
import { SectionContent } from "../../Home";
import parse, { Element } from 'html-react-parser';

export type { CurrentData }

type CurrentData = {
    name: string,
    price: string,
    description: string,
    minQuantity: number | null,
    maxQuantity: number | null,
    categories: string[],
    imageUrls: string[],
    sales: {
        type: string,
        amount: string,
        expires: {
            day: number | null,
            month: number | null,
            year: number | null
        }
    }[]
}

type Props = {
    windowCache: WindowCache,
    sectionContent: SectionContent
}

const DataSection:FunctionComponent<Props> = (props) => {
    const [currentData, setCurrentData] = useState<CurrentData>({
        name: '',
        price: '',
        description: '',
        minQuantity: null,
        maxQuantity: null,
        categories:[],
        imageUrls: [],
        sales: []
    });
    props.windowCache.registerCache('DreamStateDataEntry', currentData, setCurrentData);

    return <div id={props.sectionContent.name} className='Section'>
        {parse(props.sectionContent.content, {
            replace: (node) => {
                const validTags = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span', 'em', 'strong', 'small', 'image'];
                if(!(node instanceof Element)) return node;
                if(validTags.includes(node.tagName.toLowerCase())) return node;
                return false;
            }
        })}
        <div className='Example'>
            <JsonInput currentData={currentData} setCurrentData={setCurrentData}></JsonInput>
            <Result currentData={currentData}></Result>
        </div>
    </div>
}

export default DataSection;
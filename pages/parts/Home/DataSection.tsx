import React, { FunctionComponent, useState } from "react";
import WindowCache from "../windowCache";
import JsonInput from "./DataSection/JsonInput";
import Result from "./DataSection/Result";
import { SectionContent } from "../../Home";

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
    content: SectionContent
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

    return <div id={props.content.name} className='Section'>
        <h3 className='Title'>{props.content.title}</h3>
        <p className='Description'>
            {props.content.description}
            <span>{props.content.subDescription}</span>
        </p>
        <div className='Example'>
            <JsonInput currentData={currentData} setCurrentData={setCurrentData}></JsonInput>
            <Result currentData={currentData}></Result>
        </div>
    </div>
}

export default DataSection;
import React, { FunctionComponent, useState } from "react";
import WindowCache from "../../parts/windowCache";
import JsonInput from "./JsonInput";
import Result from "./Result";
import Title from "../Title";

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
    sectionContent: SectionContent,
    style: React.CSSProperties
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
    props.windowCache.registerCache('dataEntry', currentData, setCurrentData);

    return <div id="data" className='Section' style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className='Example'>
            <JsonInput currentData={currentData} setCurrentData={setCurrentData}></JsonInput>
            <Result currentData={currentData}></Result>
        </div>
    </div>
}

export default DataSection;
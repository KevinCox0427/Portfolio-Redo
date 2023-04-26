import React, { FunctionComponent, useState } from "react";
import WindowCache from "../../windowCache";
import JsonInput from "./JsonInput";
import Result from "./Result";
import { SectionContent } from "../../../Home";
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
        <Title content={props.sectionContent.content}></Title>
        <div className='Example'>
            <JsonInput currentData={currentData} setCurrentData={setCurrentData}></JsonInput>
            <Result currentData={currentData}></Result>
        </div>
    </div>
}

export default DataSection;
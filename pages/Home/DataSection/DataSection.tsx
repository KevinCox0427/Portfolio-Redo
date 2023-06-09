import React, { FunctionComponent, useState } from "react";
import WindowCache from "../../components/windowCache";
import JsonInput from "./JsonInput";
import Result from "./Result";
import Title from "../components/Title";

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

/**
 * The component for the Data section for the homepage.
 * 
 * @param windowCache The utility class that saves state variables into local storage upon state change.
 * @param sectionContent The title and description for this section. Can be changed.
 */
const DataSection:FunctionComponent<Props> = (props) => {
    /**
     * The state variable to control the data of the fake product.
     * Also saving it to local storage upon state change.
     */
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

    return <div id="data" className='Section'  style={{
        order: props.sectionContent.order,
        zIndex: 6 - props.sectionContent.order
    }}>
        <Title content={props.sectionContent.content}></Title>
        <div className='Example'>
            <JsonInput currentData={currentData} setCurrentData={setCurrentData}></JsonInput>
            <Result currentData={currentData}></Result>
        </div>
    </div>
}

export default DataSection;
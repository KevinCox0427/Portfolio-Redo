import React, { FunctionComponent, useState } from "react";
import JsonInput from "./JsonInput";
import Result from "./Result";
import Title from "../components/Title";
import { useSelector } from "../../store/store";

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

/**
 * The component for the Data section for the homepage.
 */
const DataSection:FunctionComponent = () => {
    const sectionContent = useSelector(state => state.sectionContent.data);

    return <div
        id="data"
        className='Section'
        style={{
            order: sectionContent.order,
            zIndex: 6 - sectionContent.order
        }}
    >
        <Title
            content={sectionContent.content}
        ></Title>
        <div className='Example'>
            <JsonInput></JsonInput>
            <Result></Result>
        </div>
    </div>
}

export default DataSection;
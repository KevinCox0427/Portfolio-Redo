import React, { FunctionComponent } from "react";
import { CurrentData } from "./DataSection";
import SaleJsonInput from "./SalesJsonInput";

type Props = {
    currentData: CurrentData,
    setCurrentData: React.Dispatch<React.SetStateAction<CurrentData>>
}

/**
 * A component that renders the "JSON" data structure to input values for a fake product.
 * 
 * @param currentData The state variable that stores the information for the fake product.
 * @param setCurrentData The setter function to edit the information of the fake product.
 */
const JsonInput:FunctionComponent<Props> = (props) => {
    /**
     * A function to reset the currentData to empty values.
     */
    function reset() {
        props.setCurrentData({
            name: '',
            price: '',
            description: '',
            minQuantity: null,
            maxQuantity: null,
            categories:[],
            imageUrls: [],
            sales: []
        });
    }

    /**
     * A function to overwrite string values on top level keys.
     * 
     * @param key The top-level key who's value is being overwritten.
     * @param value The new value to overwrite with.
     */
    function setString(key:string, value:string) {
        props.setCurrentData(oldData => {
            return {...oldData,
                [key]: value
            }
        });
    }

    /**
     * A function to overwrite price string values on top level keys.
     * Uses a regex test to ensure valid format.
     * 
     * @param key The top-level key who's value is being overwritten.
     * @param value The new value to overwrite with.
     */
    function setPrice(key:string, value:string) {
        if(value && !value.match(/^[\d]+.?([\d]{1,2})?$/)) return;

        props.setCurrentData(oldData => {
            return {...oldData,
                [key]: value
            }
        });
    }

    /**
     * A function to overwrite integer values on top level keys.
     * 
     * @param key The top-level key who's value is being overwritten.
     * @param value The new value to overwrite with.
     */
    function setInteger(key:string, value:string) {
        const newMinQuantity = parseInt(value);
        if(value && Number.isNaN(newMinQuantity)) return;

        props.setCurrentData(oldData => {
            return {...oldData,
                [key]: Number.isNaN(newMinQuantity) ? null : newMinQuantity
            }
        });
    }

    /**
     * A function to push an empty string into a string array.
     * 
     * @param key The top-level key who's array is being pushed to.
     */
    function addToStringArray(key:string) {
        props.setCurrentData(oldData => {
            return {...oldData,
                [key]: [...oldData.categories, '']
            }
        });
    }

    /**
     * A function to overwrite a string value for a given index in a string array.
     * 
     * @param key The top-level key who's array is being editted.
     * @param value The new value to overwrite with.
     * @param index The index of the value been overwritten.
     */
    function editStringArray(key:string, value:string, index:number) {
        const newArray = [...(props.currentData[key as keyof typeof props.currentData] as string[])];
        newArray[index] = value;

        props.setCurrentData(oldData => {
            return {...oldData,
                [key]: newArray
            }
        });
    }

    /**
     * A function to remove an index on a string array for a top-level key.
     * 
     * @param key The top-level key who's array is being editted.
     * @param index The index of the value been removed.
     */
    function deleteFromArray(key:string, index:number) {
        const newArray = [...(props.currentData[key as keyof typeof props.currentData] as string[])];
        newArray.splice(index, 1);

        props.setCurrentData(oldData => {
            return {...oldData,
                [key]: newArray
            }
        });
    }
    
    return <div className='DataEntry'>
        <div className='Line'>
            <span className='Green'>"shopItems"</span>
            :
            <span className='Purple'>&#91;</span>
            <span className='Yellow'>&#123;</span>
            <i className="fa-solid fa-arrow-rotate-left Reset" onClick={reset}></i>
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"name"</span>
            :
            <input style={{marginLeft: '0.5em'}} value={props.currentData.name} onChange={e => {setString('name', e.target.value)}}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"price"</span>
            :
            <input style={{marginLeft: '0.5em'}} value={props.currentData.price ? props.currentData.price : ''} onChange={e => {setPrice('price', e.target.value)}}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"description"</span>
            :
            <input style={{marginLeft: '0.5em'}} value={props.currentData.description} onChange={e => {setString('description', e.target.value)}}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"minimumQuantity"</span>
            :
            <input style={{marginLeft: '0.5em'}} value={props.currentData.minQuantity ? props.currentData.minQuantity : ''} onChange={e => {setInteger('minQuantity', e.target.value)}}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"maximumQuantity"</span>
            :
            <input style={{marginLeft: '0.5em'}} value={props.currentData.maxQuantity ? props.currentData.maxQuantity : ''} onChange={e => {setInteger('maxQuantity', e.target.value)}}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"categories"</span>
            :
            <span className='Purple'>&#91;</span>
        </div>
        {props.currentData.categories.map((category, i) => {
            return <div key={i} className='Line' style={{marginLeft: '2.5em'}}>
                <i className="fa-regular fa-trash-can DeleteButton" onClick={e => {deleteFromArray('categories', i)}}></i>
                <input value={category} onChange={e => {editStringArray('categories', e.target.value, i)}}></input>
            </div>
        })}
        <div className='Line' style={{marginLeft: '2.5em'}}>
            <i className="fa-regular fa-plus AddButton" onClick={e => {addToStringArray('categories')}}></i>
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Purple'>&#93;</span>
            ,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"imageUrls"</span>
            :
            <span className='Purple'>&#91;</span>
        </div>
        {props.currentData.imageUrls.map((url, i) => {
            return <div key={i} className='Line' style={{marginLeft: '2.5em'}}>
                <i className="fa-regular fa-trash-can DeleteButton" onClick={e => {deleteFromArray('imageUrls', i)}}></i>
                <input value={url} onChange={e => {editStringArray('imageUrls', e.target.value, i)}}></input>
            </div>
        })}
        <div className='Line' style={{marginLeft: '2.5em'}}>
            <i className="fa-regular fa-plus AddButton" onClick={e => {addToStringArray('imageUrls')}}></i>
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Purple'>&#93;</span>
            ,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"sales"</span>
            :
            <span className='Purple'>&#91;</span>
        </div>
        <SaleJsonInput currentData={props.currentData} setCurrentData={props.setCurrentData}></SaleJsonInput>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Purple'>&#93;</span>
        </div>
        <div className='Line'>
            <span className='Yellow'>&#125;</span>
            <span className='Purple'>&#93;</span>
        </div>
    </div>
}

export default JsonInput;
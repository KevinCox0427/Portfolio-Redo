import React, { FunctionComponent } from "react";
import SaleJsonInput from "./SalesJsonInput";
import { useDispatch, useSelector } from "../../store/store";
import { addToStringArrayData, deleteFromArrayData, editStringArrayData, resetProduct, setPriceData, setQuantity, setStringData } from "../../store/fakeProductData";

/**
 * A component that renders the "JSON" data structure to input values for a fake product.
 */
const JsonInput:FunctionComponent = () => {
    const dispatch = useDispatch();
    const productData = useSelector(state => state.fakeProductData);
    
    return <div className='DataEntry'>
        <div className='Line'>
            <span className='Green'>"shopItems"</span>
            :
            <span className='Purple'>&#91;</span>
            <span className='Yellow'>&#123;</span>
            <i
                className="fa-solid fa-arrow-rotate-left Reset"
                onClick={() => dispatch(resetProduct())}
            ></i>
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"name"</span>
            :
            <input
                style={{marginLeft: '0.5em'}}
                value={productData.name}
                onChange={e => {dispatch(setStringData({ key: 'name', value: e.target.value }))}}
            ></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"price"</span>
            :
            <input
                style={{marginLeft: '0.5em'}}
                value={productData.price ? productData.price : ''}
                onChange={e => {dispatch(setPriceData(e.target.value))}}
            ></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"description"</span>
            :
            <input
                style={{marginLeft: '0.5em'}}
                value={productData.description}
                onChange={e => {dispatch(setStringData({ key: 'description', value: e.target.value }))}}
            ></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"minimumQuantity"</span>
            :
            <input
                style={{marginLeft: '0.5em'}}
                value={productData.minQuantity ? productData.minQuantity : ''}
                onChange={e => {dispatch(setQuantity({key: 'minQuantity', value: e.target.value }))}}
            ></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"maximumQuantity"</span>
            :
            <input
                style={{marginLeft: '0.5em'}}
                value={productData.maxQuantity ? productData.maxQuantity : ''}
                onChange={e => {dispatch(setQuantity({key: 'maxQuantity', value: e.target.value }))}}
            ></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"categories"</span>
            :
            <span className='Purple'>&#91;</span>
        </div>
        {productData.categories.map((category, i) => {
            return <div key={i} className='Line' style={{marginLeft: '2.5em'}}>
                <i
                    className="fa-regular fa-trash-can DeleteButton"
                    onClick={e => {dispatch(deleteFromArrayData({ key: 'categories', index: i }))}}
                ></i>
                <input
                    value={category}
                    onChange={e => {dispatch(editStringArrayData(({key: 'categories', value: e.target.value, index: i })))}}
                ></input>
            </div>
        })}
        <div className='Line' style={{marginLeft: '2.5em'}}>
            <i
                className="fa-regular fa-plus AddButton"
                onClick={e => {dispatch(addToStringArrayData('categories'))}}
            ></i>
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
        {productData.imageUrls.map((url, i) => {
            return <div key={i} className='Line' style={{marginLeft: '2.5em'}}>
                <i
                    className="fa-regular fa-trash-can DeleteButton"
                    onClick={e => {dispatch(deleteFromArrayData({ key: 'imageUrls', index: i }))}}
                ></i>
                <input
                    value={url}
                    onChange={e => {dispatch(editStringArrayData(({key: 'imageUrls', value: e.target.value, index: i })))}}
                ></input>
            </div>
        })}
        <div className='Line' style={{marginLeft: '2.5em'}}>
            <i
                className="fa-regular fa-plus AddButton"
                onClick={e => {dispatch(addToStringArrayData('imageUrls'))}}
            ></i>
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
        <SaleJsonInput></SaleJsonInput>
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
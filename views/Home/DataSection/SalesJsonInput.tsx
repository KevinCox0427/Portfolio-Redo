import React, { FunctionComponent, Fragment } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { addSale, changeSaleAmount, changeSaleType, deleteSale, editSaleExpiration } from "../../store/fakeProductData";

/**
 * A component for the JsonInput.tsx to render the editor for the sales on a fake product.
 */
const SaleJsonInput: FunctionComponent = () => {
    const dispatch = useDispatch();
    const saleData = useSelector(state => state.fakeProductData.sales);

    return <>
        {saleData.map((sale, i) => {
            return <Fragment key={i}>
                <div className='Line' style={{marginLeft: '2.5em'}}>
                    <button className="DeleteButton" onClick={e => {dispatch(deleteSale(i))}}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                    <span className='Yellow'>&#123;</span>
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Green'>"type"</span>
                    :
                    <select
                        style={{marginLeft: '1.25em'}}
                        value={sale.type}
                        onChange={e => {dispatch(changeSaleType({ value: e.target.value as "flat" | "percent", index: i }))}}
                    >
                        <option value="fixed">fixed</option>
                        <option value="percent">percent</option>
                    </select>
                    ,
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Green'>"reducedAmount"</span>
                    :
                    <input
                        style={{marginLeft: '0.5em'}}
                        value={sale.amount ? sale.amount : ''}
                        onChange={e => {dispatch(changeSaleAmount({ value: e.target.value, index: i }))}}
                    ></input>
                    ,
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Green'>"expires"</span>: <span className='Yellow'>&#123;</span>
                </div>
                <div className='Line' style={{marginLeft: '5em'}}>
                    <span className='Green'>"day"</span>
                    :
                    <input
                        style={{marginLeft: '0.5em'}}
                        value={sale.expires.day ? sale.expires.day : ''}
                        onChange={e => {dispatch(editSaleExpiration({ key: 'day', value: e.target.value, index: i }))}}
                    ></input>
                    ,
                </div>
                <div className='Line' style={{marginLeft: '5em'}}>
                    <span className='Green'>"month"</span>
                    :
                    <input
                        style={{marginLeft: '0.5em'}}
                        value={sale.expires.month ? sale.expires.month : ''}
                        onChange={e => {dispatch(editSaleExpiration({ key: 'month', value: e.target.value, index: i }))}}
                    ></input>
                    ,
                </div>
                <div className='Line' style={{marginLeft: '5em'}}>
                    <span className='Green'>"year"</span>
                    :
                    <input
                        style={{marginLeft: '0.5em'}}
                        value={sale.expires.year ? sale.expires.year : ''}
                        onChange={e => {dispatch(editSaleExpiration({ key: 'year', value: e.target.value, index: i }))}}
                    ></input>
                    ,
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Yellow'>&#125;</span>,
                </div>
                <div className='Line' style={{marginLeft: '2.5em'}}>
                    <span className='Yellow'>&#125;</span>
                    {i != saleData.length - 1 ? ',' : ''}
                </div>
            </Fragment>
        })}
        <div className='Line' style={{marginLeft: '2.5em'}}>
            <button className="AddButton" onClick={() => dispatch(addSale())}>
                <i className="fa-regular fa-plus"></i>
            </button>
        </div>
    </>
}

export default SaleJsonInput;
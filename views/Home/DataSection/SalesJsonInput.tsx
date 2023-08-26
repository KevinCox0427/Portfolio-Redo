import React, { FunctionComponent, Fragment } from "react";
import { useDispatch, useSelector } from "../../store/store";

/**
 * A component for the JsonInput.tsx to render the editor for the sales on a fake product.
 */
const SaleJsonInput: FunctionComponent = () => {
    const dispatch = useDispatch();
    const saleData = useSelector(state => state.fakeProductData.sales);

    /**
    * A function to overwrite a value for a sale at a given index.
    * @param key The key who's value is being overwritten.
    * @param value The new value to overwrite with.
    * @param index The index of the sale that's being editted.
    */
    function changeValue(key:'type' | 'amount', value:string, index:number) {
        const newSales = [...props.currentData.sales];
        newSales[index][key] = value;

        props.setCurrentData(oldData => {
            return {...oldData,
                sales: newSales
            }
        });
    }

    /**
    * A function to overwrite a value for a expiration date on a sale at a given index.
    * @param key The key who's value is being overwritten.
    * @param value The new value to overwrite with.
    * @param index The index of the sale that's being editted.
    */
    function editExpiration(key:'day' | 'month' | 'year', value:string, index:number) {
        const newSales = [...props.currentData.sales];
        
        const parsedValue = parseInt(value);
        if(value && Number.isNaN(parsedValue)) return;

        newSales[index].expires[key] = Number.isNaN(parsedValue) ? null : parsedValue;

        props.setCurrentData(oldData => {
            return {...oldData,
                sales: newSales
            }
        });
    }

    /**
    * A function to add a new sale.
    */
    function addSale() {
        props.setCurrentData(oldData => {
            const date = new Date();
            return {...oldData,
                sales: [...oldData.sales, {
                    type: 'flat',
                    amount: '',
                    expires: {
                        day: date.getDate() + 1,
                        month: date.getMonth() + 1,
                        year: date.getFullYear()
                    }
                }]
            }
        });
    }

    /**
     * A function to remove a sale at a given index.
     * 
     * @param index The index to remove.
     */
    function deleteSale(index:number) {
        const newSales = [...props.currentData.sales];
        newSales.splice(index, 1);

        props.setCurrentData(oldData => {
            return {...oldData,
                sales: newSales
            }
        });
    }

    return <>
        {saleData.map((sale, i) => {
            return <Fragment key={i}>
                <div className='Line' style={{marginLeft: '2.5em'}}>
                    <i className="fa-regular fa-trash-can DeleteButton" onClick={e => {deleteSale(i)}}></i>
                    <span className='Yellow'>&#123;</span>
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Green'>"type"</span>
                    :
                    <select style={{marginLeft: '1.25em'}} value={sale.type} onChange={e => {changeValue('type', e.target.value, i)}}>
                        <option value="fixed">fixed</option>
                        <option value="percent">percent</option>
                    </select>
                    ,
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Green'>"reducedAmount"</span>
                    :
                    <input style={{marginLeft: '0.5em'}} value={sale.amount ? sale.amount : ''} onChange={e => {changeValue('amount', e.target.value, i)}}></input>
                    ,
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Green'>"expires"</span>: <span className='Yellow'>&#123;</span>
                </div>
                <div className='Line' style={{marginLeft: '5em'}}>
                    <span className='Green'>"day"</span>
                    :
                    <input style={{marginLeft: '0.5em'}} value={sale.expires.day ? sale.expires.day : ''} onChange={e => {editExpiration('day', e.target.value, i)}}></input>
                    ,
                </div>
                <div className='Line' style={{marginLeft: '5em'}}>
                    <span className='Green'>"month"</span>
                    :
                    <input style={{marginLeft: '0.5em'}} value={sale.expires.month ? sale.expires.month : ''} onChange={e => {editExpiration('month', e.target.value, i)}}></input>
                    ,
                </div>
                <div className='Line' style={{marginLeft: '5em'}}>
                    <span className='Green'>"year"</span>
                    :
                    <input style={{marginLeft: '0.5em'}} value={sale.expires.year ? sale.expires.year : ''} onChange={e => {editExpiration('year', e.target.value, i)}}></input>
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
            <i className="fa-regular fa-plus AddButton" onClick={addSale}></i>
        </div>
    </>
}

export default SaleJsonInput;
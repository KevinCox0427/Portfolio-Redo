import React, { Fragment, FunctionComponent } from "react";
import { CurrentData } from "./DataSection";

const date = new Date();

type Props = {
    currentData: CurrentData,
    setCurrentData: React.Dispatch<React.SetStateAction<CurrentData>>
}

const JsonInput: FunctionComponent<Props> = (props) => {
    function isPrice(price:string) {
        if(price == '') return true;
        if(typeof price.split('.')[1] != 'undefined' && price.split('.')[1].length > 2) return false;
        return price.match(/^[\d.]+$/);
    }
    
    return <div className='DataEntry'>
        <div className='Line'>
            <span className='Green'>"shopItems"</span>: <span className='Purple'>&#91;</span> <span className='Yellow'>&#123;</span><i className="fa-solid fa-arrow-rotate-left Reset" onClick={() => {
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
            }}></i>
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"name"</span>:<input style={{marginLeft: '1.25em'}} value={props.currentData.name} onChange={e => {
                props.setCurrentData(oldData => {
                    return {...oldData,
                        name: e.target.value
                    }
                });
            }}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"price"</span>:<input style={{marginLeft: '1.25em'}} value={props.currentData.price ? props.currentData.price : ''} onChange={e => {
                if(!isPrice(e.target.value)) return;
                props.setCurrentData(oldData => {
                    return {...oldData,
                        price: e.target.value
                    }
                });
            }}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"decription"</span>:<input style={{marginLeft: '1.25em'}} value={props.currentData.description} onChange={e => {
                props.setCurrentData(oldData => {
                    return {...oldData,
                        description: e.target.value
                    }
                });
            }}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"minimumQuantity"</span>:<input style={{marginLeft: '1.25em'}} value={props.currentData.minQuantity ? props.currentData.minQuantity : ''} onChange={e => {
                const newMinQuantity = parseInt(e.target.value);

                if(e.target.value && Number.isNaN(newMinQuantity)) return;

                props.setCurrentData(oldData => {
                    return {...oldData,
                        minQuantity: Number.isNaN(newMinQuantity) ? null : newMinQuantity
                    }
                });
            }}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"maximumQuantity"</span>:<input style={{marginLeft: '1.25em'}} value={props.currentData.maxQuantity ? props.currentData.maxQuantity : ''} onChange={e => {
                const newMaxQuantity = parseInt(e.target.value);

                if(e.target.value && Number.isNaN(newMaxQuantity)) return;

                props.setCurrentData(oldData => {
                    return {...oldData,
                        maxQuantity: Number.isNaN(newMaxQuantity) ? null : newMaxQuantity
                    }
                });
            }}></input>,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"categories"</span>: <span className='Purple'>&#91;</span>
        </div>
        {props.currentData.categories.map((category, i) => {
            return <div key={i} className='Line' style={{marginLeft: '2.5em'}}>
                <input value={category} onChange={e => {
                    const newCategories = JSON.parse(JSON.stringify(props.currentData.categories));

                    newCategories[i] = e.target.value;

                    props.setCurrentData(oldData => {
                        return {...oldData,
                            categories: newCategories
                        }
                    });
                }}></input>
                <i className="fa-regular fa-trash-can DeleteButton" onClick={() => {
                    const newCategories = JSON.parse(JSON.stringify(props.currentData.categories));

                    newCategories.splice(i, 1);

                    props.setCurrentData(oldData => {
                        return {...oldData,
                            categories: newCategories
                        }
                    });
                }}></i>
            </div>
        })}
        <div className='Line' style={{marginLeft: '2.5em'}}>
            <i className="fa-regular fa-plus AddButton" onClick={() => {
                props.setCurrentData(oldData => {
                    return {...oldData,
                        categories: [...oldData.categories, '']
                    }
                });
            }}></i>
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Purple'>&#93;</span> ,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"imageUrls"</span>: <span className='Purple'>&#91;</span>
        </div>
        {props.currentData.imageUrls.map((url, i) => {
            return <div key={i} className='Line' style={{marginLeft: '2.5em'}}>
                <input value={url} onChange={e => {
                    const newImageUrls = JSON.parse(JSON.stringify(props.currentData.imageUrls));

                    newImageUrls[i] = e.target.value;

                    props.setCurrentData(oldData => {
                        return {...oldData,
                            imageUrls: newImageUrls
                        }
                    });
                }}></input>
                <i className="fa-regular fa-trash-can DeleteButton" onClick={() => {
                    const newImageUrls = JSON.parse(JSON.stringify(props.currentData.imageUrls));

                    newImageUrls.splice(i, 1);

                    props.setCurrentData(oldData => {
                        return {...oldData,
                            imageUrls: newImageUrls
                        }
                    });
                }}></i>
            </div>
        })}
        <div className='Line' style={{marginLeft: '2.5em'}}>
            <i className="fa-regular fa-plus AddButton" onClick={() => {
                props.setCurrentData(oldData => {
                    return {...oldData,
                        imageUrls: [...oldData.imageUrls, '']
                    }
                });
            }}></i>
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Purple'>&#93;</span> ,
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Green'>"sales"</span>: <span className='Purple'>&#91;</span>
        </div>
        {props.currentData.sales.map((sale, i) => {
            return <Fragment key={i}>
                <div className='Line' style={{marginLeft: '2.5em'}}>
                    <span className='Yellow'>&#123;</span>
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Green'>"type"</span>: <select style={{marginLeft: '1.25em'}} value={sale.type} onChange={e => {
                        const newSales = JSON.parse(JSON.stringify(props.currentData.sales));

                        newSales[i].type = e.target.value;

                        props.setCurrentData(oldData => {
                            return {...oldData,
                                sales: newSales
                            }
                        });
                    }}>
                        <option value="fixed">fixed</option>
                        <option value="percent">percent</option>
                    </select>,
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Green'>"reducedAmount"</span>: <input style={{marginLeft: '1.25em'}} value={sale.amount ? sale.amount : ''} onChange={e => {
                        if(!isPrice(e.target.value)) return;

                        const newSales = JSON.parse(JSON.stringify(props.currentData.sales));
                        newSales[i].amount = e.target.value;
                        
                        props.setCurrentData(oldData => {
                            return {...oldData,
                                sales: newSales
                            }
                        });
                    }}></input>,
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Green'>"expires"</span>: <span className='Yellow'>&#123;</span>
                </div>
                <div className='Line' style={{marginLeft: '5em'}}>
                    <span className='Green'>"day"</span>: <input style={{marginLeft: '1.25em'}} value={sale.expires.day ? sale.expires.day : ''} onChange={e => {
                        const newSales = JSON.parse(JSON.stringify(props.currentData.sales));
                        const newDay = parseInt(e.target.value);

                        if(e.target.value && Number.isNaN(newDay)) return;

                        newSales[i].expires.day = Number.isNaN(newDay) ? null : newDay;

                        props.setCurrentData(oldData => {
                            return {...oldData,
                                sales: newSales
                            }
                        });
                    }}></input>,
                </div>
                <div className='Line' style={{marginLeft: '5em'}}>
                    <span className='Green'>"month"</span>: <input style={{marginLeft: '1.25em'}} value={sale.expires.month ? sale.expires.month : ''} onChange={e => {
                        const newSales = JSON.parse(JSON.stringify(props.currentData.sales));
                        const newMonth = parseInt(e.target.value);

                        if(e.target.value && Number.isNaN(newMonth)) return;

                        newSales[i].expires.month = Number.isNaN(newMonth) ? null : newMonth;

                        props.setCurrentData(oldData => {
                            return {...oldData,
                                sales: newSales
                            }
                        });
                    }}></input>,
                </div>
                <div className='Line' style={{marginLeft: '5em'}}>
                    <span className='Green'>"year"</span>: <input style={{marginLeft: '1.25em'}} value={sale.expires.year ? sale.expires.year : ''} onChange={e => {
                        const newSales = JSON.parse(JSON.stringify(props.currentData.sales));
                        const newYear = parseInt(e.target.value);

                        if(e.target.value && Number.isNaN(newYear)) return;

                        newSales[i].expires.year = Number.isNaN(newYear) ? null : newYear;

                        props.setCurrentData(oldData => {
                            return {...oldData,
                                sales: newSales
                            }
                        });
                    }}></input>,
                </div>
                <div className='Line' style={{marginLeft: '3.75em'}}>
                    <span className='Yellow'>&#125;</span>,
                </div>
                <div className='Line' style={{marginLeft: '2.5em'}}>
                    <span className='Yellow'>&#125;</span>{i != props.currentData.sales.length-1 ? ',' : ''} <i className="fa-regular fa-trash-can DeleteButton" onClick={() => {
                        const newSales = JSON.parse(JSON.stringify(props.currentData.sales));

                        newSales.splice(i, 1);

                        props.setCurrentData(oldData => {
                            return {...oldData,
                                sales: newSales
                            }
                        });
                    }}></i>
                </div>
            </Fragment>
        })}
        <div className='Line' style={{marginLeft: '2.5em'}}>
        <i className="fa-regular fa-plus AddButton" onClick={() => {
                props.setCurrentData(oldData => {
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
            }}></i>
        </div>
        <div className='Line' style={{marginLeft: '1.25em'}}>
            <span className='Purple'>&#93;</span>
        </div>
        <div className='Line'>
            <span className='Yellow'>&#125;</span> <span className='Purple'>&#93;</span>
        </div>
    </div>
}

export default JsonInput;
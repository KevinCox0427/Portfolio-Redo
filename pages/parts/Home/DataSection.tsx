import React, { Fragment, FunctionComponent, useState } from "react";
import { cacheLocalStorage } from "../../Home";

const date = new Date();

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function isPrice(price:string) {
    if(price == '') return true;
    if(typeof price.split('.')[1] != 'undefined' && price.split('.')[1].length > 2) return false;
    return price.match(/^[\d.]+$/);
}

const DataSection:FunctionComponent = () => {
    const [currentData, setCurrentData] = useState<{
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
    }>({
        name: '',
        price: '',
        description: '',
        minQuantity: null,
        maxQuantity: null,
        categories:[],
        imageUrls: [],
        sales: []
    });
    cacheLocalStorage('DreamStateDataEntry', currentData, setCurrentData);

    const [galleryIndex, setGalleryIndex] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState<number | null>(1);

    const saleValue = currentData.sales.reduce((total, sale) => {
        if(!sale.amount) return total;
        if(!((sale.expires.year && sale.expires.year >= date.getFullYear()) && (sale.expires.month && sale.expires.month >= date.getMonth()+1) && (sale.expires.day && sale.expires.day > date.getDate()))) return total;
        return total + (sale.type == 'percent' ? parseFloat(currentData.price) * (parseFloat(sale.amount)/100) : parseFloat(sale.amount));
    }, 0);

    return <div id="data" className='Section'>
        <h3 className='Title'>
            It always starts with the data...
        </h3>
        <p className='Description'>
            Creating a functional and intuitive website entirely depends on modeling good quality data upfront. I can model simplistic yet highly effective data structures, not only to create fast websites now, but to provide a solid foundation for additions in the future.
            <span>Let's fill in one to create some new products together!</span>
        </p>
        <div className='Example'>
            <div className='DataEntry'>
                <div className='Line'>
                    <span className='Green'>"shopItems"</span>: <span className='Purple'>&#91;</span> <span className='Yellow'>&#123;</span><i className="fa-solid fa-arrow-rotate-left Reset" onClick={() => {
                        setCurrentData({
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
                    <span className='Green'>"name"</span>:<input style={{marginLeft: '1.25em'}} value={currentData.name} onChange={e => {
                        setCurrentData({...currentData,
                            name: e.target.value
                        });
                    }}></input>,
                </div>
                <div className='Line' style={{marginLeft: '1.25em'}}>
                    <span className='Green'>"price"</span>:<input style={{marginLeft: '1.25em'}} value={currentData.price ? currentData.price : ''} onChange={e => {
                        if(!isPrice(e.target.value)) return;
                        setCurrentData({...currentData,
                            price: e.target.value
                        });
                    }}></input>,
                </div>
                <div className='Line' style={{marginLeft: '1.25em'}}>
                    <span className='Green'>"decription"</span>:<input style={{marginLeft: '1.25em'}} value={currentData.description} onChange={e => {
                        setCurrentData({...currentData,
                            description: e.target.value
                        });
                    }}></input>,
                </div>
                <div className='Line' style={{marginLeft: '1.25em'}}>
                    <span className='Green'>"minimumQuantity"</span>:<input style={{marginLeft: '1.25em'}} value={currentData.minQuantity ? currentData.minQuantity : ''} onChange={e => {
                        const newMinQuantity = parseInt(e.target.value);
                        if(e.target.value && Number.isNaN(newMinQuantity)) return;
                        setCurrentData({...currentData,
                            minQuantity: Number.isNaN(newMinQuantity) ? null : newMinQuantity
                        });
                    }}></input>,
                </div>
                <div className='Line' style={{marginLeft: '1.25em'}}>
                    <span className='Green'>"maximumQuantity"</span>:<input style={{marginLeft: '1.25em'}} value={currentData.maxQuantity ? currentData.maxQuantity : ''} onChange={e => {
                        const newMaxQuantity = parseInt(e.target.value);
                        if(e.target.value && Number.isNaN(newMaxQuantity)) return;
                        setCurrentData({...currentData,
                            maxQuantity: Number.isNaN(newMaxQuantity) ? null : newMaxQuantity
                        });
                    }}></input>,
                </div>
                <div className='Line' style={{marginLeft: '1.25em'}}>
                    <span className='Green'>"categories"</span>: <span className='Purple'>&#91;</span>
                </div>
                {currentData.categories.map((category, i) => {
                    return <div key={i} className='Line' style={{marginLeft: '2.5em'}}>
                        <input value={category} onChange={e => {
                            const newCategories = JSON.parse(JSON.stringify(currentData.categories));
                            newCategories[i] = e.target.value;
                            setCurrentData({...currentData,
                                categories: newCategories
                            });
                        }}></input>
                        <i className="fa-regular fa-trash-can DeleteButton" onClick={() => {
                            const newCategories = JSON.parse(JSON.stringify(currentData.categories));
                            newCategories.splice(i, 1);
                            setCurrentData({...currentData,
                                categories: newCategories
                            });
                        }}></i>
                    </div>
                })}
                <div className='Line' style={{marginLeft: '2.5em'}}>
                    <i className="fa-regular fa-plus AddButton" onClick={() => {
                        const newCategories = JSON.parse(JSON.stringify(currentData.categories));
                        newCategories.push('');
                        setCurrentData({...currentData,
                            categories: newCategories
                        });
                    }}></i>
                </div>
                <div className='Line' style={{marginLeft: '1.25em'}}>
                    <span className='Purple'>&#93;</span> ,
                </div>
                <div className='Line' style={{marginLeft: '1.25em'}}>
                    <span className='Green'>"imageUrls"</span>: <span className='Purple'>&#91;</span>
                </div>
                {currentData.imageUrls.map((url, i) => {
                    return <div key={i} className='Line' style={{marginLeft: '2.5em'}}>
                        <input value={url} onChange={e => {
                            const newImageUrls = JSON.parse(JSON.stringify(currentData.imageUrls));
                            newImageUrls[i] = e.target.value;
                            setCurrentData({...currentData,
                                imageUrls: newImageUrls
                            });
                        }}></input>
                        <i className="fa-regular fa-trash-can DeleteButton" onClick={() => {
                            const newImageUrls = JSON.parse(JSON.stringify(currentData.imageUrls));
                            newImageUrls.splice(i, 1);
                            setCurrentData({...currentData,
                                imageUrls: newImageUrls
                            });
                        }}></i>
                    </div>
                })}
                <div className='Line' style={{marginLeft: '2.5em'}}>
                    <i className="fa-regular fa-plus AddButton" onClick={() => {
                        const newImages = JSON.parse(JSON.stringify(currentData.imageUrls));
                        newImages.push('');
                        setCurrentData({...currentData,
                            imageUrls: newImages
                        });
                    }}></i>
                </div>
                <div className='Line' style={{marginLeft: '1.25em'}}>
                    <span className='Purple'>&#93;</span> ,
                </div>
                <div className='Line' style={{marginLeft: '1.25em'}}>
                    <span className='Green'>"sales"</span>: <span className='Purple'>&#91;</span>
                </div>
                {currentData.sales.map((sale, i) => {
                    return <Fragment key={i}>
                        <div className='Line' style={{marginLeft: '2.5em'}}>
                            <span className='Yellow'>&#123;</span>
                        </div>
                        <div className='Line' style={{marginLeft: '3.75em'}}>
                            <span className='Green'>"type"</span>: <select style={{marginLeft: '1.25em'}} value={sale.type} onChange={e => {
                                const newSales = JSON.parse(JSON.stringify(currentData.sales));
                                newSales[i].type = e.target.value
                                setCurrentData({...currentData,
                                    sales: newSales
                                });
                            }}>
                                <option value="fixed">fixed</option>
                                <option value="percent">percent</option>
                            </select>,
                        </div>
                        <div className='Line' style={{marginLeft: '3.75em'}}>
                            <span className='Green'>"reducedAmount"</span>: <input style={{marginLeft: '1.25em'}} value={sale.amount ? sale.amount : ''} onChange={e => {
                                if(!isPrice(e.target.value)) return;
                                const newSales = JSON.parse(JSON.stringify(currentData.sales));
                                newSales[i].amount = e.target.value
                                setCurrentData({...currentData,
                                    sales: newSales
                                });
                            }}></input>,
                        </div>
                        <div className='Line' style={{marginLeft: '3.75em'}}>
                            <span className='Green'>"expires"</span>: <span className='Yellow'>&#123;</span>
                        </div>
                        <div className='Line' style={{marginLeft: '5em'}}>
                            <span className='Green'>"day"</span>: <input style={{marginLeft: '1.25em'}} value={sale.expires.day ? sale.expires.day : ''} onChange={e => {
                                const newSales = JSON.parse(JSON.stringify(currentData.sales));
                                const newDay = parseInt(e.target.value);
                                if(e.target.value && Number.isNaN(newDay)) return;
                                newSales[i].expires.day = Number.isNaN(newDay) ? null : newDay,
                                setCurrentData({...currentData,
                                    sales: newSales
                                });
                            }}></input>,
                        </div>
                        <div className='Line' style={{marginLeft: '5em'}}>
                            <span className='Green'>"month"</span>: <input style={{marginLeft: '1.25em'}} value={sale.expires.month ? sale.expires.month : ''} onChange={e => {
                                const newSales = JSON.parse(JSON.stringify(currentData.sales));
                                const newMonth = parseInt(e.target.value);
                                if(e.target.value && Number.isNaN(newMonth)) return;
                                newSales[i].expires.month = Number.isNaN(newMonth) ? null : newMonth,
                                setCurrentData({...currentData,
                                    sales: newSales
                                });
                            }}></input>,
                        </div>
                        <div className='Line' style={{marginLeft: '5em'}}>
                            <span className='Green'>"year"</span>: <input style={{marginLeft: '1.25em'}} value={sale.expires.year ? sale.expires.year : ''} onChange={e => {
                                const newSales = JSON.parse(JSON.stringify(currentData.sales));
                                const newYear = parseInt(e.target.value);
                                if(e.target.value && Number.isNaN(newYear)) return;
                                newSales[i].expires.year = Number.isNaN(newYear) ? null : newYear,
                                setCurrentData({...currentData,
                                    sales: newSales
                                });
                            }}></input>,
                        </div>
                        <div className='Line' style={{marginLeft: '3.75em'}}>
                            <span className='Yellow'>&#125;</span>,
                        </div>
                        <div className='Line' style={{marginLeft: '2.5em'}}>
                            <span className='Yellow'>&#125;</span>{i != currentData.sales.length-1 ? ',' : ''} <i className="fa-regular fa-trash-can DeleteButton" onClick={() => {
                                const newSales = JSON.parse(JSON.stringify(currentData.sales));
                                newSales.splice(i, 1);
                                setCurrentData({...currentData,
                                    sales: newSales
                                });
                            }}></i>
                        </div>
                    </Fragment>
                })}
                <div className='Line' style={{marginLeft: '2.5em'}}>
                <i className="fa-regular fa-plus AddButton" onClick={() => {
                        const newSales = JSON.parse(JSON.stringify(currentData.sales));
                        newSales.push({
                            type: 'flat',
                            amount: '',
                            expires: {
                                day: date.getDate() + 1,
                                month: date.getMonth() + 1,
                                year: date.getFullYear()
                            }
                        });
                        setCurrentData({...currentData,
                            sales: newSales
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
            <div className='DataResult'>
                <div className="Gallery">
                    <div className="GallerySlider" style={{
                        transform: `translateX(-${galleryIndex*(100/currentData.imageUrls.length)}%)`,
                        width: `${currentData.imageUrls.length}00%`
                    }}>{
                        currentData.imageUrls.map((url, i) => {
                            return <div key={i} className="ImageWrapper" style={{
                                width: `${100/currentData.imageUrls.length}%`
                            }}><img src={url}></img></div>
                        })
                    }</div>
                    {currentData.categories.length > 0 ? <div className="CategoryWrapper">
                        {currentData.categories.map((category, i) => {
                            return category ? <p key={i} className="Category">{category}</p> : <Fragment key={i}></Fragment>
                        })}
                    </div> : <></>}
                </div>
                {currentData.imageUrls.length > 1 ? <div className="Pagination">
                    {currentData.imageUrls.map((url, i) => {
                        return url ? <div key={i} style={{
                            backgroundColor: i == galleryIndex ? 'var(--blue)' : ''
                        }} onClick={() => {
                            setGalleryIndex(i);
                        }}></div> : <Fragment key={i}></Fragment>
                    })}
                </div> : <></>}
                <h3>{currentData.name}</h3>
                <div className="SubContent">
                    {currentData.price ? <div className="PriceWrapper">
                        <p className="Price">
                            {formatter.format(parseFloat(currentData.price) * (selectedQuantity ? selectedQuantity : 1))}
                            {saleValue != parseFloat(currentData.price) ? <span></span> : <></>}

                        </p>
                        {saleValue != parseFloat(currentData.price) ? <p className="Price" style={{
                            color:'var(--red)'
                        }}>
                            {formatter.format((parseFloat(currentData.price) - saleValue) * (selectedQuantity ? selectedQuantity : 1))}
                        </p> : <></>}
                        {currentData.maxQuantity && currentData.minQuantity && currentData.maxQuantity - currentData.minQuantity > 0 ? <div className="QuantityButtons">
                            <button onClick={() => {
                                if(!selectedQuantity) {
                                    setSelectedQuantity(1);
                                    return;
                                }
                                if(selectedQuantity+1 > currentData.maxQuantity!) return;
                                setSelectedQuantity(selectedQuantity+1);
                            }}>+</button>
                            <input value={selectedQuantity ? selectedQuantity : ''} onChange={e => {
                                if(e.target.value == '') {
                                    setSelectedQuantity(null);
                                    return;
                                }
                                const value = parseInt(e.target.value);
                                if(Number.isNaN(value)) return;
                                if(value < currentData.minQuantity! || value > currentData.maxQuantity!) return;
                                setSelectedQuantity(value);
                            }}></input>
                            <button onClick={() => {
                                if(!selectedQuantity) {
                                    setSelectedQuantity(1);
                                    return;
                                }
                                if(selectedQuantity-1 < currentData.minQuantity!) return;
                                setSelectedQuantity(selectedQuantity-1);
                            }}>-</button>
                        </div> : <></>}
                    </div> : <></>}
                    {currentData.price && currentData.description ? <div className="Divider"></div> : <></>}
                    {currentData.description ? <p className="Description">{currentData.description}</p> : <></>}
                </div>
            </div>
        </div>
    </div>
}

export default DataSection;
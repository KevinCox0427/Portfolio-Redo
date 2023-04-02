import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";

const date = new Date();

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

    const hasLoaded = useRef(false);

    useEffect(() => {
        if(hasLoaded.current) localStorage.setItem('DreamStateDataEntry', JSON.stringify(currentData));
    }, [currentData]);

    if(typeof window != 'undefined'){
        window.addEventListener('load', () => {
            const previousSave = localStorage.getItem('DreamStateDataEntry');
            if(previousSave && typeof JSON.parse(previousSave) != 'undefined') {
                setCurrentData(JSON.parse(previousSave));
            }
            hasLoaded.current = true;
        });
    }

    const [galleryIndex, setGalleryIndex] = useState(0)

    return <div id="data" className='Section'>
        <h3 className='Title'>It always starts with the data...</h3>
        <p className='Description'>Creating a functional and intuitive website entirely depends on modeling good quality data upfront. I can model simplistic yet highly effective data structures, not only to create fast websites now, but to provide a solid foundation for additions in the future. Let's create one together:</p>
        <div className='Example'>
            <div className='DataEntry'>
                <div className='Line'>
                    <span className='Green'>"shopItems"</span>: <span className='Purple'>&#91;</span> <span className='Yellow'>&#123;</span>
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
                                day: date.getDay() + 1,
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
                    <span className='Purple'>&#93;</span> ,
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
                </div>
                {currentData.imageUrls.length > 0 ? <div className="Pagination">
                    {currentData.imageUrls.map((url, i) => {
                        return <div key={i} style={{
                            backgroundColor: i == galleryIndex ? 'var(--blue)' : ''
                        }} onClick={() => {
                            setGalleryIndex(i);
                        }}></div>
                    })}
                </div> : <></>}
                {currentData.categories.length > 0 ? <div className="CategoryWrapper">
                    {currentData.categories.map((category, i) => {
                        return <p key={i} className="Category">{category}</p>
                    })}
                </div> : <></>}
                <h3>{currentData.name}</h3>
                <p className="Price">{currentData.price ? '$' : ''}{currentData.price}</p>
                <p className="Description">{currentData.description}</p>

            </div>
        </div>
    </div>
}

export default DataSection;
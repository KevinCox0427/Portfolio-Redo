import React, { Fragment, FunctionComponent, useState } from "react";
import { CurrentData } from "./DataSection";

const date = new Date();

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

type Props = {
    currentData: CurrentData
}

const Result: FunctionComponent<Props> = (props) => {
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState<number | null>(1);

    const saleValue = props.currentData.sales.reduce((total, sale) => {
        if(!sale.amount) return total;

        if(!((sale.expires.year && sale.expires.year >= date.getFullYear()) && (sale.expires.month && sale.expires.month >= date.getMonth()+1) && (sale.expires.day && sale.expires.day > date.getDate()))) return total;
        
        return total + (sale.type == 'percent' ? parseFloat(props.currentData.price) * (parseFloat(sale.amount)/100) : parseFloat(sale.amount));
    }, 0);
    
    return <div className='DataResult'>
        <div className="Gallery">
            <div className="GallerySlider" style={{
                transform: `translateX(-${galleryIndex*(100/props.currentData.imageUrls.length)}%)`,
                width: `${props.currentData.imageUrls.length}00%`
            }}>{
                props.currentData.imageUrls.map((url, i) => {
                    return <div key={i} className="ImageWrapper" style={{
                        width: `${100/props.currentData.imageUrls.length}%`
                    }}><img src={url} alt={`Fake product gallery image #${i+1}`}></img></div>
                })
            }</div>
            {props.currentData.categories.length > 0 ? <div className="CategoryWrapper">
                {props.currentData.categories.map((category, i) => {
                    return category ? <p key={i} className="Category">{category}</p> : <Fragment key={i}></Fragment>
                })}
            </div> : <></>}
        </div>
        {props.currentData.imageUrls.length > 1 ? <div className="Pagination">
            {props.currentData.imageUrls.map((url, i) => {
                return url ? <div key={i} style={{
                    backgroundColor: i == galleryIndex ? 'var(--blue)' : ''
                }} onClick={() => {
                    setGalleryIndex(i);
                }}></div> : <Fragment key={i}></Fragment>
            })}
        </div> : <></>}
        <h3>{props.currentData.name}</h3>
        <div className="SubContent">
            {props.currentData.price ? <div className="PriceWrapper">
                <p className="Price">
                    {formatter.format(parseFloat(props.currentData.price) * (selectedQuantity ? selectedQuantity : 1))}
                    {saleValue != 0 ? <span></span> : <></>}
                </p>
                {saleValue != 0 ? <p className="Price" style={{
                    color:'var(--red)'
                }}>
                    {formatter.format((parseFloat(props.currentData.price) - saleValue) * (selectedQuantity ? selectedQuantity : 1))}
                </p> : <></>}
                {props.currentData.maxQuantity && props.currentData.minQuantity && props.currentData.maxQuantity - props.currentData.minQuantity > 0 ? <div className="QuantityButtons">
                    <button onClick={() => {
                        if(!selectedQuantity) {
                            setSelectedQuantity(1);
                            return;
                        }
                        if(selectedQuantity+1 > props.currentData.maxQuantity!) return;
                        setSelectedQuantity(selectedQuantity+1);
                    }}>+</button>
                    <input value={selectedQuantity ? selectedQuantity : ''} onChange={e => {
                        if(e.target.value == '') {
                            setSelectedQuantity(null);
                            return;
                        }
                        const value = parseInt(e.target.value);
                        if(Number.isNaN(value)) return;
                        if(value < props.currentData.minQuantity! || value > props.currentData.maxQuantity!) return;
                        setSelectedQuantity(value);
                    }}></input>
                    <button onClick={() => {
                        if(!selectedQuantity) {
                            setSelectedQuantity(1);
                            return;
                        }
                        if(selectedQuantity - 1 < props.currentData.minQuantity!) return;
                        setSelectedQuantity(selectedQuantity - 1);
                    }}>-</button>
                </div> : <></>}
            </div> : <></>}
            {props.currentData.price && props.currentData.description ? <div className="Divider"></div> : <></>}
            {props.currentData.description ? <p className="Description">{props.currentData.description}</p> : <></>}
        </div>
    </div>
}

export default Result;
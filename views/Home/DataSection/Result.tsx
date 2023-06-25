import React, { Fragment, FunctionComponent, useState } from "react";
import { CurrentData } from "./DataSection";

// For date comparisons.
const date = new Date();

// For correct price format.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

type Props = {
    currentData: CurrentData
}

/**
 * A component to render the fake product based on the inputted data from JsonInput.tsx
 * @param currentData The state variable containing all the inputted data.
 */
const Result: FunctionComponent<Props> = (props) => {
    // State variables to keep track of which image the gallery is on and the quantity of fake products.
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState<number | null>(1);

    /**
     * Event handler to set the quantity based on a given input.
     * Options only appear if a min and max quantity are set.
     */
    function setQuantity(e:React.ChangeEvent<HTMLInputElement>) {
        if(e.target.value == '') {
            setSelectedQuantity(null);
            return;
        }

        // Parsing the value and making sure it's in the bounds of the min and max quantity.
        const value = parseInt(e.target.value);
        if(Number.isNaN(value)) return;
        if(value < props.currentData.minQuantity! || value > props.currentData.maxQuantity!) return;

        setSelectedQuantity(value);
    }

    /**
     * Event handler to add one to the quantity.
     * Options only appear if a min and max quantity are set.
     */
    function addQuantity() {
        if(!selectedQuantity) {
            setSelectedQuantity(1);
            return;
        }

        if(selectedQuantity + 1 > props.currentData.maxQuantity!) return;
        setSelectedQuantity(selectedQuantity + 1);
    }

    /**
     * Event handler to subtract one to the quantity.
     * Options only appear if a min and max quantity are set.
     */
    function removeQuantity() {
        if(!selectedQuantity) {
            setSelectedQuantity(1);
            return;
        }

        if(selectedQuantity - 1 < props.currentData.minQuantity!) return;
        setSelectedQuantity(selectedQuantity - 1);
    }
    
    // Calculating a price with quantity adjustments.
    const currentPrice = parseFloat(props.currentData.price) * (selectedQuantity ? selectedQuantity : 1);

    // Calculating how much a user gets in sales based on inputted sales.
    const saleAmount = props.currentData.sales.reduce((total, sale) => {
        if(!sale.amount) return total;

        // Making sure the sale isn't expired.
        if( ! (
            (sale.expires.year && sale.expires.year >= date.getFullYear()) &&
            (sale.expires.month && sale.expires.month >= date.getMonth()+1) &&
            (sale.expires.day && sale.expires.day > date.getDate())
        )) return total;
        
        // Calculating and adding sale to total based on whether it was a percentage or a flat rate.
        return total + (sale.type == 'percent' ? currentPrice * (parseFloat(sale.amount)/100) : parseFloat(sale.amount) * (selectedQuantity ? selectedQuantity : 1));
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
                    }}>
                        <img src={url} loading="lazy"></img>
                    </div>
                })
            }</div>
            {props.currentData.categories.length > 0 
                ? <div className="CategoryWrapper">
                        {props.currentData.categories.map((category, i) => {
                            return category
                            ?  <p key={i} className="Category">{category}</p> 
                            : <Fragment key={i}></Fragment>
                        })}
                    </div> 
                : <></>
            }
        </div>
        {props.currentData.imageUrls.length > 1
            ? <div className="Pagination">
                    {props.currentData.imageUrls.map((url, i) => {
                        return url 
                            ? <div key={i} style={{
                                    backgroundColor: i === galleryIndex ? 'var(--blue)' : ''
                                }} onClick={() => {setGalleryIndex(i)}}></div> 
                            : <Fragment key={i}></Fragment>
                    })}
                </div>
            : <></>
        }
        <h3>{props.currentData.name}</h3>
        <div className="SubContent">
            {props.currentData.price 
                ? <div className="PriceWrapper">
                    <p className="Price">
                        {formatter.format(currentPrice)}
                        {saleAmount !== 0
                            ? <span></span> 
                            : <></>
                        }
                    </p>
                    {saleAmount !== 0
                        ? <p className="Price" style={{
                            color:'var(--red)'
                        }}>
                            {formatter.format(currentPrice - saleAmount)}
                        </p>
                        : <></>
                    }
                    {props.currentData.maxQuantity && props.currentData.minQuantity && props.currentData.maxQuantity - props.currentData.minQuantity > 0
                        ? <div className="QuantityButtons">
                                <button onClick={addQuantity}>+</button>
                                <input value={selectedQuantity ? selectedQuantity : ''} onChange={setQuantity}></input>
                                <button onClick={removeQuantity}>-</button>
                        </div> 
                        : <></>
                    }
                </div> 
                : <></>
            }
            {props.currentData.price && props.currentData.description
                ? <div className="Divider"></div> 
                : <></>
            }
            {props.currentData.description
                ? <p className="Description">{props.currentData.description}</p>
                : <></>
            }
        </div>
    </div>
}

export default Result;
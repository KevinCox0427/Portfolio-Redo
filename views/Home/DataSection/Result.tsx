import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "../../store/store";

// For date comparisons.
const date = new Date();

// For correct price format.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

/**
 * A component to render the fake product based on the inputted data from JsonInput.tsx
 * @param currentData The state variable containing all the inputted data.
 */
const Result: FunctionComponent = () => {
    const productData = useSelector(state => state.fakeProductData);

    // State variables to keep track of which image the gallery is on and the quantity of fake products.
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState<number | null>(productData.minQuantity ? productData.minQuantity : 1);

    // callback function to make sure that the quantity is bound to the min and max.
    useEffect(() => adjustQuantity(), [productData.minQuantity, productData.maxQuantity]);

    /**
     * A function to bound the inputted quantity to the min and max
     */
    function adjustQuantity() {
        if(productData.minQuantity && (!selectedQuantity || selectedQuantity < productData.minQuantity)) {
            setSelectedQuantity(productData.minQuantity);
        }
        if(productData.maxQuantity && selectedQuantity && selectedQuantity > productData.maxQuantity) {
            setSelectedQuantity(productData.maxQuantity);
        }
    }

    /**
     * Event handler to set the quantity based on a given input.
     * Options only appear if a min and max quantity are set.
     */
    function setQuantity(e:React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value);
        setSelectedQuantity(Number.isNaN(value) ? null : value);
    }

    /**
     * Event handler to add one to the quantity.
     * Options only appear if a min and max quantity are set.
     */
    function addQuantity() {
        if(!selectedQuantity) {
            setSelectedQuantity(productData.minQuantity ? productData.minQuantity : 1);
            return;
        }
        if(productData.maxQuantity && selectedQuantity + 1 > productData.maxQuantity) return;
        setSelectedQuantity(selectedQuantity + 1);
    }

    /**
     * Event handler to subtract one to the quantity.
     * Options only appear if a min and max quantity are set.
     */
    function removeQuantity() {
        if(!selectedQuantity) {
            setSelectedQuantity(productData.minQuantity ? productData.minQuantity : 1);
            return;
        }

        if(productData.minQuantity && selectedQuantity - 1 < productData.minQuantity) return;
        setSelectedQuantity(selectedQuantity > 1 ? selectedQuantity - 1 : 1);
    }
    
    // Calculating a price with quantity adjustments.
    const currentPrice = parseFloat(productData.price) * (selectedQuantity ? selectedQuantity : 1);

    // Calculating how much a user gets in sales based on inputted sales.
    const saleAmount = productData.sales.reduce((total, sale) => {
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
                transform: `translateX(-${galleryIndex*(100/productData.imageUrls.length)}%)`,
                width: `${productData.imageUrls.length}00%`
            }}>{
                productData.imageUrls.map((url, i) => {
                    return <div key={i} className="ImageWrapper" style={{
                        width: `${100/productData.imageUrls.length}%`
                    }}>
                        <img src={url} loading="lazy"></img>
                    </div>
                })
            }</div>
            {productData.categories.length > 0 
                ? <div className="CategoryWrapper">
                        {productData.categories.map((category, i) => {
                            return category
                            ?  <p key={i} className="Category">{category}</p> 
                            : <Fragment key={i}></Fragment>
                        })}
                    </div> 
                : <></>
            }
        </div>
        {productData.imageUrls.length > 1
            ? <div className="Pagination">
                    {productData.imageUrls.map((url, i) => {
                        return url 
                            ? <div
                                key={i} 
                                style={{
                                    backgroundColor: i === galleryIndex ? 'var(--blue)' : ''
                                }}
                                onClick={() => {setGalleryIndex(i)}}
                            ></div> 
                            : <Fragment key={i}></Fragment>
                    })}
                </div>
            : <></>
        }
        <h3>{productData.name}</h3>
        <div className="SubContent">
            {productData.price 
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
                    {(!productData.maxQuantity || !productData.minQuantity) || productData.maxQuantity - productData.minQuantity > 0
                        ? <div className="QuantityButtons">
                            <button onClick={addQuantity}>+</button>
                            <input
                                value={selectedQuantity ? selectedQuantity : ''}
                                onChange={setQuantity}
                                onBlur={adjustQuantity}
                            ></input>
                            <button onClick={removeQuantity}>-</button>
                        </div> 
                        : <></>
                    }
                </div> 
                : <></>
            }
            {productData.price && productData.description
                ? <div className="Divider"></div> 
                : <></>
            }
            {productData.description
                ? <p className="Description">{productData.description}</p>
                : <></>
            }
        </div>
    </div>
}

export default Result;
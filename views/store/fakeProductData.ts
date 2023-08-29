import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialStore from "./cachedstore";

const fakeProductDataSlice = createSlice({
    name: 'fakeProductData',
    initialState: initialStore ? initialStore.fakeProductData : {
        name: '',
        price: '',
        description: '',
        minQuantity: null,
        maxQuantity: null,
        categories:[],
        imageUrls: [],
        sales: []
    } as Store["fakeProductData"],
    reducers: {
        resetProduct: (state) => {
            return {
                name: '',
                price: '',
                description: '',
                minQuantity: null,
                maxQuantity: null,
                categories:[],
                imageUrls: [],
                sales: []
            }
        },

        /**
         * A function to overwrite string values on top level keys.
         * @param key The top-level key who's value is being overwritten.
         * @param value The new value to overwrite with.
         */
        setStringData: (state, action: PayloadAction<{ key: 'name' | 'description', value: string }>) => {
            state[action.payload.key] = action.payload.value;
        },

        /**
         * A function to overwrite price string values on top level keys.
         * Uses a regex test to ensure valid format.
         * @param value The new value to overwrite with.
         */
        setPriceData: (state, action: PayloadAction<string>) => {
            if(action.payload && !action.payload.match(/^[\d]+.?([\d]{1,2})?$/)) return;
            state.price = action.payload;
        },

        /**
         * A function to overwrite integer values on top level keys.
         * @param key The top-level key who's value is being overwritten.
         * @param value The new value to overwrite with.
         */
        setQuantity: (state, action: PayloadAction<{ key: 'minQuantity' | 'maxQuantity', value:string }>) => {
            const newMinQuantity = parseInt(action.payload.value);
            if(action.payload.value && Number.isNaN(newMinQuantity)) return;
            state[action.payload.key] = Number.isNaN(newMinQuantity) ? null : newMinQuantity;
        },

        /**
         * A function to push an empty string into a string array.
         * @param key The top-level key who's array is being pushed to.
         */
        addToStringArrayData: (state, action:PayloadAction<'categories' | 'imageUrls'>) => {
            state[action.payload].push('');
        },

        /**
         * A function to overwrite a string value for a given index in a string array.
         * @param key The top-level key who's array is being editted.
         * @param value The new value to overwrite with.
         * @param index The index of the value been overwritten.
         */
        editStringArrayData: (state, action:PayloadAction<{
            key: 'categories' | 'imageUrls'
            index: number,
            value: string
        }>) => {
            state[action.payload.key][action.payload.index] = action.payload.value;
        },

        /**
         * A function to remove an index on a string array for a top-level key.
         * @param key The top-level key who's array is being editted.
         * @param index The index of the value been removed.
         */
        deleteFromArrayData: (state, action: PayloadAction<{ key: 'categories' | 'imageUrls', index: number }>) => {
            state[action.payload.key].splice(action.payload.index);
        },

        /**
        * A function to overwrite a value for a sale at a given index.
        * @param value The new value to overwrite with.
        * @param index The index of the sale that's being editted.
        */
        changeSaleAmount: (state, action: PayloadAction<{ value: string, index: number }>) => {
            if(action.payload.index > state.sales.length - 1) return;
            state.sales[action.payload.index].amount = action.payload.value;
        },

        /**
        * A function to overwrite a value for a sale at a given index.
        * @param value The new value to overwrite with.
        * @param index The index of the sale that's being editted.
        */
        changeSaleType: (state, action: PayloadAction<{ value: "flat" | "percent", index: number }>) => {
            if(action.payload.index > state.sales.length - 1) return;
            state.sales[action.payload.index].type = action.payload.value;
        },

        /**
        * A function to overwrite a value for a expiration date on a sale at a given index.
        * @param key The key who's value is being overwritten.
        * @param value The new value to overwrite with.
        * @param index The index of the sale that's being editted.
        */
        editSaleExpiration: (state, action: PayloadAction<{ key:'day' | 'month' | 'year', value: string, index: number }>) => {
            if(action.payload.index > state.sales.length - 1) return;

            const parsedValue = parseInt(action.payload.value);
            if(action.payload.value && Number.isNaN(parsedValue)) return;

            state.sales[action.payload.index].expires[action.payload.key] = parsedValue;
        },

        /**
        * A function to add a new sale.
        */
        addSale: (state) => {
            const date = new Date();
            state.sales.push({
                type: 'flat',
                amount: '',
                expires: {
                    day: date.getDate() + 1,
                    month: date.getMonth() + 1,
                    year: date.getFullYear()
                }
            });
        },

        /**
         * A function to remove a sale at a given index.
         * @param index The index to remove.
         */
        deleteSale: (state, action: PayloadAction<number>) => {
            if(action.payload < 0 || action.payload >= state.sales.length) return;
            state.sales.splice(action.payload, 1);
        },
    }
});

export default fakeProductDataSlice.reducer;
export const { resetProduct, setStringData, setPriceData, setQuantity, addToStringArrayData, editStringArrayData, deleteFromArrayData, changeSaleAmount, changeSaleType, editSaleExpiration, addSale, deleteSale } = fakeProductDataSlice.actions;
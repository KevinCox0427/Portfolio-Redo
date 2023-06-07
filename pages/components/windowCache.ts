import { useEffect } from "react";

/**
 * A helper function to determine deep equality for objects and arrays.
 * 
 * @param a First object for comparison.
 * @param b Second oobject for comparison.
 * @returns A boolean reqpresnting whether the parameters have deep equality or not.
 */
function deepEquals(a:any, b:any): boolean {
    /**
     * If a and b are primitive values, then return their equality.
     */
    if((typeof a !== 'object' || !a) && (typeof b !== 'object' || !b)) return a === b;
    /**
     * Otherwise if the length of their keys aren't equal, then they don't have equality.
     */
    if(Object.keys(a).length !== Object.keys(b).length) return false;
    /**
     * Looping through each key and returning its equality recursivly.
     */
    return Object.keys(a).every(aKey => {
        if(typeof b[aKey] === 'undefined') return false;
        else return deepEquals(a[aKey], b[aKey]);
    });
}

/**
 * A Utility class to save and load state variables into local storage such that they persist across many user sessions.
 */
class WindowCache {
    /**
     * The default values for each state variable. This will be saved to local storage if nothing was found.
     */
    defaultValues: {
        [itemName:string]: any
    } = {};
    /**
     * The state variables that will be registered into cache.
     */
    cachedValues: {
        [itemName:string]: {
            value: any, 
            setState: React.Dispatch<React.SetStateAction<any>> | null
        }
    } = {};
    /**
     * A boolean representing whether the Window object has loaded on the client side.
     */
    hasWindowLoaded:boolean = false;
    /**
     * An object to keep track whether each state variable has been checked in the local storage.
     */
    isLoaded: {
        [itemName:string]: boolean
    } = {};
    /**
     * A state variable loaded by the constructor representing whether all state variagbles have been checked in local storage.
     */
    setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>;

    /**
     * A Utility class to save and load state variables into local storage such that they persist across many user sessions.
     * @param setHasLoaded A state varialbe that will flip to true when it's set all the values from the local storage.
     */
    constructor(setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>) {
        this.setHasLoaded = setHasLoaded;

        /**
         * Creating an event when the window loads.
         * This will go through local storage for saved values and set state for anything that's found.
         */
        useEffect(() => {
            this.loadCacheValues(setHasLoaded);
        }, []);
    }

    /**
     * A function to cache state variables, and load any values found in local storage.
     * When a state is changed, it will also save it's updated value in local storage.
     * 
     * @param itemName The key to store the values in local storage.
     * @param stateVariable The state variable. Should be a deafult value.
     * @param setStateVariable The set state function to overwrite the default value with anything found in local storage. 
     */
    registerCache(itemName:string, stateVariable:any, setStateVariable:React.Dispatch<React.SetStateAction<any>>) {
        /**
         * If this value wasn't registered yet, then save it under this class.
         */
        if(typeof this.cachedValues[itemName] === 'undefined'){
            this.defaultValues = {...this.defaultValues,
                [itemName]: stateVariable
            };
            this.cachedValues = {...this.cachedValues,
                [itemName]: {
                    value: stateVariable,
                    setState: setStateVariable
                }
            };
            this.isLoaded = {...this.isLoaded,
                [itemName]: false
            };
        }

        /**
         * Setting a useEffect hook to save it's updated value into local storage.
         */
        useEffect(() => {
            /**
             * If we haven't checked for values in local storage, then just ignore.
             */
            if(!this.hasLoaded()) {
                /**
                 * If the cached value isn't the same as the state variable, that means the cached value is still the default, and we must update the cached value.
                 */
                if(!deepEquals(this.cachedValues[itemName].value, stateVariable)) {
                    this.cachedValues[itemName].value = stateVariable;
                }
                /**
                 * Otherwise if they are equal, that means we have loaded it from local storage, and we can change the boolean representing whether it's loaded or not to true.
                 */
                if(this.hasWindowLoaded) {
                    this.updateLoad(itemName);
                }
            }
            /**
             * Otherwise, just save to local storage.
             */
            else this.saveCacheValue(itemName, stateVariable);
        }, [stateVariable]);
    }

    /**
     * A function that will go through every key in the registed cache values and set its state to whatever was found in local storage.
     * 
     * @param setHasLoaded A set state function for a boolean to flip to true when it's done.
     */
    loadCacheValues(setHasLoaded:React.Dispatch<React.SetStateAction<boolean>>) {
        this.hasWindowLoaded = true;
        const previousValuesStringified = localStorage.getItem('DreamStateCachedValues');

        /**
         * If an object wasn't was found in local storage, then it's a new user and we'll just save the defaulted values and return.
         */
        if(!previousValuesStringified || typeof JSON.parse(previousValuesStringified) !== 'object') {
            localStorage.setItem('DreamStateCachedValues', JSON.stringify(this.defaultValues));
            setHasLoaded(true);
            return;
        }
        
        /**
         * Otherwise we'll parse the local storage and iterate through its keys.
         */
        const previousValues = JSON.parse(previousValuesStringified);

        /**
         * First we'll loop through what was cached by the current page.
         */
        Object.keys(this.cachedValues).map(itemName => {
            /**
             * If a previous value was found and it isn't what was loaded by default, then cache the new value found to this calss, and set state for the state variable being used in the page.
             */
            if(typeof previousValues![itemName] !== 'undefined' && !deepEquals(previousValues![itemName], this.cachedValues[itemName].value)) {
                this.cachedValues[itemName].value = previousValues![itemName];

                if(this.cachedValues[itemName].setState) {
                    this.cachedValues[itemName].setState!(previousValues![itemName]);
                }
            }
            /**
             * Otherwise if nothing was found, then just update the load boolean.
             */
            else this.updateLoad(itemName);
        });

        /**
         * Then, We'll loop once over the parsed values to retain anything that wasn't registered by the page.
         * We'll make the set state function to null, so that it's a read-only value.
         */
        Object.keys(previousValues).forEach(itemName => {
            if(this.cachedValues[itemName]) return;

            this.cachedValues = {...this.cachedValues,
                [itemName]: {
                    value: previousValues[itemName],
                    setState: null
                }
            }
        })
    }

    /**
     * A function to overwrite the value in local storage to maintain the state.
     * 
     * @param updateName The key of the state variable to save
     * @param updateValue The new value to overwrite with.
     */
    saveCacheValue(updateName:string, updateValue:any) {
        this.cachedValues[updateName].value = updateValue;

        /**
         * Mapping a new object to remove the set state functions from this class's cached values.
         */
        let parsedCachedValues = {};
        Object.keys(this.cachedValues).map(cacheItemName => {
            parsedCachedValues = {...parsedCachedValues,
                [cacheItemName]: this.cachedValues[cacheItemName].value
            }
        });
        
        /**
         * Saving this class's cached values into local storage.
         */
        localStorage.setItem('DreamStateCachedValues', JSON.stringify(parsedCachedValues));
    }

    /**
     * A function to update the booleans representing whether this class has finished loading all its values from local storage
     * @param itemName The key of the state variables that has just been checked for.
     */
    updateLoad(itemName:string) {
        this.isLoaded[itemName] = true;
        if(!this.hasLoaded() || typeof window === 'undefined') return;
        this.setHasLoaded(true);
    }

    /**
     * A getter function that represents whether this class has finished loading all its values from local storage based on the isLoaded object.
     */
    hasLoaded() {
        return Object.keys(this.isLoaded).every(key => this.isLoaded[key as keyof typeof this.isLoaded]);
    }
}


export default WindowCache;
import { useEffect } from "react";


class WindowCache {
    defaultValues: {
        [itemName:string]: any
    } = {};
    previousValues: {
        [itemName:string]: any
    } | null = null;
    cachedValues: {
        [itemName:string]: {
            value: any, 
            setState: React.Dispatch<React.SetStateAction<any>>
        }
    } = {};
    isLoaded: {
        [itemName:string]: boolean
    } = {};
    setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>;


    constructor(setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>) {
        this.setHasLoaded = setHasLoaded;
        if(typeof window != 'undefined') window.addEventListener('load', () => {
            const previousValuesStringified = localStorage.getItem('DreamStateCachedValues');

            if(previousValuesStringified && typeof JSON.parse(previousValuesStringified) != 'undefined') {
                this.previousValues = JSON.parse(previousValuesStringified);
                Object.keys(this.cachedValues).map(itemName => {
                    if(typeof this.previousValues![itemName] !== 'undefined' && !deepEquals(this.previousValues![itemName], this.cachedValues[itemName].value)) {
                        this.cachedValues[itemName].value = this.previousValues![itemName];
                        this.cachedValues[itemName].setState((previousState:any) => {
                            return this.previousValues![itemName]
                        });
                    }
                    else this.updateLoad(itemName);
                });
            }
            else {
                this.previousValues = this.defaultValues;
                localStorage.setItem('DreamStateCachedValues', JSON.stringify(this.defaultValues));
            }
        });
    }


    registerCache(itemName:string, stateVariable:any, setStateVariable:React.Dispatch<React.SetStateAction<any>>, callback?: () => typeof stateVariable) {
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

        useEffect(() => {
            if(!this.hasLoaded()) {
                if(deepEquals(this.cachedValues[itemName].value, stateVariable) && this.previousValues) {
                    this.updateLoad(itemName);
                }
            }
            else this.saveCacheValue(itemName, stateVariable);
        }, [stateVariable]);
    }


    saveCacheValue(updateName:string, updateValue:any) {
        this.cachedValues[updateName].value = updateValue;

        let parsedCachedValues = {};
        Object.keys(this.cachedValues).map(cacheItemName => {
            parsedCachedValues = {...parsedCachedValues,
                [cacheItemName]: this.cachedValues[cacheItemName].value
            }
        });
        localStorage.setItem('DreamStateCachedValues', JSON.stringify(parsedCachedValues));
    }


    updateLoad(itemName:string) {
        this.isLoaded[itemName] = true;
        if(!this.hasLoaded() || typeof window === 'undefined') return;
        this.setHasLoaded(true);
    }

    
    hasLoaded() {
        return Object.keys(this.isLoaded).every(key => this.isLoaded[key as keyof typeof this.isLoaded]);
    }
}


export default WindowCache;


function deepEquals(a:any, b:any): boolean {
    if((typeof a !== 'object' || !a) && (typeof b !== 'object' || !b)) return a === b;
    if(Object.keys(a).length !== Object.keys(b).length) return false;
    return Object.keys(a).every(aKey => {
        if(typeof b[aKey] === 'undefined') return false;
        else return deepEquals(a[aKey], b[aKey]);
    });
}
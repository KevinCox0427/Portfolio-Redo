import { useEffect } from "react";


class WindowCache {
    defaultValues: {
        [itemName:string]: any
    } = {};
    cachedValues: {
        [itemName:string]: {
            value: any, 
            setState: React.Dispatch<React.SetStateAction<any>>
        }
    } = {};
    isLoaded: {
        [itemName:string]: boolean
    } = {};
    callbacks: {
        [itemName:string]: {
            hasCalled: boolean,
            function: () => any
        }
    } = {};


    constructor() {
        if(typeof window != 'undefined') window.addEventListener('load', () => {
            const previousSaveStringified = localStorage.getItem('DreamStateCachedValues');

            if(previousSaveStringified && typeof JSON.parse(previousSaveStringified) != 'undefined') {
                const previousSave = JSON.parse(previousSaveStringified);

                Object.keys(this.cachedValues).map(itemName => {
                    if(!deepEquals(previousSave[itemName], this.cachedValues[itemName].value)) {
                        this.cachedValues[itemName].value = previousSave[itemName];
                        this.cachedValues[itemName].setState(previousSave[itemName]);
                    }
                    else this.updateLoad(itemName);
                });
            }
            else localStorage.setItem('DreamStateCachedValues', JSON.stringify(this.defaultValues));
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
            if(callback) this.callbacks = {...this.callbacks,
                [itemName]: {
                    function: callback,
                    hasCalled: false
                }
            };
        }

        useEffect(() => {
            if(!this.hasLoaded()) {
                if(deepEquals(this.cachedValues[itemName].value, stateVariable)) {
                    this.updateLoad(itemName);
                }
            }
            else this.updateCacheValue(itemName, stateVariable);
        }, [stateVariable]);
    }


    updateCacheValue(updateName:string, updateValue:any) {
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
        
        Object.keys(this.callbacks).forEach(callbackItemName => {
            if(this.callbacks[callbackItemName].hasCalled) return;
            window.addEventListener('load', () => {
                if(deepEquals(this.defaultValues[callbackItemName], this.cachedValues[callbackItemName].value)) {
                    this.callbacks[callbackItemName].function();
                    this.callbacks[callbackItemName].hasCalled = true;
                }
            });
        });
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
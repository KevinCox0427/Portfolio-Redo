import { useEffect } from "react";

class WindowCache {
    isLoaded:{
        [itemName:string]: boolean
    } = {}
    previousSave: any;
    cachedValues: {
        [itemName:string]: {
            stateVariable: any, 
            setStateVariable: React.Dispatch<React.SetStateAction<any>>
        }
    } = {}

    constructor() {
        if(typeof window != 'undefined') window.addEventListener('load', () => {
            const previousSaveStringified = localStorage.getItem('DreamStateCachedValues');
            if(previousSaveStringified && typeof JSON.parse(previousSaveStringified) != 'undefined') {
                this.previousSave = JSON.parse(previousSaveStringified);
                Object.keys(this.cachedValues).map(itemName => {
                    if(!deepEquals(this.previousSave[itemName], this.cachedValues[itemName].stateVariable)) {
                        this.cachedValues[itemName].setStateVariable(this.previousSave[itemName]);
                    }
                    else this.updateLoad(itemName);
                });
            } else {
                this.previousSave = {};
                Object.keys(this.cachedValues).map(itemName => {
                    this.previousSave = {...this.previousSave,
                        [itemName]: this.cachedValues[itemName].stateVariable
                    }
                });
                localStorage.setItem('DreamStateCachedValues', JSON.stringify(this.previousSave));
            }
        });
    }

    registerCache(itemName:string, stateVariable:any, setStateVariable:React.Dispatch<React.SetStateAction<any>>) {
        if(typeof this.cachedValues[itemName] === 'undefined'){
            this.cachedValues = {...this.cachedValues,
                [itemName]: {
                    stateVariable: stateVariable,
                    setStateVariable: setStateVariable
                }
            };
            this.isLoaded = {...this.isLoaded,
                [itemName]: false
            }
        }

        useEffect(() => {
            if(typeof this.previousSave == 'undefined') return;
            console.log(itemName, stateVariable)
            if(!this.hasLoaded()) {
                if(deepEquals(this.previousSave[itemName], stateVariable)) this.updateLoad(itemName);
                return;
            }
            else this.updateCacheValue();
        }, [stateVariable]);
    }

    updateCacheValue() {
        let parsedCachedValues = {};
        Object.keys(this.cachedValues).map(cacheItemName => {
            parsedCachedValues = {...parsedCachedValues,
                [cacheItemName]: this.cachedValues[cacheItemName].stateVariable
            }
        });
        localStorage.setItem('DreamStateCachedValues', JSON.stringify(parsedCachedValues));
    }

    updateLoad(itemName:string) {
        this.isLoaded[itemName] = true;
        console.log(itemName, this.isLoaded[itemName], this.isLoaded)
    }

    hasLoaded() {
        return Object.keys(this.isLoaded).every(key => this.isLoaded[key as keyof typeof this.isLoaded]);
    }
}

export default WindowCache;

function deepEquals(a:any, b:any): boolean {
    if((typeof a !== 'object' || !a) && (typeof b !== 'object' || !b)) return a === b;
    return Object.keys(a).every(aKey => {
        if(typeof b[aKey] !== 'undefined') return deepEquals(a[aKey], b[aKey]);
        else return false;
    });
}
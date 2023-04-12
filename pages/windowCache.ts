import { useEffect } from "react";

class WindowCache {
    cacheTimeoutBuffer:NodeJS.Timeout | null = null;
    loadedCount = 0;
    hasLoaded = false;
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
                    this.cachedValues[itemName].setStateVariable(this.previousSave[itemName]);
                });
            }
        });
    }

    registerCache(itemName:string, stateVariable:any, setStateVariable:React.Dispatch<React.SetStateAction<any>>) {
        this.cachedValues = {...this.cachedValues,
            [itemName]: {
                stateVariable: stateVariable,
                setStateVariable: setStateVariable
            }
        };

        useEffect(() => {
            console.log(this.getLoadCount(), this.previousSave)
            if(!this.hasLoaded) {
                if(!this.previousSave || deepEquals(stateVariable, this.previousSave[itemName])) {
                    this.addLoadCount();
                }
                else return;
            }
            
            this.updateCacheValue(itemName);
        }, [stateVariable]);
    }

    updateCacheValue(itemName: string) {
        this.cachedValues = {...this.cachedValues,
            [itemName]: this.cachedValues[itemName].stateVariable
        }

        console.log('Saving: ' + itemName)

        if(this.cacheTimeoutBuffer) clearTimeout(this.cacheTimeoutBuffer);
        this.cacheTimeoutBuffer = setTimeout(() => {
            console.log('Saved!', this.cachedValues)
            localStorage.setItem('DreamStateCachedValues', JSON.stringify(this.cachedValues));
        }, 3000);
    }

    addLoadCount() {
        this.loadedCount++;
        if(this.getLoadCount() == Object.keys(this.cachedValues).length) this.hasLoaded = true;
    }

    getLoadCount() {
        return this.loadedCount;
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
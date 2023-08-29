// Loading the intial store from local storage if it exists.
const cachedStore = typeof localStorage !== 'undefined' ? localStorage.getItem('DreamStateStore') : null;
const initialStore = cachedStore ? JSON.parse(cachedStore) as Store : null;
console.log(initialStore);
export default initialStore;
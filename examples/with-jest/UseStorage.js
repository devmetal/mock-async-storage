import AsyncStorage from './AsyncStorage';

export const save = (k, v) => AsyncStorage.setItem(k,v);

export const get = k => AsyncStorage.getItem(k); 

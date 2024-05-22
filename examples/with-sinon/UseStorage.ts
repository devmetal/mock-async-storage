import AsyncStorage from "./AsyncStorage";

export const save = (k: string, v: string) => AsyncStorage.setItem(k, v);

export const get = (k: string) => AsyncStorage.getItem(k);

import AsyncStorage from "./AsyncStorage";

export const save = (k: unknown, v: unknown) => AsyncStorage.setItem(k, v);

export const get = (k: unknown) => AsyncStorage.getItem(k);

import { sys } from "cc";

export enum ITEM_STORAGE {
    LANGUAGE = "language",
    AUDIO = "audio",
    BPM = "BPM"
}


export namespace BaseStorage {
    /**
     * 获取缓存
     * @param itemName
     */
    export function getItem(itemName: ITEM_STORAGE): string | null {
        return sys.localStorage.getItem(itemName);
    }

    /**
     * 设置缓存
     * @param itemName
     * @param value
     */
    export function setItem(
        itemName: ITEM_STORAGE,
        value: string | number
    ): void {
        sys.localStorage.setItem(itemName, String(value));
    }

    /**
     * 移除缓存
     * @param item
     */
    export function removeLocalStorageItem(item: string) {
        sys.localStorage.removeItem(item);
    }

    /**
     * 批量清除缓存
     * @param keys 需要保留的缓存项
     */
    export function clearWithoutKeys(keys: string[]) {
        for (const key in ITEM_STORAGE) {
            if (keys.indexOf(ITEM_STORAGE[key]) === -1){
                sys.localStorage.removeItem(ITEM_STORAGE[key]);
            }              
        }
    }
}
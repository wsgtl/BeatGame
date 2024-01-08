import { BaseStorage, ITEM_STORAGE } from "./BaseStorage";

export const DEFEAUT_BPM = 60;
export const MAX_BPM = 120;
export const MIN_BPM = 20;
/**节拍速度 */
export var BPM: number = getBpm() ?? DEFEAUT_BPM;
export function getBpm() {
    const bpm = BaseStorage.getItem(ITEM_STORAGE.BPM) ?? DEFEAUT_BPM;
    return typeof bpm == "string" ? parseInt(bpm) : bpm;
}
export function saveBpm() {
    BaseStorage.setItem(ITEM_STORAGE.BPM, BPM.toString());
}
export function setBPM(bpm: number) {
    BPM = bpm;
    saveBpm();
}
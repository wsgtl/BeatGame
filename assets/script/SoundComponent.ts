import { _decorator, Component, Node, AudioSource, resources, AudioClip, find } from 'cc';
import { delay, destroyNode } from './UIUtil';
const { ccclass, property } = _decorator;

const MaxPerEffectSound = 8;
@ccclass('SoundComponent')
export class SoundComponent extends Component {
    @property(AudioSource)
    bgmNode:AudioSource;

    onLoad(){
        
    }
    private isPlay = true;
    private _effectVolume: number = 1;
    private _playingMap: Map<string, number> = new Map<string, number>();
    playLoopEffect(name: string, startNow: boolean = true) {
        if (this.isPlay) {
            const _max: number = MaxPerEffectSound;
            const _key: string = name;
            if (this.getClipCount(_key) >= _max) {// 避免重复加载
                return null;
            }
            const loopEffectNode = new Node();
            const as = this.bgmNode;
            as.loop = true;
            as.volume = this._effectVolume;
            as.playOnAwake = false;
            this.node.addChild(loopEffectNode);
            resources.load(`sounds/${name}`, AudioClip, (err, ac) => {
                if (ac) {
                    as.clip = ac;
                    if (startNow)
                        as.play();
                }
            });
            return as;
        }
        return null;
    }

    playEffect(name: string, cfg?: number | IEffectAudioConfig) {
        if (!this.node || !this.node.isValid)
            return;
        if (this.isPlay) {
            let max: number;
            let key: string;
            if (cfg) {
                if (typeof cfg === 'number') {
                    max = cfg;
                    key = name;
                } else {
                    max = cfg.maxCount;
                    key = cfg.key;
                }
            } else {
                max = MaxPerEffectSound;
                key = name;
            }
            if (this.getClipCount(key) >= max) {// 避免重复加载
                return;
            }
            resources.load(`sounds/${name}`, AudioClip, (err, ac) => {
                if (ac) {
                    if (this.getClipCount(key) >= max) {// 避免重复播放
                        return;
                    }
                    const effectNode = new Node();
                    const as = effectNode.addComponent(AudioSource);
                    as.loop = false;
                    as.volume = this._effectVolume;
                    as.playOnAwake = false;
                    this.node.addChild(effectNode);
                    as.playOneShot(ac);
                    // 加入列表
                    this.insertClip(key, ac.getDuration());
                    delay(ac.getDuration()).then(() => {
                        destroyNode(effectNode);
                    });
                }
            });
        }
    }
    private insertClip(clipName: string, duration: number) {
        if (!duration) return;
        const playingMap = this._playingMap;
        if (playingMap.has(clipName)) {
            playingMap.set(clipName, playingMap.get(clipName) + 1);
        } else {
            playingMap.set(clipName, 1);
        }
        this.scheduleOnce(() => {
            playingMap.set(clipName, playingMap.get(clipName) - 1);
        }, duration);
    }
    private getClipCount(clipName: string): number {
        if (this._playingMap.has(clipName))
            return this._playingMap.get(clipName);
        return 0;
    }
}


export interface IEffectAudioConfig {
    key: string,
    maxCount: number;
}
export function playEffect(name: string, cfg?: number | IEffectAudioConfig) {
    const per = permanent();
    per?.playEffect(name, cfg);
}

export function playLoopEffect(name: string, startNow: boolean = true) {
    const per = permanent();
    return per?.playLoopEffect(name, startNow);
}
export function permanent(): SoundComponent {
    const node = find('PermanentNode');
    return node ? node.getComponent(SoundComponent) : null;
}
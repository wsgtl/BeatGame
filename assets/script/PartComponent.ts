import { _decorator, Component, Node, instantiate, Widget, Tween, tween, UIOpacity, v3 } from 'cc';
import { RectComponent } from './RectComponent';
import { playEffect } from './SoundComponent';
import { delay, MathUtil, UIUtils } from './UIUtil';
const { ccclass, property } = _decorator;

@ccclass('PartComponent')
export class PartComponent extends Component {
    @property(Node)
    rectNode: Node;
    @property(Node)
    rectBox: Node;
    @property(Node)
    beatNode: Node;

    private rectArr: Node[] = [];

    private partHeight:number;
    private rectHeight:number;
    private baseY:number;
    onLoad() {
        this.node.getComponent(Widget).updateAlignment();
        const height = UIUtils.getHeight(this.node);
        const h = UIUtils.getHeight(this.rectNode);
        const num = Math.ceil(height / h) + 1;
        const by = -height / 2 + h / 2;
        this.partHeight = height;
        this.rectHeight = h;
        this.baseY = by;
        const color = ["#ff00ff", "#0000ff", "#ff0000", "#ff0fff", "#f000ff",][MathUtil.random(0, 4)];
        for (let i = 0; i < num; i++) {
            const r = instantiate(this.rectNode);
            this.rectBox.addChild(r);
            UIUtils.setY(r, by + h * i);
            this.rectArr.push(r);
            // r.getComponent(RectComponent).setColor(color);
        }
        this.rectNode.active = false;
        this.curRect = this.rectArr[0];
        this.startGame();
    }
    onBeat(){
        playEffect("AfricanDrum");
        // this.beatNode.getComponent(Widget).updateAlignment();
        // const op = this.beatNode.getComponent(UIOpacity);
        // op.opacity = 255;
        // Tween.stopAllByTarget(op);
        // tween(op).to(0.2,{opacity:0}).start();
        this.curRect?.getComponent(RectComponent).click();
    }
    private beatNum = 0;
    private curRect:Node = null;
    private async startGame(){
        const time = 1;
        const aniTime = time/10;
        await delay(time - aniTime);
        this.beatNum++;
        const bn = this.beatNum % this.rectArr.length;
        this.curRect = this.rectArr[bn];
        for (let i = 0; i < this.rectArr.length; i++) {
            const r = this.rectArr[i];
            let index = i - bn;
            if (index < 0 ) index = this.rectArr.length + index;
            const toY = this.baseY + this.rectHeight * index;
            if(toY>r.position.y){
                tween(r).by(aniTime,{position:v3(0,-this.rectHeight)}).call(()=>{
                    UIUtils.setY(r,toY);
                    r.getComponent(RectComponent).changePoiont();
                }).start();
            }else{
                tween(r).to(aniTime,{position:v3(0,toY)}).start();
            }     
        }
        await delay(aniTime);
        this.startGame();
    }
}



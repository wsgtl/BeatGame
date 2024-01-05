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
    onLoad() {
        this.node.getComponent(Widget).updateAlignment();
        const height = UIUtils.getHeight(this.node);
        const h = UIUtils.getHeight(this.rectNode);
        const num = Math.ceil(height / h);
        const by = -height / 2 + h / 2;
        const color = ["#ff00ff", "#0000ff", "#ff0000", "#ff0fff", "#f000ff",][MathUtil.random(0, 4)];
        for (let i = 0; i < num; i++) {
            const r = instantiate(this.rectNode);
            this.rectBox.addChild(r);
            UIUtils.setY(r, by + h * i);
            this.rectArr.push(r);
            // r.getComponent(RectComponent).setColor(color);
        }
        this.rectNode.active = false;
    }
    onBeat(){
        playEffect("AfricanDrum");
        // this.beatNode.getComponent(Widget).updateAlignment();
        const op = this.beatNode.getComponent(UIOpacity);
        op.opacity = 255;
        Tween.stopAllByTarget(op);
        tween(op).to(0.2,{opacity:0}).start();
       
    }
}



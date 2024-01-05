import { _decorator, Component, Node, instantiate, Sprite } from 'cc';
import { PointComponent } from './PointComponent';
import { MathUtil, UIUtils } from './UIUtil';
const { ccclass, property } = _decorator;

@ccclass('RectComponent')
export class RectComponent extends Component {
    @property(Node)
    pointNode: Node;

    private pointArr:Node[] = [];
    onLoad() {
        const num = MathUtil.random(1, 4);
        const bx = 70;
        for (let i = 0; i < num; i++) {
            const p = instantiate(this.pointNode);
            this.node.addChild(p);
            UIUtils.setX(p, (i - (num - 1) / 2) * bx );
            this.pointArr.push(p);
        }
        this.pointNode.active = false;
        
    }
    setColor(c:string){
        UIUtils.setColor(this.node.getChildByName("Bg"),c);
    }
}



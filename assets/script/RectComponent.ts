import { _decorator, Component, Node, instantiate, Sprite } from 'cc';
import { PointComponent } from './PointComponent';
import { MathUtil, UIUtils, destroyNode } from './UIUtil';
const { ccclass, property } = _decorator;

@ccclass('RectComponent')
export class RectComponent extends Component {
    @property(Node)
    pointNode: Node;

    public pointArr:Node[] = [];
    onLoad() {
        this.pointNode.active = false;
        this.changePoiont();
        
        
    }
    setColor(c:string){
        UIUtils.setColor(this.node.getChildByName("Bg"),c);
    }
    private clickNum = 0;
    changePoiont(){
        for(let p of this.pointArr){
            destroyNode(p);
        }
        this.clickNum = 0;
        this.pointArr = [];
        const num = MathUtil.random(1, 4);
        const bx = 70;
        for (let i = 0; i < num; i++) {
            const p = instantiate(this.pointNode);
            this.node.addChild(p);
            UIUtils.setX(p, (i - (num - 1) / 2) * bx );
            this.pointArr.push(p);
            p.active = true;
        }
    }
    click(){
        const p = this.pointArr[this.clickNum++];
        p.getComponent(PointComponent).clickAni();
    }
}



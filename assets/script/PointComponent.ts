import { _decorator, Component, Node } from 'cc';
import { UIUtils } from './UIUtil';
const { ccclass, property } = _decorator;

@ccclass('PointComponent')
export class PointComponent extends Component {
    clickAni(){
        UIUtils.setColor(this.node,"#ff0000");
    }
}



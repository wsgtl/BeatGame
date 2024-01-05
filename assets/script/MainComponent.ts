import { _decorator, Component, Node, instantiate, view, Label, Slider, EditBox, macro } from 'cc';
import { UIUtils } from './UIUtil';
const { ccclass, property } = _decorator;

@ccclass('MainComponent')
export class MainComponent extends Component {
    @property(Node)
    partNode: Node;
    
    @property(Node)
    partBox: Node;
    
    @property(Label)
    partNumLabel: Label;

    @property(EditBox)
    editBox: EditBox;
    @property(Slider)
    slider: Slider;




    private partArr: Node[] = [];
    /**节拍速度 */
    private BPM:number = 60;
    private readonly MAX_BPM = 400;
    private readonly MIN_BPM = 20;
    onLoad() {
        this.partArr.push(this.partNode);
        const p = instantiate(this.partNode);
        this.partArr.push(p);
        this.partBox.addChild(p);
        p.active = false;
        this.setPartNumLabel();
        this.setEditBox();
        this.setSlider();
    }
    private partNum: number = 1;
    private onSetPartNum() {
        const w = view.getVisibleSize().width;
        this.partNum = 3 - this.partNum;
        for (let i = 0; i < 2; i++) {
            const x = (i - ((this.partNum - 1) / 2)) * (w / this.partNum);
            this.setRect(this.partArr[i], w / this.partNum, x, i < this.partNum);
        }
        this.setPartNumLabel();
    }
    private setRect(part: Node, w: number, x: number, show: boolean) {
        UIUtils.setWidth(part, w);
        UIUtils.setX(part, x);
        part.active = show;
    }
    private setPartNumLabel(){
        this.partNumLabel.string = "x" + this.partNum;
    }


    private onChangeBPM(e:EditBox) {
        const b = parseInt(e.string);
        this.BPM = Math.max(this.MIN_BPM,Math.min(this.MAX_BPM,b));
        this.setEditBox();
        this.setSlider();
    }
    private onSlider(s:Slider) {
        this.BPM = Math.round(s.progress * (this.MAX_BPM - this.MIN_BPM) + this.MIN_BPM);
        this.setEditBox();
    }
    private setSlider(){
        this.slider.progress = (this.BPM - this.MIN_BPM) / (this.MAX_BPM - this.MIN_BPM);
    }
    private setEditBox(){
        this.editBox.string = this.BPM.toString();
    }

}



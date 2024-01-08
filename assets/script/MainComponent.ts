import { _decorator, Component, Node, instantiate, view, Label, Slider, EditBox, macro } from 'cc';
import { BaseStorage, ITEM_STORAGE } from './BaseStorage';
import { BPM, DEFEAUT_BPM, MAX_BPM, MIN_BPM, setBPM } from './ConstVar';
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
        setBPM(Math.max(MIN_BPM,Math.min(MAX_BPM,b)));
        this.setEditBox();
        this.setSlider();
    }
    private onSlider(s:Slider) {
        setBPM(Math.round(s.progress * (MAX_BPM - MIN_BPM) + MIN_BPM));
        this.setEditBox();
    }
    private setSlider(){
        this.slider.progress = (BPM - MIN_BPM) / (MAX_BPM - MIN_BPM);
    }
    private setEditBox(){
        this.editBox.string = BPM.toString();
    }


}



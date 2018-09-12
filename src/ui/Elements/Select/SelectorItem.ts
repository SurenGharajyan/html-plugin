import PhaserTextStyle = Phaser.PhaserTextStyle;
import {Images} from "../../../assets";

export class SelectorItem extends Phaser.Group {
    private _textOfSel : Phaser.Text;
    private readonly nameOfText : string;
    private readonly style : PhaserTextStyle;
    private currentSelected : Phaser.Text;
    private backgroundSprite : Phaser.Sprite;
    private readonly maskWidth : number;
    private _value : string;
    constructor(g : Phaser.Game, name : string, value : string, style : PhaserTextStyle, currentSelected : Phaser.Text, maskWidth : number) {
        super(g);
        this.style = style;
        this.nameOfText = name;
        this._value = value;
        this.currentSelected = currentSelected;
        this.maskWidth = maskWidth;
        this.init();
    }

    private init() : void {
        this.initBackground();
        this.initText();
    }

    private initBackground() : void {
        this.backgroundSprite = this.game.add.sprite(0,0,Images.ImagesWhiteBackground.getName(),null,this);
        this.backgroundSprite.width = this.maskWidth;
        this.backgroundSprite.inputEnabled = true;
    }

    private initText() : void {
        this._textOfSel = this.game.add.text(0,0,this.nameOfText, this.style, this);
        this._textOfSel.inputEnabled = true;
        this.backgroundSprite.height = this._textOfSel.height;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }


}
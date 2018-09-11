import PhaserTextStyle = Phaser.PhaserTextStyle;

export class SelectorItem extends Phaser.Group {
    private _textOfSel : Phaser.Text;
    private nameOfText : string;
    private style : PhaserTextStyle;
    private currentSelected : Phaser.Text;
    private _onClick: Phaser.Signal;
    constructor(g : Phaser.Game,name : string, style : PhaserTextStyle, currentSelected : Phaser.Text) {
        super(g);
        this.style = style;
        this.nameOfText = name;
        this.currentSelected = currentSelected;
        this.init();
    }

    public get onClick(): Phaser.Signal {
        return this._onClick;
    }

    private init() : void {
        // this.initBackground();
        this.initText();
        this._onClick = new Phaser.Signal();
    }

    private initText() : void {
        this._textOfSel = this.game.add.text(0,0,this.nameOfText, this.style, this);
        this._textOfSel.inputEnabled = true;
        this._textOfSel.events.onInputDown.add(this.textClicked, this);
    }

    private changeSelectedText() : void {
        this.currentSelected.text = this._textOfSel.text;
    }

    get textOfSelectedWidth(): number {
        return this._textOfSel.width;
    }

    private textClicked() : void {
        console.info('HERE');
        this._onClick.dispatch(this.nameOfText);
    }
}
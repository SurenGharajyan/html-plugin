import {Configuration} from "../common/Configuration";


export class RadioConfiguration extends Configuration {
    private _scaleX : number;
    private _scaleY : number;
    private _label : string[];
    private _background : string;
    private _foreground : string;
    private _textStyle : Phaser.PhaserTextStyle;
    private _checked : boolean;
    private _byDefChecked : number;

    constructor(width: number, height: number, scaleX: number, scaleY: number, label: string[], background : string, foreground : string,  textStyle: Phaser.PhaserTextStyle, checked: boolean, byDefChecked?: number) {
        super(width, height);
        this._scaleX = scaleX;
        this._scaleY = scaleY;
        this._label = label;
        this._background = background;
        this._foreground = foreground;
        this._textStyle = textStyle;
        this._checked = checked;
        this._byDefChecked = byDefChecked;
    }

    get label(): string[] {
        return this._label;
    }

    set label(value: string[]) {
        this._label = value;
    }

    get textStyle(): Phaser.PhaserTextStyle {
        return this._textStyle;
    }

    set textStyle(value: Phaser.PhaserTextStyle) {
        this._textStyle = value;
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        this._checked = value;
    }

    get byDefChecked(): number {
        if (this._byDefChecked > this.label.length) {
            return null;
        }
        return this._byDefChecked;
    }

    set byDefChecked(value: number) {
        this._byDefChecked = value;
    }

    get scaleX(): number {
        return this._scaleX;
    }

    set scaleX(value: number) {
        this._scaleX = value;
    }

    get scaleY(): number {
        return this._scaleY;
    }

    set scaleY(value: number) {
        this._scaleY = value;
    }

    get background(): string {
        return this._background;
    }

    set background(value: string) {
        this._background = value;
    }

    get foreground(): string {
        return this._foreground;
    }

    set foreground(value: string) {
        this._foreground = value;
    }




}
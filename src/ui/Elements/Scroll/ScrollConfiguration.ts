import {ScrollBar} from "./ScrollBar";

export class ScrollConfiguration {

    private readonly _widthGroup : number;
    private readonly _widthScrollBar : number;
    private _scrollBarPos : number;
    private readonly _position : Phaser.Point;
    private readonly _scrollSrc : ScrollBar;
    private readonly _arrowsEnabled : boolean;
    private _backgroundColor : number;
    private _maskWidth : number;
    private _maskHeight : number;
    private _isEnableClickOnMask : boolean;
    private _selectedText : Phaser.Text;
    private _textSize : number;

    constructor(widthGroup: number, widthScrollBar: number, position: Phaser.Point, scrollSrc: ScrollBar, arrowsEnabled: boolean,
                backgroundColor: number, maskWidth: number, maskHeight : number,textSize, isEnableClickOnMask : boolean, selectedText : Phaser.Text) {
        this._widthGroup = widthGroup;
        this._widthScrollBar = widthScrollBar;

        this._position = position;
        this._scrollSrc = scrollSrc;
        this._arrowsEnabled = arrowsEnabled;
        this._backgroundColor = backgroundColor;
        this._maskWidth = maskWidth;
        this._maskHeight = maskHeight;
        this._isEnableClickOnMask = isEnableClickOnMask;
        this._selectedText = selectedText;
        this._textSize = textSize;
    }

    get widthGroup(): number {
        return this._widthGroup;
    }

    get widthScrollBar(): number {
        return this._widthScrollBar;
    }

    get position(): Phaser.Point {
        return this._position;
    }

    get scrollSrc(): ScrollBar {
        return this._scrollSrc;
    }

    get arrowsEnabled(): boolean {
        return this._arrowsEnabled;
    }

    get backgroundColor(): number {
        return this._backgroundColor;
    }

    set backgroundColor(value: number) {
        this._backgroundColor = value;
    }

    get maskWidth(): number {
        return this._maskWidth;
    }

    set maskWidth(value: number) {
        this._maskWidth = value;
    }

    get maskHeight(): number {
        return this._maskHeight;
    }

    set maskHeight(value: number) {
        this._maskHeight = value;
    }

    get isEnableClickOnMask(): boolean {
        return this._isEnableClickOnMask;
    }

    set isEnableClickOnMask(value: boolean) {
        this._isEnableClickOnMask = value;
    }
    get selectedText(): Phaser.Text {
        return this._selectedText;
    }

    set selectedText(value: Phaser.Text) {
        this._selectedText = value;
    }

    get textSize(): number {
        return this._textSize;
    }

    set textSize(value: number) {
        this._textSize = value;
    }

}
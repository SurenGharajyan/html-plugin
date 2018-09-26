import {ScrollBar} from "../../Scroll/ScrollBar";

export class SelectScrollConfiguration {


    private readonly _widthGroup : number;
    private readonly _widthScrollBar : number;
    private readonly _position : Phaser.Point;
    private readonly _scrollSrc : ScrollBar;
    private readonly _arrowsEnabled : boolean;
    private _backgroundColor : number;
    private _maskHeight : number;
    private _isEnableClickOnMask : boolean;
    private _selectedText : Phaser.Text;
    private _selectAreaWidth : number;

    constructor(widthGroup: number, widthScrollBar: number, position: Phaser.Point, scrollSrc: ScrollBar, arrowsEnabled: boolean,
                backgroundColor: number, maskHeight : number,isEnableClickOnMask : boolean, selectedText : Phaser.Text
                ,selectAreaWidth : number) {
        this._widthGroup = widthGroup;
        this._widthScrollBar = widthScrollBar;

        this._position = position;
        this._scrollSrc = scrollSrc;
        this._arrowsEnabled = arrowsEnabled;
        this._backgroundColor = backgroundColor;
        this._maskHeight = maskHeight;
        this._isEnableClickOnMask = isEnableClickOnMask;
        this._selectedText = selectedText;
        this.selectAreaWidth = selectAreaWidth
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

    get selectAreaWidth(): number {
        return this._selectAreaWidth;
    }

    set selectAreaWidth(value: number) {
        this._selectAreaWidth = value;
    }
}
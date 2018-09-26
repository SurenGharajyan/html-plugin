import {ScrollBar} from "./ScrollBar";

export class ScrollConfiguration {
    private readonly _widthGroup : number;
    private readonly _widthScrollBar : number;
    private readonly _position : Phaser.Point;
    private readonly _scrollSrc : ScrollBar;
    private readonly _arrowsEnabled : boolean;

    constructor(widthGroup : number,widthScrollBar : number, position: Phaser.Point, scrollSrc: ScrollBar, arrowsEnabled: boolean) {
        this._widthGroup = widthGroup;
        this._widthScrollBar = widthScrollBar;
        this._position = position;
        this._scrollSrc = scrollSrc;
        this._arrowsEnabled = arrowsEnabled;
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
}
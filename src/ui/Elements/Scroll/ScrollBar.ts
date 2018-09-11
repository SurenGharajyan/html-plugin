
export class ScrollBar {
    private _scroller : string;
    private _scrollArea : string;

    constructor(scroller: string, scrollArea: string) {
        this._scroller = scroller;
        this._scrollArea = scrollArea;
    }

    get scroller(): string {
        return this._scroller;
    }

    get scrollArea(): string {
        return this._scrollArea;
    }
}
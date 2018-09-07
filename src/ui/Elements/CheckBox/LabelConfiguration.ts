export class LabelConfiguration {
    private _value : string
    private _width : number;
    private _height : number;
    private _style : Phaser.PhaserTextStyle;

    constructor(value : string, style?: Phaser.PhaserTextStyle, width?: number, height?: number) {
        this._value = value;
        this._width = width;
        this._height = height;
        this._style = style;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get style(): Phaser.PhaserTextStyle {
        return this._style;
    }

    set style(value: Phaser.PhaserTextStyle) {
        this._style = value;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }
}
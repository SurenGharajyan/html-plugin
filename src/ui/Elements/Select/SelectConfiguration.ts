import {Configuration} from "../common/Configuration";

export class SelectConfiguration extends Configuration{
    private _label : string[];
    private _fontAndOtherSize : number;
    private _byDefault : number;
    private _heightOfShowingSpace : number;
    private _values : string[];
    constructor(width: number, height: number, label: string[], values : string[] ,fontAndOtherSize : number, heightOfShowingSpace : number, byDefault? : number) {
        super(width, height);
        this._label = label;
        this._values = values;
        this._fontAndOtherSize = fontAndOtherSize;
        this._heightOfShowingSpace = heightOfShowingSpace;
        this._byDefault = byDefault;
    }

    get label(): string[] {
        return this._label;
    }

    set label(value: string[]) {
        this._label = value;
    }

    get fontAndOtherSize(): number {
        return this._fontAndOtherSize;
    }

    set fontAndOtherSize(value: number) {
        this._fontAndOtherSize = value;
    }

    get byDefault(): number {
        if (this._byDefault == null) {
            return 0;
        }
        return this._byDefault;
    }

    set byDefault(value: number) {
        this._byDefault = value;
    }

    get heightOfShowingSpace(): number {
        return this._heightOfShowingSpace;
    }

    set heightOfShowingSpace(value: number) {
        this._heightOfShowingSpace = value;
    }

    get values(): string[] {
        return this._values;
    }

    set values(value: string[]) {
        this._values = value;
    }
}
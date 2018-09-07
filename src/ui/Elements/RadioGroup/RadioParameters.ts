import {Parameters} from "../common/Parameters";

export class RadioParameters extends Parameters {
    private _distanceBetween : number;

    constructor(x: number, y: number, distanceBetween? : number) {
        super(x, y);
        this._distanceBetween = distanceBetween;
    }

    get distanceBetween(): number {
        if (this._distanceBetween == undefined) {
            return 50;
        }
        return this._distanceBetween;
    }

    set distanceBetween(value: number) {
        this._distanceBetween = value;
    }
}

import {Configuration} from "../common/Configuration";
import {InputType} from "./InputType";

export class InputConfiguration extends Configuration {
    private _blinkingSpeed : number;
    private _textValue : string;
    private _placeHolderValue : string;
    private _inputType : InputType;
    private _size : number;
    constructor(width: number, height: number , blinkingSpeed: number, size : number, textValue? : string,
                hintValue? : string, inputType? : InputType) {
        super(width, height);
        this._blinkingSpeed = blinkingSpeed;
        this._textValue = textValue;
        this._placeHolderValue = hintValue;
        this._inputType = inputType;
        this._size = size;
    }

    get blinkingSpeed(): number {
        return this._blinkingSpeed;
    }

    set blinkingSpeed(value: number) {
        this._blinkingSpeed = value;
    }

    get textValue(): string {
        return this._textValue;
    }

    set textValue(value: string) {
        this._textValue = value;
    }

    get placeHolderValue(): string {
        return this._placeHolderValue;
    }

    set placeHolderValue(value: string) {
        this._placeHolderValue = value;
    }

    get inputType(): InputType {
        return this._inputType;
    }

    set inputType(value: InputType) {
        this._inputType = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }
}
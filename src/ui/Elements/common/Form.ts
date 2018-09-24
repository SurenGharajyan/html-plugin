export class Form {
    private _checked: boolean = false;

    constructor(check?: boolean) {
        this._checked = check;
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        this._checked = value;
    }

}
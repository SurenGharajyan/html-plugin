import {Parameters} from "../common/Parameters";
import {Configuration} from "../common/Configuration";
import {LabelConfiguration} from "./LabelConfiguration";
import {Form} from "../common/Form";

export class CheckBoxConfiguration extends Configuration {
    private _label : LabelConfiguration;
    private _background : string;
    private _foreground : string;
    private _form : Form;

    constructor(width: number, height: number, label: LabelConfiguration, background: string, foreground: string, form : Form) {
        super(width, height);
        this._label = label;
        this._background = background;
        this._foreground = foreground;
        this._form = form;
    }

    get background(): string {
        return this._background;
    }

    get foreground(): string {
        return this._foreground;
    }

    get label(): LabelConfiguration {
        return this._label;
    }

    set label(value: LabelConfiguration) {
        this._label = value;
    }

    get form(): Form {
        return this._form;
    }

    set form(value: Form) {
        this._form = value;
    }
}
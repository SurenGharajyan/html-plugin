import {LabelConfiguration} from "./CheckBox/LabelConfiguration";
import {Form} from "./common/Form";
import {InputType} from "./Input/enums/InputType";
import {TextConfigurations} from "./Select/TextConfigurations";
import {Parameters} from "./common/Parameters";
import {Configuration} from "./common/Configuration";
import {ScrollBar} from "./Scroll/ScrollBar";

export namespace PluginInterfaces {

    export interface CheckBoxConfigurations extends Parameters, Configuration {
        label?: LabelConfiguration,
        labelClick?: boolean,
        background?: string,
        foreground?: string,
        form? : Form
    }

    export interface RadioGroupConfigurations extends Parameters, Configuration {
        distanceBetween?: number,
        label?: string[],
        background?: string,
        foreground?: string,
        textStyle?: Phaser.PhaserTextStyle,
        byDefChecked?: number
    }

    export interface InputConfigurations extends Parameters,Configuration {
        fontSize? : number,
        value? : string,
        placeHolder? : string,
        inputType? : InputType
    }

    export interface SelectConfigurations extends Parameters,Configuration {
        label?: string[];
        value?: string[];
        textConfiguration? : TextConfigurations
        fontAndOtherSize?: number;
        heightOfShowingSpace?: number;
        byDefault?: number;
    }

    export interface ScrollConfigurations {
        widthGroup?: number;
        widthScrollBar?: number;
        position?: Phaser.Point;
        scrollSrc?: ScrollBar;
        arrowsEnabled?: boolean;
        backgroundColor?: number;
        maskHeight?: number;
        isEnableClickOnMask?: boolean;
        selectedText?: Phaser.Text;
        selectAreaWidth?: number;
    }
}
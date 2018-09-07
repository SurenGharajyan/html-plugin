import {DC} from "../Elements/htmlPlugin";
import {CheckBoxConfiguration} from "../Elements/CheckBox/CheckBoxConfiguration";
import {CheckBoxParameters} from "../Elements/CheckBox/CheckBoxParameters";
import {Images} from "../../assets";
import {LabelConfiguration} from "../Elements/CheckBox/LabelConfiguration";
import {InputParameters} from "../Elements/Input/InputParameters";
import {InputConfiguration} from "../Elements/Input/InputConfiguration";
import {Form} from "../Elements/common/Form";
import {RadioParameters} from "../Elements/RadioGroup/RadioParameters";
import {RadioConfiguration} from "../Elements/RadioGroup/RadioConfiguration";
import {InputType} from "../Elements/Input/InputType";


export class GameScreen extends Phaser.Group {

    constructor(g) {
        super(g);
        console.log('CREATE');
        this.game.stage.backgroundColor = '#00acd6';

        this.initPlugins(g);
    }

    private initPlugins(g : Phaser.Game) : void {
        this.initCheckBox(g);
        this.initInput(g);
        this.initRadioButtons(g);
    }

    private initCheckBox(g : Phaser.Game) : void {
        //CheckBox
        let chBoxParameters = new CheckBoxParameters(100,100);
        let chBoxConfiguration = new CheckBoxConfiguration(50,50,
            new LabelConfiguration("CheckBox Example",{font: 'Arial Black', fontSize: 17, fontWeight: 'bold'}),
            Images.ImagesUnchecked.getName(),
            Images.ImagesChecked.getName(),new Form(true));

        const checkBox = new DC.Input.CheckBox(g,chBoxParameters,chBoxConfiguration);
    }

    private initInput(g : Phaser.Game) : void {
        //Input
        let inputParameters = new InputParameters(50,200);
        let inputConfiguration = new InputConfiguration(300,30,650,18,
            '','',InputType.TEXT);

        let input;
        switch (inputConfiguration.inputType) {
            case InputType.NUMBER :
                input = new DC.Input.InputNumber(g,inputParameters,inputConfiguration);
                break;
            case InputType.TEXT :
                input = new DC.Input.InputArea(g,inputParameters,inputConfiguration);
                break;
            case InputType.PASSWORD:
                input = new DC.Input.InputPassword(g,inputParameters,inputConfiguration);
                break;
        }
    }

    private initRadioButtons(g : Phaser.Game) {
        //RadioButtons
        //by default distance is 50
        let radioParameters = new RadioParameters(400,50,70);
        let radioConfiguration = new RadioConfiguration(50,50,1,1,['Milk','Meat','Bread','Egg','etc'],
            Images.ImagesRadiobtnUnchecked.getName(), Images.ImagesRadiobtnChecked.getName(),
            {font: 'Arial Black', fontSize: 17, fontWeight: 'bold'},false,2);

        const radioGroup = new DC.Input.RadioGroupButton(g, radioParameters, radioConfiguration);
    }

}
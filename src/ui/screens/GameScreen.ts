import PhaserTextStyle = Phaser.PhaserTextStyle;
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
    public static SOME_VALUE : number;
    private exampleStyle : PhaserTextStyle = {
        align: 'center', font: 'Arial Black', fontSize: 35,
        fontWeight: 'bold', stroke: '#c4caff', strokeThickness: 6, fill: '#13d673'
    };
    constructor(g) {
        super(g);
        console.log('CREATE');
        this.game.stage.backgroundColor = '#13d673';

        let chBoxParameters = new CheckBoxParameters(100,100);
        let chBoxConfiguration = new CheckBoxConfiguration(50,50,
            new LabelConfiguration("CheckBox Example",{font: 'Arial Black', fontSize: 17, fontWeight: 'bold'}),
            Images.ImagesUnchecked.getName(),
            Images.ImagesChecked.getName(),new Form(true));
        const checkBox = new DC.Input.CheckBox(g,chBoxParameters,chBoxConfiguration);
        let inputParameters = new InputParameters(50,200);
        let inputConfiguration = new InputConfiguration(300,30,650,18,
            '','',InputType.NUMBER);
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

        //by default distance is 50
        let radioParameters = new RadioParameters(400,50,70);
        let radioConfiguration = new RadioConfiguration(50,50,1,1,['Milk','Meat','Bread','Egg','etc'],
            Images.ImagesRadiobtnUnchecked.getName(), Images.ImagesRadiobtnChecked.getName(),
            {font: 'Arial Black', fontSize: 17, fontWeight: 'bold'},false,2);
        const radioGroup = new DC.Input.RadioGroupButton(g, radioParameters, radioConfiguration);


    }

}
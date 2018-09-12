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
import {SelectParameters} from "../Elements/Select/SelectParameters";
import {SelectConfiguration} from "../Elements/Select/SelectConfiguration";


export class GameScreen extends Phaser.Group {

    constructor(g) {
        super(g);
        console.log('CREATE');
        this.game.stage.backgroundColor = '#00aa8a';
        this.initPlugins(g);
    }

    private initPlugins(g : Phaser.Game) : void {
        this.initCheckBox(g);
        this.initInput(g);
        this.initRadioButtons(g);
        this.initSelectPlugin(g);
    }

    private initCheckBox(g : Phaser.Game) : void {
        //CheckBox
        let chBoxParameters = new CheckBoxParameters(350,100);
        let chBoxConfiguration = new CheckBoxConfiguration(50,50,
            new LabelConfiguration("CheckBox Example",{font: 'Arial Black', fontSize: 17, fontWeight: 'bold'}),
            Images.ImagesUnchecked.getName(),
            Images.ImagesChecked.getName(),new Form(true));

        const checkBox = new DC.Input.CheckBox(g,chBoxParameters,chBoxConfiguration);
    }

    private initInput(g : Phaser.Game) : void {
        //Input
        let inputParameters = new InputParameters(300,200);
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
        const radioParameters = new RadioParameters(650,50,70);
        const radioConfiguration = new RadioConfiguration(50,50,1,1,['Milk','Meat','Bread','Egg','etc'],
            Images.ImagesRadiobtnUnchecked.getName(), Images.ImagesRadiobtnChecked.getName(),
            {font: 'Arial Black', fontSize: 17, fontWeight: 'bold'},false,2);

        const radioGroup = new DC.Input.RadioGroupButton(g, radioParameters, radioConfiguration);
    }

    private initSelectPlugin(g : Phaser.Game) {
        const selectParam = new SelectParameters(50,100);
        //fontAndOtherSize is lower then height with 10
        const selectConfig = new SelectConfiguration(150,32,
            ['McLaren is a best car','Mercedes-Benz is a car','Lamborghini', 'BMW', 'Opel', 'Mitsubishi', 'Nissan','Kia','Ford','Peugeot'],
            // ['Petrosyan','Movsisyan','Baghdasaryan','Karapetyan','Levonyan','Khachatyan','Sevoyan'],
            ['McL Value',"Mers Value","Lambo Value","BMW Value", "Opel Value", "Mitsubishi Value", "Nissan Value", "Kia Value", "Ford Value", "Peugeot Value"],

            25,200,1);

        const selectPg = new DC.Input.SelectPlugin(g, selectParam, selectConfig);
    }

}
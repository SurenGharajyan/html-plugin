import {DC} from "../Elements/htmlPlugin";
import {TextConfigurations} from "../Elements/Select/TextConfigurations";
import {InputType} from "../Elements/Input/enums/InputType";
import {JSON as JSONAssets} from '../../assets';

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
        const checkBox = new DC.Input.CheckBox(g, {
            x : 500,
            y : 20,
        });
    }

    private initInput(g : Phaser.Game) : void {
        DC.Input.addInput(g,{
            x : 100,
            y : 250,
            width: 400,
            inputType: InputType.TEXT
        });
    }

    private initRadioButtons(g : Phaser.Game) : void {
        const radioGroup = new DC.Input.RadioGroupButton(g, {
            x : 500,
            y : 350,
			label: ['a','b','c']
        });
    }

    private initSelectPlugin(g : Phaser.Game) : void {
        const selectPg = new DC.Input.SelectPlugin(g,{
            x: 200,
            y: 100,
            textConfiguration : new TextConfigurations(
                this.getNames(),
				this.getNames()
                ),
		// 	['McLaren','Mercedes-Benz','Lamborghini', 'BMW', 'Opel', 'Mitsubishi', 'Nissan','Kia','Ford','Peugeot'],
		// 	["McLaren value", 'Mercedes-Benz value', 'Lamborghini value', 'BMW value',
		// 	'Opel value','Mitsubishi value', 'Nissan value','Kia value','Ford value','Peugeot value']

            //label : ['McLaren','Mercedes-Benz','Lamborghini', 'BMW', 'Opel', 'Mitsubishi', 'Nissan','Kia','Ford','Peugeot'],
            // ["Restaurant country", 'Restaurant city', 'Restaurant street', 'Restaurant complement',
            // 'Restaurant state', 'Restaurant neighborhood', 'Restaurant number', 'Restaurant zip code'],
            heightOfShowingSpace : 300,
            default : 4
        });
    }

	private getNames(): string[] {
		let names: string[] = [];
		let cacheText = this.game.cache.getJSON(JSONAssets.JsonNames.getName());
		cacheText.forEach((current) => {
			names.push(current);
		});
		return names;
	}
}
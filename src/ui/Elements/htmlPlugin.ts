import {CheckBoxParameters} from "./CheckBox/CheckBoxParameters";
import {CheckBoxConfiguration} from "./CheckBox/CheckBoxConfiguration";
import {RadioParameters} from "./RadioGroup/RadioParameters";
import {RadioConfiguration} from "./RadioGroup/RadioConfiguration";
import {InputConfiguration} from "./Input/InputConfiguration";
import {InputParameters} from "./Input/InputParameters";
import {Images} from "../../assets";

export namespace DC {
    export namespace Input {

        export class CheckBox extends Phaser.Group {
            private checkBoxText: Phaser.Text;
            private checkBoxBackGround: Phaser.Sprite;
            private checkBoxImage: Phaser.Sprite;
            private checkBoxImageGroup: Phaser.Group;

            constructor(g : Phaser.Game, param: CheckBoxParameters, config: CheckBoxConfiguration) {
                super(g);
                this.init(param, config);
            }

            private init(param: CheckBoxParameters, config: CheckBoxConfiguration) {
                this.initCheckBoxSystem(param, config);
                this.initEvents(config);
            }

            private initCheckBoxSystem(parameter: CheckBoxParameters, configuration: CheckBoxConfiguration) {
                this.initCheckBoxGroup(parameter);
                this.initChBoxText(configuration);
                this.initChBoxImg(configuration)
            }

            private initCheckBoxGroup(parameter : CheckBoxParameters) {
                this.checkBoxImageGroup = this.game.add.group(this);
                this.checkBoxImageGroup.x = parameter.x;
                this.checkBoxImageGroup.y = parameter.y;
            }

            private initChBoxText(config: CheckBoxConfiguration): void {
                if(!config.label) return;
                this.checkBoxText = this.game.add.text(
                    0, 0, config.label.value, config.label.style, this.checkBoxImageGroup
                );
            }

            private initChBoxImg(config: CheckBoxConfiguration) {
                let chBoxX = 0;
                let chBoxY = 0;
                if (config.label && config.label.value.length > 0) {
                    chBoxX = this.checkBoxText.width + 10;
                    chBoxY = this.checkBoxText.height / 2;
                }
                this.checkBoxBackGround = this.game.add.sprite(chBoxX, chBoxY, config.background,
                    null, this.checkBoxImageGroup);
                this.checkBoxImage = this.game.add.sprite(chBoxX, chBoxY, config.foreground,
                    null, this.checkBoxImageGroup);
                this.checkBoxBackGround.addChild(this.checkBoxImage);
                this.checkBoxImage.visible = config.form.checked;

                this.checkBoxBackGround.width = this.checkBoxImage.width = config.width;
                this.checkBoxBackGround.height = this.checkBoxImage.height = config.height;

                this.checkBoxImage.x = this.checkBoxBackGround.width / 2;
                this.checkBoxImage.y = this.checkBoxBackGround.height / 2;
                this.checkBoxImage.anchor.setTo(0.5);

                this.checkBoxText.y = this.checkBoxBackGround.height / 2;
                this.checkBoxBackGround.inputEnabled = true;
            }

            private initEvents(config: CheckBoxConfiguration): void {
                this.checkBoxBackGround.events.onInputDown.add(this.chBoxStatus.bind(this, config), this)
            }

            private chBoxStatus(configuration): void {
                configuration.form.checked = !configuration.form.checked;
                this.checkBoxImage.visible = configuration.form.checked;

                //TODO must be changed!
                this.checkBoxImage.width = configuration.width;
                this.checkBoxImage.height = configuration.height;
            }
        }

        export class RadioGroupButton extends Phaser.Group {
            private _selected : number;
            private radioButtonPGroup: Phaser.Group;
            private radioButtonText : Phaser.Text;
            private radioButtonBackground : Phaser.Sprite;
            private radioButtonForeground : Phaser.Sprite;
            private radioButtonsUnchecked : Phaser.Sprite[] = [];
            private radioButtonsChecked : Phaser.Sprite[] = [];

            constructor(g : Phaser.Game, parameter : RadioParameters, configuration : RadioConfiguration) {
                super(g);
                this.init(parameter, configuration);
            }

            private init(parameter : RadioParameters, configuration : RadioConfiguration) : void {
                this.initRadioButtonGroup(parameter, configuration);
                this.initEvents(configuration);
                this.selected = configuration.byDefChecked;
            }

            private initRadioButtonGroup(parameter : RadioParameters, config : RadioConfiguration ) {
                if(config.label.length != 0) {
                    for (let i = 0; i < config.label.length; i++) {
                        this.radioButtonPGroup = this.game.add.group(this);
                        this.radioButtonPGroup.x = parameter.x;
                        this.radioButtonPGroup.y = parameter.y + parameter.distanceBetween * i;
                        this.initRadioButtonImg(config, i);
                        this.initRadioButtonText(config,i);
                        this.initEvents(config)
                    }
                }
            }

            private initRadioButtonText(config : RadioConfiguration,index? : number): void {
                this.radioButtonText = this.game.add.text(
                    0, 0, config.label[index], config.textStyle, this.radioButtonPGroup
                );
                let chBoxX = this.radioButtonBackground.width + 10;
                let chBoxY = this.radioButtonBackground.height / 2 - this.radioButtonText.height / 2;
                this.radioButtonText.x = chBoxX;
                this.radioButtonText.y = chBoxY;
            }

            private initRadioButtonImg(config : RadioConfiguration,index : number) {
                this.radioButtonBackground = this.game.add.sprite(0, 0, config.background,
                    null, this.radioButtonPGroup);
                this.radioButtonBackground.width = config.width;
                this.radioButtonBackground.height = config.height;
                this.radioButtonBackground.scale.setTo(config.scaleX,config.scaleY);
                this.radioButtonBackground.inputEnabled = true;

                this.radioButtonForeground = this.game.add.sprite(0, 0, config.foreground,
                    null, this.radioButtonPGroup);
                this.radioButtonForeground.visible = (index == config.byDefChecked);

                this.radioButtonBackground.width = this.radioButtonForeground.width = config.width;
                this.radioButtonBackground.height = this.radioButtonForeground.height = config.height;

                this.radioButtonForeground.x = this.radioButtonBackground.width * config.scaleX;
                this.radioButtonForeground.y = this.radioButtonBackground.height * config.scaleY;
                this.radioButtonForeground.anchor.setTo(1);

                this.radioButtonBackground.scale.setTo(config.scaleX,config.scaleY);
                this.radioButtonForeground.scale.setTo(config.scaleX,config.scaleY);
                this.radioButtonForeground.inputEnabled = true;

            }

            private initEvents(config : RadioConfiguration): void {
                this.radioButtonBackground.events.onInputDown.add(this.radioButtonStatus.bind(this,this.radioButtonText,config), this);
                this.radioButtonsUnchecked.push(this.radioButtonBackground);
                this.radioButtonsChecked.push(this.radioButtonForeground)

            }

            private radioButtonStatus(radioButtonText,configuration) : void {
                for (let i = 0; i < configuration.label.length ; i++) {
                    if (configuration.label[i] == radioButtonText.text) {
                        this.selected = i;
                        this.radioButtonsChecked[i].visible = true;
                    } else {
                        this.radioButtonsChecked[i].visible = false;
                    }
                }
            }

            public set selected(i : number) {
                this._selected = i;
            }

            public get selected() : number {
                return this._selected;
            }
        }

        export class InputArea extends Phaser.Group {
            protected inputGroup : Phaser.Group;
            protected spriteBorder : Phaser.Sprite;
            protected spriteInpArea : Phaser.Sprite;
            protected line : Phaser.Graphics;
            protected maskTxt : Phaser.Graphics;
            protected textInput : Phaser.Text;
            protected textFocusing : Phaser.Text;
            protected placeHolder : Phaser.Text;
            protected backSpaceKey : Phaser.Key;
            protected leftKey : Phaser.Key;
            protected rightKey : Phaser.Key;
            protected enterKey : Phaser.Key;
            protected timeBlink : Phaser.TimerEvent;
            protected timeStop;
            protected textValue : string;
            protected distAllElSync : number;
            protected longPressWithCount : number = 0;
            protected linePositionIndex : number = 0;
            protected isLineIndexChanged : boolean;
            protected isLengthBig : boolean;
            protected isFocused : boolean;
            protected isDoubleClick : boolean;

            protected configuration : InputConfiguration;

            constructor(g : Phaser.Game, param : InputParameters, config : InputConfiguration) {
                super(g);
                this.configuration = config;
                this.init(param);
            }

            protected init(param : InputParameters) : void {
                this.initInputGroup(param);
                this.initInputSprites();
                this.initText();
                this.initElementPositioning();
                this.initEvents();
            }

            protected initInputGroup(param : InputParameters) : void {
                this.inputGroup = this.game.add.group(this);
                this.inputGroup.x = param.x;
                this.inputGroup.y = param.y;
            }

            protected initInputSprites() : void {
                this.spriteBorder = this.game.add.sprite(0, 0, Images.ImagesInputBorderColor.getName(),
                    null, this.inputGroup);
                this.spriteBorder.width = this.configuration.width;
                this.spriteBorder.height = this.configuration.height;
                this.spriteBorder.visible = false;
                this.distAllElSync = 2;
                this.spriteInpArea = this.game.add.sprite(this.distAllElSync, this.distAllElSync, Images.ImagesInputArea.getName(),
                    null, this.inputGroup);

                this.spriteInpArea.width = this.configuration.width - 2 * this.distAllElSync;
                this.spriteInpArea.height = this.configuration.height - 2 * this.distAllElSync;
                this.spriteInpArea.inputEnabled = true;
                this.initLine(this.distAllElSync);

            }

            protected initText() : void {
                this.textInput = this.game.add.text( 2 * this.distAllElSync,
                    this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                    '', {fontSize: this.configuration.size}, this.inputGroup);
                            //this.lineEndY - this.lineStartY
                if (this.configuration.placeHolderValue != '') {
                    this.placeHolder = this.game.add.text(2 * this.distAllElSync,
                        this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                        this.configuration.placeHolderValue, {
                            fontSize: this.configuration.size,
                            fill: '#b0b0b0'
                        }, this.inputGroup);
                    if (this.textInput.text.length > 0) {
                        this.placeHolder.visible = false;
                    }
                }
                this.textFocusing = this.game.add.text(2 * this.distAllElSync,
                    this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                    '', {fontSize: this.configuration.size}, this.inputGroup);


                this.textFocusing.visible = false;


                this.textValue = this.textInput.text;
                this.initMask();
            }

            protected initElementPositioning() {
                if (this.textFocusing.text.length > 0 ) {
                    this.linePositionIndex = this.textFocusing.text.length;
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }
                if (this.textInput.width > this.spriteInpArea.width) {
                    this.textInput.x = this.spriteInpArea.width - this.textInput.width;
                    this.textFocusing.x = this.spriteInpArea.width - this.textInput.width;
                    this.line.x = this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync;
                }
            }

            protected initMask() : void {
                this.maskTxt = this.game.add.graphics(this.inputGroup.x, this.inputGroup.y, this);
                this.maskTxt.beginFill(0x000);
                this.maskTxt.drawRect(this.distAllElSync, this.distAllElSync, this.spriteInpArea.width, this.spriteInpArea.height);
                this.textInput.mask = this.maskTxt;
                this.maskTxt.endFill();
            }

            protected initEvents() : void {
                this.game.input.onTap.add(this.onFocusInputArea.bind(this,this.configuration), this);
                this.spriteInpArea.events.onInputDown.add(this.onClickInput, this);
                this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                this.leftKey.onUp.add(this.onUpFewKeys,this);
                this.leftKey.onDown.add(this.leftDown,this);
                this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                this.rightKey.onUp.add(this.onUpFewKeys,this);
                this.rightKey.onDown.add(this.rightDown,this);
                this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                this.enterKey.onDown.add(this.enterDown,this);

            }

            protected leftDown() : void {
                this.isLineIndexChanged = true;
                this.game.time.events.pause();
                let initialTextWidth = this.textFocusing.width;
                this.textFocusing.text = this.textFocusing.text.slice(0,this.linePositionIndex - 1);
                let finalTextWidth = this.textFocusing.width;
                if ((this.textFocusing.x + this.textFocusing.width) > this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync ) {
                    this.line.x = this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync;
                } else {
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }
                //TODO algorithm not done
                if (this.linePositionIndex > 0) {
                    if (this.line.x <= 2 * this.distAllElSync) {
                        if (this.textFocusing.x < 0) {
                            this.textInput.x -= finalTextWidth - initialTextWidth;
                            this.textFocusing.x -= finalTextWidth - initialTextWidth;
                        }else {
                            this.textInput.x = 2 * this.distAllElSync;
                            this.textFocusing.x = 2 * this.distAllElSync;
                        }
                    }
                    --this.linePositionIndex;
                }
                if (this.game.time.events.paused) {
                    this.line.visible = true;
                    this.initRecreateBlinkTimer();
                }
            }

            protected rightDown() : void {
                this.isLineIndexChanged = true;
                this.game.time.events.pause();
                let initialTextWidth = this.textFocusing.width;
                this.textFocusing.text = this.textFocusing.text =  [
                    this.textFocusing.text.slice(0, this.linePositionIndex),
                    this.textInput.text.charAt(this.linePositionIndex)
                ].join('');
                let finalTextWidth = this.textFocusing.width;
                //TODO
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                if (this.linePositionIndex < this.textInput.text.length) {
                    if (this.line.x >= this.textFocusing.x + this.textFocusing.width) {
                        if (this.textFocusing.x + this.textFocusing.width > this.spriteInpArea.x + this.spriteInpArea.width) {
                            this.textInput.x += initialTextWidth - finalTextWidth;
                            this.textFocusing.x += initialTextWidth - finalTextWidth;
                        } else {
                            if (this.line.x < this.spriteInpArea.x && this.line.x > this.textInput.x + this.textInput.width) {
                                this.textInput.x = 2 * this.distAllElSync;
                                this.textFocusing.x = 2 * this.distAllElSync;
                            }
                        }
                        //TODO Problem with line x position when it position take a spriteInput Area end.
                        this.line.x = this.textFocusing.x + this.textFocusing.width;
                        // this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync;
                    }
                    ++this.linePositionIndex;
                }
                if (this.game.time.events.paused) {
                    this.line.visible = true;
                    this.initRecreateBlinkTimer();

                }
            }

            protected enterDown() : void {
                this.removeFocus();
            }

            protected onClickInput(input,pointer) : void {
                if (this.isFocused) {
                    this.textInput.setStyle(pointer.msSinceLastClick < this.game.input.doubleTapRate
                        ? {fontSize: this.configuration.size, backgroundColor: '#3390ff', fill: '#ffffff'}
                        : {fontSize: this.configuration.size});
                    this.isDoubleClick = (pointer.msSinceLastClick < this.game.input.doubleTapRate);
                    let inputPositionClickX = this.game.input.mousePointer.x - this.inputGroup.x - input.x;
                    if (this.textInput.text.length > 0) {
                        this.line.x = this.getCharPosition(inputPositionClickX);
                    }else {
                        this.line.x = this.distAllElSync;
                    }
                }
            }

            protected getCharPosition(inputClickedPos : number) {
                this.textFocusing.text = '';
                this.textFocusing.visible = false;
                let x : number;
                let i : number;
                //if text out of bounds from input area
                //61 is count of '.', that can fit in input area
                // i = this.textInput.text.length >= 61 ? this.textInput.text.length - 61 : 0;
                i = 0;
                for ( ; i < this.textInput.text.length; i++) {
                    if (this.textFocusing.width - this.textFocusing.x <= inputClickedPos && this.textInput.x == 2 * this.distAllElSync) {
                        x = this.textFocusing.x + this.textFocusing.width;
                        this.linePositionIndex = i;
                        console.log("1 if");
                    } else if (this.textInput.x < 2 * this.distAllElSync) {
                        //TODO x have an other value. This value is not correct and linePositionIndex too
                        x = this.textFocusing.x + this.textFocusing.width;
                        this.linePositionIndex = this.textInput.text.length;
                        console.log("INCORRECT 1 else");
                    }

                    // if last position is clicked
                    if (this.textInput.x + this.textInput.width <= inputClickedPos && this.textInput.x == 2 * this.distAllElSync) {
                        x = this.textInput.x + this.textInput.width;
                        this.linePositionIndex = this.textInput.text.length;
                        console.log("2 if");
                    }
                    this.textFocusing.text += this.textInput.text.charAt(i);
                }
                this.isLineIndexChanged = true;
                //for right and left click
                let textInThisPos : string = '';
                for (let j = 0; j < this.linePositionIndex ; j++) {
                    textInThisPos += this.textInput.text.charAt(j);
                }
                this.textFocusing.text = textInThisPos;
                if (this.textInput.text.length == 0 ) {
                    this.line.x = this.spriteInpArea.worldPosition.x;
                }
                return x;
            }

            protected onFocusInputArea() : void {
                if ((this.spriteInpArea.getBounds()
                    .contains(this.game.input.mousePointer.x, this.game.input.mousePointer.y))
                ) {
                    this.isFocused = true;

                    if (this.timeBlink == null) {
                        this.timeBlink = this.game.time.events.loop(this.configuration.blinkingSpeed, this.toggleLineVisibility, this);
                    }
                    this.spriteBorder.visible = true;
                        this.game.input.keyboard.addCallbacks(this, null, null, this.anyKeyPressed);

                    this.backSpaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
                    this.backSpaceKey.onDown.add(this.deleteText, this);
                    this.backSpaceKey.onUp.add(this.onUpFewKeys,this);
                } else {
                    this.removeFocus();
                }

            }

            protected removeFocus() : void {
                this.textInput.setStyle({fontSize: this.configuration.size});
                this.isFocused = false;
                this.game.time.events.remove(this.timeBlink);
                this.spriteBorder.visible = false;
                this.line.visible = false;
                this.timeBlink = null;
            }

            protected onUpFewKeys() : void {
                this.longPressWithCount = 0;
            }

            protected checkDeleteAll() : void {
                if (!this.isDoubleClick) return;
                this.textInput.text = this.textFocusing.text = '';
                this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;
                this.textInput.setStyle({fontSize: this.configuration.size,});
                this.line.x = this.textInput.x + this.textInput.width;
                this.isDoubleClick = false;
            }

            protected anyKeyPressed(char : string) : void {
                if (!this.isFocused) return;
                let initialTextWidth : number;
                let finalTextWidth : number;
                    this.checkDeleteAll();
                    this.game.time.events.pause();
                this.line.visible = true;
                initialTextWidth = this.textInput.width;

                this.textInput.text = this.textFocusing.text = [
                    this.textInput.text.slice(0, this.linePositionIndex),
                    char,
                    this.textInput.text.slice(this.linePositionIndex)
                ].join('');

                    if (this.placeHolder != null) {
                        this.placeHolder.visible = this.textInput.text.length == 0;
                    }
                finalTextWidth = this.textInput.width;

                    if (!this.isLineIndexChanged) {
                        this.line.x = this.textInput.x + this.textInput.width;
                        this.linePositionIndex = this.textInput.text.length;
                    }
                    else {
                        if (this.linePositionIndex == this.textInput.text.length){
                            this.isLineIndexChanged = false;
                        }
                        this.linePositionIndex += 1;
                        this.line.x += finalTextWidth - initialTextWidth;
                    }

                    if (this.line.x >= this.spriteInpArea.width) {
                        //TODO if you can, add dynamic position from character
                            this.line.x = this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync;
                            this.textInput.x -= finalTextWidth - initialTextWidth;
                            this.textFocusing.x -= finalTextWidth - initialTextWidth;
                    }
                this.initRecreateBlinkTimer();
            }

            protected deleteText() : void {
                if (!this.isFocused) return;
                let initialTextWidth : number;
                let finalTextWidth : number;
                this.line.visible = true;
                this.checkDeleteAll();
                this.game.time.events.pause();
                initialTextWidth = this.textInput.width;



                this.textInput.text = this.textFocusing.text = [
                        this.textInput.text.slice(0,  Math.max(0, this.linePositionIndex - 1)),
                        this.textInput.text.slice(this.linePositionIndex)
                    ].join('');

                if (this.placeHolder != null) {
                    this.placeHolder.visible = this.textInput.text.length == 0;
                }

                finalTextWidth = this.textInput.width;

                this.linePositionIndex = Math.max(0, --this.linePositionIndex);

                if (this.textInput.width < this.spriteInpArea.width || this.textInput.x >= 0) {
                    let textXBeforeChange = this.textInput.x;
                    this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;

                    // this if work for put line in correct x. If you remove this if then position will be wrong
                    if (this.isLengthBig) {
                        this.isLengthBig = false;
                        this.line.x -= textXBeforeChange - this.textInput.x;
                    }
                    this.line.x -= initialTextWidth - finalTextWidth;
                } else {
                    this.isLengthBig = true;
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                }
                this.initRecreateBlinkTimer();
            }

            protected initRecreateBlinkTimer() : void {
                if (this.timeStop != null) {
                    clearTimeout(this.timeStop);
                }
                this.timeStop = setTimeout(() => {
                    this.game.time.events.add(200, () => {}, this);
                    this.game.time.events.resume();
                },500);
            }

            protected toggleLineVisibility() : void {
                this.line.visible = !this.line.visible;
            }

            protected initLine(linePosition: number) : void {
                this.line = this.game.add.graphics(
                    this.spriteInpArea.worldPosition.x + 2 * linePosition,
                    0, this.inputGroup);
                this.line.lineStyle(1, 0x000000);
                this.line.moveTo(0, 0);
                this.line.lineTo(
                    this.spriteInpArea.worldPosition.x,
                    this.configuration.size
                );
                this.line.y = this.spriteInpArea.centerY - this.line.height / 2;

                this.line.visible = false;
            }

            public  update() : void {
                if (this.backSpaceKey != null && this.backSpaceKey.isDown){
                    this.longPressWithCount++;
                    if (this.longPressWithCount > 30) {
                        this.deleteText();
                    }
                }
                if (this.leftKey != null && this.leftKey.isDown) {
                    this.longPressWithCount++;
                    if (this.longPressWithCount > 30) {
                        this.leftDown();
                    }
                }

                if (this.rightKey != null && this.rightKey.isDown) {
                    this.longPressWithCount++;
                    if (this.longPressWithCount > 30) {
                        this.rightDown();
                    }
                }
                if (this.line.x < this.spriteInpArea.x + this.distAllElSync) {
                    this.line.x = this.spriteInpArea.x + this.distAllElSync;
                }
            }

        }

        export class InputNumber extends InputArea{
            private arrowGroup : Phaser.Group;
            private arrowUpNum : Phaser.Sprite;
            private arrowDownNum : Phaser.Sprite;
            private whiteBgNum : Phaser.Sprite;

            constructor(g : Phaser.Game, param : InputParameters, config : InputConfiguration) {
                super(g,param, config);
                this.initNumberClass();
            }

            protected initNumberClass() : void {
                this.initNumberSubjects();
                this.initEventsNumber();
            }

            private  initNumberSubjects() {
                this.spriteInpArea.width = this.configuration.width - this.configuration.size - 2 * this.distAllElSync;
                this.whiteBgNum = this.game.add.sprite(this.spriteInpArea.x + this.spriteInpArea.width,
                    this.distAllElSync, Images.ImagesInputArea.getName(),null,this.inputGroup);

                this.arrowGroup = this.game.add.group(this.inputGroup);
                this.arrowGroup.x = this.spriteInpArea.x + this.spriteInpArea.width;

                this.arrowUpNum = this.game.add.sprite(0,
                    0, Images.ImagesUp.getName(),null, this.arrowGroup);

                this.arrowDownNum = this.game.add.sprite(0,
                    this.arrowUpNum.y + this.configuration.size / 2, Images.ImagesDown.getName(),null, this.arrowGroup);

                this.arrowUpNum.width = this.arrowUpNum.height = this.arrowDownNum.width = this.arrowDownNum.height
                    = this.configuration.size;

                this.arrowGroup.y = this.spriteInpArea.centerY - this.arrowGroup.height / 2;

                this.whiteBgNum.width = this.arrowUpNum.width;
                this.whiteBgNum.height = this.spriteInpArea.height;

                this.arrowUpNum.inputEnabled = this.arrowDownNum.inputEnabled = true;
                this.arrowGroup.visible = false;
            }

            protected initText() : void {
                this.textInput = this.game.add.text( 2 * this.distAllElSync,
                    this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                    '', {fontSize: this.configuration.size}, this.inputGroup);

                this.textInput.text = this.configuration.textValue;

                if (this.configuration.placeHolderValue != '') {
                    this.placeHolder = this.game.add.text(2 * this.distAllElSync,
                        this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                        this.configuration.placeHolderValue, {
                            fontSize: this.configuration.size,
                            fill: '#b0b0b0'
                        }, this.inputGroup);
                    if (this.textInput.text.length > 0) {
                        this.placeHolder.visible = false;
                    }
                }
                this.textFocusing = this.game.add.text(2 * this.distAllElSync,
                    this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                    '', {fontSize: this.configuration.size}, this.inputGroup);

                this.textFocusing.text = this.configuration.textValue;

                this.textFocusing.visible = false;

                this.textInput.y = this.textFocusing.y = this.line.y;

                this.textValue = this.textInput.text;
                this.initMask();

            }

            protected anyKeyPressed(char) : void {
                if (!this.isFocused) return;
                let initialTextWidth : number;
                let finalTextWidth : number;
                this.checkDeleteAll();
                this.game.time.events.pause();
                this.line.visible = true;
                initialTextWidth = this.textInput.width;


                for (let i = 0; i < 10; i++) {
                    if (char == i.toString() || char == '-' || char == '+') {
                        break;
                    }
                    if (i == 9) {
                        //if noting from this values
                        char = '';
                    }
                }

                this.textInput.text = this.textFocusing.text = [
                    this.textInput.text.slice(0, this.linePositionIndex),
                    char,
                    this.textInput.text.slice(this.linePositionIndex)
                ].join('');

                if (this.placeHolder != null) {
                    this.placeHolder.visible = this.textInput.text.length == 0;
                }
                finalTextWidth = this.textInput.width;

                if (!this.isLineIndexChanged) {
                    this.line.x = this.textInput.x + this.textInput.width;
                    this.linePositionIndex = this.textInput.text.length;
                }
                else {
                    if (this.linePositionIndex == this.textInput.text.length){
                        this.isLineIndexChanged = false;
                    }
                    this.linePositionIndex += 1;
                    this.line.x += finalTextWidth - initialTextWidth;
                }

                if (this.line.x >= this.spriteInpArea.width) {
                    // TODO if you can, add dynamic position from character
                    this.line.x = this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync;
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                }
                this.initRecreateBlinkTimer();

            }

            protected deleteText() : void {
                if (!this.isFocused) return;
                let initialTextWidth : number;
                let finalTextWidth : number;
                this.line.visible = true;
                this.checkDeleteAll();
                this.game.time.events.pause();
                initialTextWidth = this.textInput.width;


                this.textInput.text = this.textFocusing.text = [
                    this.textInput.text.slice(0,  Math.max(0, this.linePositionIndex - 1)),
                    this.textInput.text.slice(this.linePositionIndex)
                ].join('');

                if (this.placeHolder != null) {
                    this.placeHolder.visible = this.textInput.text.length == 0;
                }

                finalTextWidth = this.textInput.width;

                this.linePositionIndex = Math.max(0, --this.linePositionIndex);

                if (this.textInput.width < this.spriteInpArea.width || this.textInput.x >= 0) {
                    let textXBeforeChange = this.textInput.x;
                    this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;

                    // this if work for put line in correct x. If you remove this if then position will be wrong
                    if (this.isLengthBig) {
                        this.isLengthBig = false;
                        this.line.x -= textXBeforeChange - this.textInput.x;
                    }
                    this.line.x -= initialTextWidth - finalTextWidth;
                } else {
                    this.isLengthBig = true;
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                }
                this.initRecreateBlinkTimer();
            }

            protected onFocusInputArea() {
                if ((this.spriteInpArea.getBounds()
                    .contains(this.game.input.mousePointer.x, this.game.input.mousePointer.y))
                    || (this.arrowGroup.getBounds()
                        .contains(this.game.input.mousePointer.x, this.game.input.mousePointer.y)
                    )
                ) {
                    this.isFocused = true;

                    if (this.timeBlink == null) {
                        this.timeBlink = this.game.time.events.loop(this.configuration.blinkingSpeed, this.toggleLineVisibility, this);
                    }
                    this.spriteBorder.visible = true;
                    this.game.input.keyboard.addCallbacks(this, null, null, this.anyKeyPressed);

                    this.backSpaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
                    this.backSpaceKey.onDown.add(this.deleteText, this);
                    this.backSpaceKey.onUp.add(this.onUpFewKeys,this);
                } else {
                    this.removeFocus();
                }
                this.arrowGroup.visible = this.isFocused;

            }

            protected initEventsNumber() {
                this.arrowUpNum.events.onInputDown.add(this.upArrowClicked, this);
                this.arrowDownNum.events.onInputDown.add(this.downArrowClicked, this);
                this.whiteBgNum.events.onInputOver.add(this.arrowGroupShow, this);
                this.whiteBgNum.events.onInputOut.add(this.arrowGroupHide, this);
                this.spriteInpArea.events.onInputOver.add(this.arrowGroupShow, this);
                this.spriteInpArea.events.onInputOut.add(this.arrowGroupHide, this);
            }

            private arrowGroupShow() : void {
                this.arrowGroup.visible = true;
            }

            private arrowGroupHide() : void {
                if (!this.isFocused) {
                    this.arrowGroup.visible = false;
                }
            }

            private upArrowClicked() : void {
                this.convertAndReturn(true);
                this.frontZeroRemove();
            }

            private downArrowClicked() : void {
                this.convertAndReturn(false);
                this.frontZeroRemove();
            }

            private frontZeroRemove() : void {
                if (this.textInput.text.length > 1) {
                    if (this.textInput.text.charAt(0) == '0') {
                        let index: number = 0;
                        for (let i = 0; i < this.textInput.text.length; i++) {
                            if (this.textInput.text.charAt(i) == '0') {
                                index = i;
                                if (index == this.textInput.text.length - 1) {
                                    this.deleteZeros(index);
                                }
                            } else {
                                this.deleteZeros(index);
                                break;
                            }
                        }
                    }
                }
            }

            private convertAndReturn(addition : boolean){
                let numOfInput: number = parseInt(this.textInput.text);
                if (isNaN(numOfInput)) {
                    numOfInput = 0;
                }
                if (numOfInput <= Number.MAX_SAFE_INTEGER) {
                    if (addition) {
                        numOfInput++;
                    } else {
                        numOfInput--;
                    }
                    this.textInput.text = this.textFocusing.text = numOfInput.toString();
                }
                // let rememberTen : boolean;
                // let rememberMinusOne : boolean;
                // let countNine : number = 0;
                // let countMinusOne : number = 0;
                // addition = (this.textInput.text.charAt(0) == '-');
                //
                // for (let i = this.textInput.text.length - 1 ; i >= (addition ? 1 : 0) ; i--) {
                //
                //     let num : number = parseInt(this.textInput.text.charAt(i));
                //     if (rememberTen){
                //         if(addition) {
                //             num++;
                //         }else {
                //             num--;
                //         }
                //         console.log("rememberTen");
                //     }else if (rememberMinusOne) {
                //             if (addition) {
                //                 num++;
                //             } else {
                //                 num--
                //             }
                //         console.log("rememberMinusOne");
                //     } else {
                //         if (i == this.textInput.text.length - 1) {
                //             if (addition) {
                //                 num++;
                //             } else {
                //                 num--
                //             }
                //         }
                //     }
                //     if (num == 10) {
                //         this.textInput.text = this.textFocusing.text = this.replaceAt(this.textInput.text,i,'0');
                //         rememberTen = true;
                //         countNine++;
                //         if (countNine == this.textInput.text.length) {
                //             let textOfInput : string = this.textInput.text;
                //             for (let j = 0; j < textOfInput.length + 1; j++) {
                //                 if (j == 0) {
                //                     this.textInput.text = this.textFocusing.text = '1'
                //                 } else {
                //                     this.textInput.text = this.textFocusing.text += '0'
                //                 }
                //             }
                //         }
                //     } else if (num == -1) {
                //         this.textInput.text = this.textFocusing.text = this.replaceAt(this.textInput.text,i,'9');
                //         rememberMinusOne = true;
                //         countMinusOne++;
                //         if (countMinusOne == this.textInput.text.length) {
                //             let textOfInput : string  = this.textInput.text;
                //             for (let j = 0; j < textOfInput.length - 1; j++) {
                //
                //                 this.textInput.text = this.textFocusing.text = '9';
                //             }
                //         }
                //     } else {
                //         this.textInput.text = this.textFocusing.text = this.replaceAt(this.textInput.text,i,num.toString());
                //         rememberTen = false;
                //         rememberMinusOne = false;
                //     }
                //
                // }
                this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;
                this.linePositionIndex = this.textFocusing.text.length;
                this.line.x = this.textFocusing.x + this.textFocusing.width;
            }

            private replaceAt(string, index, replace) : string {
                return string.substring(0, index) + replace + string.substring(index + 1);
            }

            private deleteZeros(index : number) {
                this.textFocusing.text = this.textInput.text = [
                    this.textInput.text.slice(index + 1, this.textInput.text.length)
                ].join('');
                this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;
                this.linePositionIndex = this.textFocusing.text.length;
                this.line.x = this.textFocusing.x + this.textFocusing.width;
            }
        }

        export class InputPassword extends InputArea{

            protected anyKeyPressed(char : string) : void {
                if (!this.isFocused) return;
                let initialTextWidth : number;
                let finalTextWidth : number;
                this.checkDeleteAll();
                this.game.time.events.pause();
                this.line.visible = true;
                initialTextWidth = this.textInput.width;

                this.textValue = [
                    this.textValue.slice(0, this.linePositionIndex),
                    char,
                    this.textValue.slice(this.linePositionIndex)
                ].join('');
                console.log(this.textValue)
                char = '•';


                this.textInput.text = this.textFocusing.text = [
                    this.textInput.text.slice(0, this.linePositionIndex),
                    char,
                    this.textInput.text.slice(this.linePositionIndex)
                ].join('');

                if (this.placeHolder != null) {
                    this.placeHolder.visible = this.textInput.text.length == 0;
                }
                finalTextWidth = this.textInput.width;

                if (!this.isLineIndexChanged) {
                    this.line.x = this.textInput.x + this.textInput.width;
                    this.linePositionIndex = this.textInput.text.length;
                }
                else {
                    if (this.linePositionIndex == this.textInput.text.length){
                        this.isLineIndexChanged = false;
                    }
                    this.linePositionIndex += 1;
                    this.line.x += finalTextWidth - initialTextWidth;
                }

                if (this.line.x >= this.spriteInpArea.width) {
                    //TODO if you can, add dynamic position from character
                    this.line.x = this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync;
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                }
                this.initRecreateBlinkTimer();
            }

            protected deleteText() : void {
                if (!this.isFocused) return;
                let initialTextWidth : number;
                let finalTextWidth : number;
                this.line.visible = true;
                this.checkDeleteAll();
                this.game.time.events.pause();
                initialTextWidth = this.textInput.width;


                this.textValue = [
                    this.textValue.slice(0,  Math.max(0, this.linePositionIndex - 1)),
                    this.textValue.slice(this.linePositionIndex)
                ].join('');
                console.log("textVal = " + this.textValue);

                this.textInput.text = this.textFocusing.text = [
                    this.textInput.text.slice(0,  Math.max(0, this.linePositionIndex - 1)),
                    this.textInput.text.slice(this.linePositionIndex)
                ].join('');

                if (this.placeHolder != null) {
                    this.placeHolder.visible = this.textInput.text.length == 0;
                }

                finalTextWidth = this.textInput.width;

                this.linePositionIndex = Math.max(0, --this.linePositionIndex);

                if (this.textInput.width < this.spriteInpArea.width || this.textInput.x >= 0) {
                    let textXBeforeChange = this.textInput.x;
                    this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;

                    // this if work for put line in correct x. If you remove this if then position will be wrong
                    if (this.isLengthBig) {
                        this.isLengthBig = false;
                        this.line.x -= textXBeforeChange - this.textInput.x;
                    }
                    this.line.x -= initialTextWidth - finalTextWidth;
                } else {
                    this.isLengthBig = true;
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                }
                this.initRecreateBlinkTimer();
            }
        }

    }
}
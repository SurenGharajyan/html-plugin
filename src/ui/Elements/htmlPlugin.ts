import {Images} from '../../assets';
import {SelectScrollConfiguration} from './Select/scroll/SelectScrollConfiguration';
import {ScrollBar} from './Scroll/ScrollBar';
import {ScrollForSelect} from './Select/scroll/ScrollForSelect';
import {SelectorItem} from './Select/SelectorItem';
import {InputType} from './Input/enums/InputType';
import {LabelConfiguration} from './CheckBox/LabelConfiguration';
import {Form} from './common/Form';
import {PluginInterfaces} from './PluginInterface';
import {TextConfigurations} from './Select/TextConfigurations';
import {KeyboardManager} from './keyboard/KeyboardManager';
import {KeyboardAction} from './Input/enums/KeyboardAction';
import SelectConfigurations = PluginInterfaces.SelectConfigurations;
import CheckBoxConfigurations = PluginInterfaces.CheckBoxConfigurations;
import RadioGroupConfigurations = PluginInterfaces.RadioGroupConfigurations;
import InputConfigurations = PluginInterfaces.InputConfigurations;

export namespace DC {
    export namespace Input {

        export class CheckBox extends Phaser.Group {
            private checkBoxText: Phaser.Text;
            private checkBoxBackGround: Phaser.Sprite;
            private checkBoxImage: Phaser.Sprite;
            private checkBoxImageGroup: Phaser.Group;
            private readonly checkBoxSetting: any;

            constructor(g: Phaser.Game, checkBoxConfigurations?: CheckBoxConfigurations) {
                super(g);
                const checkBoxDefault: CheckBoxConfigurations = {
                    x: 0,
                    y: 0,
                    width: 40,
                    height: 40,
                    label: new LabelConfiguration('CheckBox Example',
                        {font: 'Arial Black', fontSize: 17, fontWeight: 'bold'}),
                    background: Images.ImagesUnchecked.getName(),
                    foreground: Images.ImagesChecked.getName(),
                    labelClick: false,
                    form: new Form(false)
                };
                this.checkBoxSetting = Object.assign({}, checkBoxDefault, checkBoxConfigurations);
                this.init();
            }

            private init() {
                this.initCheckBoxSystem();
                this.initEvents();
            }

            private initCheckBoxSystem() {
                this.initCheckBoxGroup();
                this.initChBoxText();
                this.initChBoxImg()
            }

            private initCheckBoxGroup() {
                this.checkBoxImageGroup = this.game.add.group(this);
                this.checkBoxImageGroup.x = this.checkBoxSetting.x;
                this.checkBoxImageGroup.y = this.checkBoxSetting.y;
            }

            private initChBoxText(): void {
                if (!this.checkBoxSetting.label) return;
                this.checkBoxText = this.game.add.text(
                    0, 0, this.checkBoxSetting.label.value, this.checkBoxSetting.label.style, this.checkBoxImageGroup
                );
            }

            private initChBoxImg() {
                let chBoxX = 0;
                let chBoxY = 0;
                if (this.checkBoxSetting.label && this.checkBoxSetting.label.value.length > 0) {
                    chBoxX = this.checkBoxText.width + 10;
                    chBoxY = this.checkBoxText.height / 2;
                }
                this.checkBoxBackGround = this.game.add.sprite(chBoxX, chBoxY, this.checkBoxSetting.background,
                    null, this.checkBoxImageGroup);
                this.checkBoxImage = this.game.add.sprite(chBoxX, chBoxY, this.checkBoxSetting.foreground,
                    null, this.checkBoxImageGroup);
                this.checkBoxImage.visible = this.checkBoxSetting.form.checked;

                this.checkBoxBackGround.width = this.checkBoxImage.width = this.checkBoxSetting.width;
                this.checkBoxBackGround.height = this.checkBoxImage.height = this.checkBoxSetting.height;


                this.checkBoxText.y = this.checkBoxBackGround.height / 2;
                this.checkBoxBackGround.inputEnabled = true;
            }

            private initEvents(): void {
                this.checkBoxBackGround.events.onInputDown.add(this.chBoxStatus.bind(this, this.checkBoxSetting), this);
                if (this.checkBoxSetting.labelClick) {
                    this.checkBoxText.events.onInputDown.add(this.chBoxStatus.bind(this, this.checkBoxSetting), this);
                    this.checkBoxText.inputEnabled = true;

                }

            }

            private chBoxStatus(): void {
                this.checkBoxSetting.form.checked = !this.checkBoxSetting.form.checked;
                this.checkBoxImage.visible = this.checkBoxSetting.form.checked;

                this.checkBoxImage.width = this.checkBoxSetting.width;
                this.checkBoxImage.height = this.checkBoxSetting.height;
            }
        }

        export class RadioGroupButton extends Phaser.Group {
            private _selected: number;
            private radioButtonPGroup: Phaser.Group;
            private radioButtonText: Phaser.Text;
            private radioButtonBackground: Phaser.Sprite;
            private radioButtonForeground: Phaser.Sprite;
            private radioButtonsUnchecked: Phaser.Sprite[] = [];
            private radioButtonsChecked: Phaser.Sprite[] = [];
            private readonly radioButtonsSetting: any;

            constructor(g: Phaser.Game, radioGroupConfigurations?: RadioGroupConfigurations) {
                super(g);
                const radioDefault: RadioGroupConfigurations = {
                    x: 0,
                    y: 0,
                    distanceBetween: 70,
                    width: 50,
                    height: 50,
                    label: ['', ''],
                    background: Images.ImagesRadiobtnUnchecked.getName(),
                    foreground: Images.ImagesRadiobtnChecked.getName(),
                    textStyle: {font: 'Arial Black', fontSize: 17, fontWeight: 'bold'},
                    byDefChecked: null
                };
                this.radioButtonsSetting = Object.assign({}, radioDefault, radioGroupConfigurations);
                this.init();
            }

            private init(): void {
                this.initRadioButtonGroup();
                this.initEvents();
                this.selected = this.radioButtonsSetting.byDefChecked;
            }

            private initRadioButtonGroup() {
                if (this.radioButtonsSetting.label.length != 0) {
                    for (let i = 0; i < this.radioButtonsSetting.label.length; i++) {
                        this.radioButtonPGroup = this.game.add.group(this);
                        this.radioButtonPGroup.x = this.radioButtonsSetting.x;
                        this.radioButtonPGroup.y = this.radioButtonsSetting.y + this.radioButtonsSetting.distanceBetween * i;
                        this.initRadioButtonImg(i);
                        this.initRadioButtonText(i);
                        this.initEvents()
                    }
                }
            }

            private initRadioButtonText(index?: number): void {
                this.radioButtonText = this.game.add.text(
                    0, 0, this.radioButtonsSetting.label[index], this.radioButtonsSetting.textStyle, this.radioButtonPGroup
                );
                let chBoxX = this.radioButtonBackground.width + 10;
                let chBoxY = this.radioButtonBackground.height / 2 - this.radioButtonText.height / 2;
                this.radioButtonText.x = chBoxX;
                this.radioButtonText.y = chBoxY;
            }

            private initRadioButtonImg(index: number) {
                this.radioButtonBackground = this.game.add.sprite(0, 0, this.radioButtonsSetting.background,
                    null, this.radioButtonPGroup);
                this.radioButtonBackground.width = this.radioButtonsSetting.width;
                this.radioButtonBackground.height = this.radioButtonsSetting.height;
                this.radioButtonBackground.inputEnabled = true;

                this.radioButtonForeground = this.game.add.sprite(0, 0, this.radioButtonsSetting.foreground,
                    null, this.radioButtonPGroup);
                this.radioButtonForeground.visible = (index == this.radioButtonsSetting.byDefChecked);

                this.radioButtonBackground.width = this.radioButtonForeground.width = this.radioButtonsSetting.width;
                this.radioButtonBackground.height = this.radioButtonForeground.height = this.radioButtonsSetting.height;


                this.radioButtonForeground.inputEnabled = true;

            }

            private initEvents(): void {
                this.radioButtonBackground.events.onInputDown.add(this.radioButtonStatus.bind(this,
                    this.radioButtonBackground), this);
                this.radioButtonsUnchecked.push(this.radioButtonBackground);
                this.radioButtonsChecked.push(this.radioButtonForeground)

            }

            private radioButtonStatus(radioButtonBackground: Phaser.Sprite): void {
                for (let i = 0; i < this.radioButtonsSetting.label.length; i++) {
                    if (this.radioButtonsUnchecked[i] == radioButtonBackground) {
                        this.selected = i;
                        this.radioButtonsChecked[i].visible = true;
                    } else {
                        this.radioButtonsChecked[i].visible = false;
                    }
                }
            }

            public set selected(i: number) {
                this._selected = i;
            }

            public get selected(): number {
                return this._selected;
            }
        }

        export class InputArea extends Phaser.Group {
            protected inputGroup: Phaser.Group;
            protected spriteBorder: Phaser.Sprite;
            protected spriteInpArea: Phaser.Sprite;
            protected line: Phaser.Graphics;
            protected maskTxt: Phaser.Graphics;
            protected textInput: Phaser.Text;
            protected textFocusing: Phaser.Text;
            protected placeHolder: Phaser.Text;
            protected backSpaceKey: Phaser.Key;
            protected leftKey: Phaser.Key;
            protected rightKey: Phaser.Key;
            protected enterKey: Phaser.Key;
            protected timeBlink: Phaser.TimerEvent;
            protected timeStop;
            protected textValue: string;
            protected distAllElSync: number;
            protected longPressWithCount: number = 0;
            protected linePositionIndex: number = 0;
            protected isLineIndexChanged: boolean;
            protected isLengthBig: boolean;
            protected isFocused: boolean;
            protected isDoubleClick: boolean;
            protected isInputDown: boolean;
            protected inputConfigurationsInterface: InputConfigurations;

            constructor(g: Phaser.Game, inputConfigurationsInterface?: InputConfigurations) {
                super(g);
                this.inputConfigurationsInterface = inputConfigurationsInterface;
                this.init();
            }

            protected init(): void {
                this.initInputGroup();
                this.initInputSprites();
                this.initText();
                this.initElementPositioning();
                this.initEvents();
            }

            protected initInputGroup(): void {
                this.inputGroup = this.game.add.group(this);
                this.inputGroup.x = this.inputConfigurationsInterface.x;
                this.inputGroup.y = this.inputConfigurationsInterface.y;
            }

            protected initInputSprites(): void {
                this.spriteBorder = this.game.add.sprite(0, 0, Images.ImagesInputBorderColor.getName(),
                    null, this.inputGroup);
                this.spriteBorder.width = this.inputConfigurationsInterface.width;
                this.spriteBorder.height = this.inputConfigurationsInterface.height;
                this.spriteBorder.visible = false;
                this.distAllElSync = 2;
                this.spriteInpArea = this.game.add.sprite(this.distAllElSync, this.distAllElSync, Images.ImagesInputArea.getName(),
                    null, this.inputGroup);

                this.spriteInpArea.width = this.inputConfigurationsInterface.width - 2 * this.distAllElSync;
                this.spriteInpArea.height = this.inputConfigurationsInterface.height - 2 * this.distAllElSync;
                this.spriteInpArea.inputEnabled = true;
                this.initLine(this.distAllElSync);

            }

            protected initText(): void {
                this.textInput = this.game.add.text(2 * this.distAllElSync,
                    this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                    this.inputConfigurationsInterface.value,
                    {fontSize: this.inputConfigurationsInterface.fontSize}, this.inputGroup);
                if (this.inputConfigurationsInterface.placeHolder != '') {
                    this.placeHolder = this.game.add.text(2 * this.distAllElSync,
                        this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                        this.inputConfigurationsInterface.placeHolder, {
                            fontSize: this.inputConfigurationsInterface.fontSize,
                            fill: '#b0b0b0'
                        }, this.inputGroup);
                    if (this.textInput.text.length > 0) {
                        this.placeHolder.visible = false;
                    }
                    this.placeHolder.y = this.line.y;
                }
                this.textFocusing = this.game.add.text(2 * this.distAllElSync,
                    this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                    this.inputConfigurationsInterface.value,
                    {fontSize: this.inputConfigurationsInterface.fontSize}, this.inputGroup);

                this.textFocusing.y = this.textInput.y = this.line.y;

                this.textFocusing.visible = false;


                this.textValue = this.textInput.text;
                this.initMask();
            }

            protected initElementPositioning() {
                if (this.textFocusing.text.length > 0) {
                    this.linePositionIndex = this.textFocusing.text.length;
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }
                if (this.textInput.width > this.spriteInpArea.width) {
                    this.textInput.x = this.spriteInpArea.width - this.textInput.width;
                    this.textFocusing.x = this.spriteInpArea.width - this.textInput.width;
                    this.line.x = this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync;
                }
            }

            protected initMask(): void {
                this.maskTxt = this.game.add.graphics(this.inputGroup.x, this.inputGroup.y, this);
                this.maskTxt.beginFill(0x000);
                this.maskTxt.drawRect(this.distAllElSync, this.distAllElSync, this.spriteInpArea.width, this.spriteInpArea.height);
                this.textInput.mask = this.maskTxt;
                this.maskTxt.endFill();
            }

            protected initEvents(): void {
                this.game.input.onTap.add(this.onFocusInputArea.bind(this, this.inputConfigurationsInterface), this);
                this.spriteInpArea.events.onInputDown.add(this.onDownInput, this);
                this.spriteInpArea.events.onInputUp.add(this.onUpInput, this);
                // this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                // this.leftKey.onUp.add(this.onUpFewKeys, this);
                // this.leftKey.onDown.add(this.leftDown, this);
                // this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                // this.rightKey.onUp.add(this.onUpFewKeys, this);
                // this.rightKey.onDown.add(this.rightDown, this);
                // this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                // this.enterKey.onDown.add(this.escDown, this);
            }

            protected onUpInput() {
                this.isInputDown = false
            }

            protected onDownInput(input, pointer): void {
                if (!this.isFocused) return;
                this.isInputDown = true;
                if (pointer.msSinceLastClick < this.game.input.doubleTapRate) {
                    this.textInput.setStyle({
                        fontSize: this.inputConfigurationsInterface.fontSize,
                        backgroundColor: '#3390ff',
                        fill: '#ffffff'
                    });
                    this.isDoubleClick = true;
                } else {
                    this.textInput.setStyle({fontSize: this.inputConfigurationsInterface.fontSize});
                    this.isDoubleClick = false;
                }
                let inputPositionClickX = this.game.input.mousePointer.x - this.inputGroup.x - input.x;
                if (this.textInput.text.length > 0) {
                    this.line.x = this.getCharPosition(inputPositionClickX);
                } else {
                    this.line.x = this.distAllElSync;
                }

            }

            protected getCharPosition(inputClickedPos: number) {
                this.textFocusing.text = '';
                this.textFocusing.visible = false;
                let x: number;
                let i: number;
                let positioningOneTime = true;
                i = 0;
                for (; i < this.textInput.text.length; i++) {
                    if (this.textFocusing.width - this.textFocusing.x <= inputClickedPos && this.textInput.x == 2 * this.distAllElSync) {
                        x = this.textFocusing.x + this.textFocusing.width;
                        this.linePositionIndex = i;
                    } else if (this.textInput.x < 2 * this.distAllElSync) {
                        if (this.textFocusing.x + this.textFocusing.width <= inputClickedPos) {
                            x = this.textInput.x + this.textInput.width;
                            this.linePositionIndex = this.textInput.text.length;
                        } else {
                            if (positioningOneTime) {
                                positioningOneTime = false;
                                x = this.textFocusing.x + this.textFocusing.width;
                                this.linePositionIndex = this.textFocusing.text.length;
                                break;
                            }
                        }
                    }

                    if (this.textInput.x + this.textInput.width <= inputClickedPos && this.textInput.x == 2 * this.distAllElSync) {
                        x = this.textInput.x + this.textInput.width;
                        this.linePositionIndex = this.textInput.text.length;
                    }
                    this.textFocusing.text += this.textInput.text.charAt(i);
                }
                this.isLineIndexChanged = true;

                let textInThisPos: string = '';
                for (let j = 0; j < this.linePositionIndex; j++) {
                    textInThisPos += this.textInput.text.charAt(j);
                }
                this.textFocusing.text = textInThisPos;
                if (this.textInput.text.length == 0) {
                    this.line.x = this.spriteInpArea.worldPosition.x;
                }
                return x;
            }

            protected onFocusInputArea(): void {
                if ((this.spriteInpArea.getBounds()
                    .contains(this.game.input.mousePointer.x, this.game.input.mousePointer.y))
                ) {
                    this.isFocused = true;

                    if (this.timeBlink == null) {
                        this.timeBlink = this.game.time.events.loop(650, this.toggleLineVisibility, this);
                    }
                    this.spriteBorder.visible = true;
                    KeyboardManager.i.init(this.game);
                    KeyboardManager.i.onLetterWrite.add((letter: string) => this.handleKeyPressed(letter));
                    KeyboardManager.i.onKeyCombination.add((c: KeyboardAction) => this.generateKeyAction(c));
                    // this.game.input.keyboard.addCallbacks(this, null, null, this.handleKeyPressed);

                } else {
                    this.removeFocus();
                }

            }

            protected generateKeyAction(c: KeyboardAction): void {
                switch (c) {
                    case KeyboardAction.ESC:
                        this.escDown();
                        break;
                    case KeyboardAction.RIGHT:
                        this.rightDown();
                        break;
                    case KeyboardAction.LEFT:
                        this.leftDown();
                        break;
                    case KeyboardAction.BACKSPACE:
                        this.deleteText();
                        break;
                    case KeyboardAction.COPY:
                        console.log('copy');
						// let copyEvent = new ClipboardEvent('copy', { dataType: 'text/plain', data: 'Data to be copied' });
						// document.dispatchEvent(copyEvent);
                        break;
                    case KeyboardAction.PASTE:
                        console.log('paste');
                        let str = 'char';
						// let pasteEvent = new ClipboardEvent('paste', { dataType: 'text/plain', data: 'My string' } );
                        this.handleKeyPressed(str);
                        break;
                }
            }

            protected leftDown(): void {
                this.isLineIndexChanged = true;
                this.game.time.events.pause();
                let initialTextWidth = this.textFocusing.width;
                this.textFocusing.text = this.textFocusing.text.slice(0, this.linePositionIndex - 1);
                let finalTextWidth = this.textFocusing.width;
                if ((this.textFocusing.x + this.textFocusing.width) > (this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync)) {
                    this.line.x = this.spriteInpArea.x + this.spriteInpArea.width - 2 * this.distAllElSync;
                } else {
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }
                if (this.linePositionIndex > 0) {
                    if (this.line.x <= 2 * this.distAllElSync) {
                        if (this.textFocusing.x < 0) {
                            this.textInput.x -= finalTextWidth - initialTextWidth;
                            this.textFocusing.x -= finalTextWidth - initialTextWidth;
                        } else {
                            this.textInput.x = 2 * this.distAllElSync;
                            this.textFocusing.x = 2 * this.distAllElSync;

                        }
                        this.line.x = this.textFocusing.x + this.textFocusing.width;
                    }
                    --this.linePositionIndex;
                }
                if (this.game.time.events.paused) {
                    this.line.visible = true;
                    this.initRecreateBlinkTimer();
                }
            }

            protected rightDown(): void {
                this.isLineIndexChanged = true;
                this.game.time.events.pause();
                let initialTextWidth = this.textFocusing.width;
                this.textFocusing.text = this.textFocusing.text = [
                    this.textFocusing.text.slice(0, this.linePositionIndex),
                    this.textInput.text.charAt(this.linePositionIndex)
                ].join('');
                let finalTextWidth = this.textFocusing.width;
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
                        this.line.x = this.textFocusing.x + this.textFocusing.width;
                    }
                    ++this.linePositionIndex;
                }
                if (this.game.time.events.paused) {
                    this.line.visible = true;
                    this.initRecreateBlinkTimer();
                }

            }

            protected escDown(): void {
                this.removeFocus();
            }

            protected removeFocus(): void {
                this.textInput.setStyle({fontSize: this.inputConfigurationsInterface.fontSize});
                this.isFocused = false;
                this.game.time.events.remove(this.timeBlink);
                this.spriteBorder.visible = false;
                this.line.visible = false;
                this.timeBlink = null;
            }

            protected onUpFewKeys(): void {
                this.longPressWithCount = 0;
            }

            protected checkDeleteAll(): void {
                if (!this.isDoubleClick) return;
                this.textInput.text = this.textFocusing.text = '';
                this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;
                this.textInput.setStyle({fontSize: this.inputConfigurationsInterface.fontSize,});
                this.line.x = this.textInput.x + this.textInput.width;
                this.isDoubleClick = false;
            }

            protected handleKeyPressed(char: string): void {
                if (!this.isFocused) return;
                let initialTextWidth: number;
                let finalTextWidth: number;
                this.checkDeleteAll();
                this.game.time.events.pause();
                this.line.visible = true;

                this.textFocusing.text = [
                    this.textInput.text.slice(0, this.linePositionIndex),
                    char,
                ].join('');
                initialTextWidth = this.textInput.width;
                this.textInput.text = [
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
                } else {
                    if (this.linePositionIndex == this.textInput.text.length) {
                        this.isLineIndexChanged = false;
                    }
                    this.linePositionIndex += char.length;
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }

                if (this.line.x >= this.spriteInpArea.width) {
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }
                this.initRecreateBlinkTimer();
            }

            protected deleteText(): void {
                if (!this.isFocused) return;
                let initialTextWidth: number;
                let finalTextWidth: number;
                this.line.visible = true;
                this.checkDeleteAll();
                this.game.time.events.pause();
                initialTextWidth = this.textInput.width;


                this.textInput.text = this.textFocusing.text = [
                    this.textInput.text.slice(0, Math.max(0, this.linePositionIndex - 1)),
                    this.textInput.text.slice(this.linePositionIndex)
                ].join('');

                this.textFocusing.text = [
                    this.textInput.text.slice(0, Math.max(0, this.linePositionIndex - 1)),
                ].join('');

                if (this.placeHolder != null) {
                    this.placeHolder.visible = this.textInput.text.length == 0;
                }
                finalTextWidth = this.textInput.width;

                this.linePositionIndex = Math.max(0, --this.linePositionIndex);

                if (this.textInput.width < this.spriteInpArea.width || this.textInput.x >= 0) {
                    this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;

                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                } else {
                    this.isLengthBig = true;
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                }
                this.initRecreateBlinkTimer();
            }

            protected initRecreateBlinkTimer(): void {
                if (this.timeStop != null) {
                    clearTimeout(this.timeStop);
                }
                this.timeStop = setTimeout(() => {
                    this.game.time.events.add(200, () => {
                    }, this);
                    this.game.time.events.resume();
                }, 500);
            }

            protected toggleLineVisibility(): void {
                this.line.visible = !this.line.visible;
            }

            protected initLine(linePosition: number): void {
                this.line = this.game.add.graphics(
                    this.spriteInpArea.worldPosition.x + 2 * linePosition,
                    0, this.inputGroup);
                this.line.lineStyle(1, 0x000000);
                this.line.moveTo(0, 0);
                this.line.lineTo(
                    this.spriteInpArea.worldPosition.x,
                    this.inputConfigurationsInterface.fontSize
                );
                this.line.y = this.spriteInpArea.centerY - this.line.height / 2;

                this.line.visible = false;
            }

            public update(): void {
                if (this.backSpaceKey != null && this.backSpaceKey.isDown) {
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
                // if (this.isInputDown) {
                //     if (this.inputGroup.x + this.distAllElSync + this.textFocusing.width >= this.game.input.activePointer.x) {
                //         this.textFocusing.text = [
                //             this.textInput.text.slice(0, Math.max(0, this.linePositionIndex - 1)),
                //             this.textInput.text.slice(this.linePositionIndex)
                //         ].join('');
                //         this.line.x = this.textFocusing.x + this.textFocusing.width;
                //         this.linePositionIndex = Math.max(0, --this.linePositionIndex);
                //         console.log('here input');
                //     }
                // }

                if (this.line.x < this.spriteInpArea.x + this.distAllElSync) {
                    this.line.x = this.spriteInpArea.x + this.distAllElSync;
                }
            }

        }

        export class InputNumber extends InputArea {
            private arrowGroup: Phaser.Group;
            private arrowUpNum: Phaser.Sprite;
            private arrowDownNum: Phaser.Sprite;
            private whiteBgNum: Phaser.Sprite;

            constructor(g: Phaser.Game, inputConfigurationsInterface: InputConfigurations) {
                super(g, inputConfigurationsInterface);
                this.initNumberClass();
            }

            protected initNumberClass(): void {
                this.initNumberSubjects();
                this.initEventsNumber();
            }

            private initNumberSubjects() {
                this.spriteInpArea.width = this.inputConfigurationsInterface.width - this.inputConfigurationsInterface.fontSize - 2 * this.distAllElSync;
                this.whiteBgNum = this.game.add.sprite(this.spriteInpArea.x + this.spriteInpArea.width,
                    this.distAllElSync, Images.ImagesInputArea.getName(), null, this.inputGroup);

                this.arrowGroup = this.game.add.group(this.inputGroup);
                this.arrowGroup.x = this.spriteInpArea.x + this.spriteInpArea.width;

                this.arrowUpNum = this.game.add.sprite(0,
                    0, Images.ImagesUp.getName(), null, this.arrowGroup);

                this.arrowDownNum = this.game.add.sprite(0,
                    this.arrowUpNum.y + this.inputConfigurationsInterface.fontSize / 2, Images.ImagesDown.getName(), null, this.arrowGroup);

                this.arrowUpNum.width
                    = this.arrowUpNum.height
                    = this.arrowDownNum.width
                    = this.arrowDownNum.height
                    = this.inputConfigurationsInterface.fontSize;

                this.arrowGroup.y = this.spriteInpArea.centerY - this.arrowGroup.height / 2;

                this.whiteBgNum.width = this.arrowUpNum.width;
                this.whiteBgNum.height = this.spriteInpArea.height;

                this.arrowUpNum.inputEnabled = this.arrowDownNum.inputEnabled = true;
                this.arrowGroup.visible = false;
            }

            protected initText(): void {
                this.textInput = this.game.add.text(2 * this.distAllElSync,
                    this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                    '', {fontSize: this.inputConfigurationsInterface.fontSize}, this.inputGroup);

                this.textInput.text = this.inputConfigurationsInterface.value;

                if (this.inputConfigurationsInterface.placeHolder != '') {
                    this.placeHolder = this.game.add.text(2 * this.distAllElSync,
                        this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                        this.inputConfigurationsInterface.placeHolder, {
                            fontSize: this.inputConfigurationsInterface.fontSize,
                            fill: '#b0b0b0'
                        }, this.inputGroup);
                    if (this.textInput.text.length > 0) {
                        this.placeHolder.visible = false;
                    }
                }
                this.textFocusing = this.game.add.text(2 * this.distAllElSync,
                    this.spriteInpArea.worldPosition.y + 2 * this.distAllElSync,
                    '', {fontSize: this.inputConfigurationsInterface.fontSize}, this.inputGroup);

                this.textFocusing.text = this.inputConfigurationsInterface.value;

                this.textFocusing.visible = false;

                this.textInput.y = this.textFocusing.y = this.line.y;

                this.textValue = this.textInput.text;
                this.initMask();

            }

            protected handleKeyPressed(char: string): void {
                if (!this.isFocused) return;
                let initialTextWidth: number;
                let finalTextWidth: number;
                this.checkDeleteAll();
                this.game.time.events.pause();
                this.line.visible = true;
                initialTextWidth = this.textInput.width;

                for (let i = 0; i < 10; i++) {
                    if (char == i.toString() || char == '-' || char == '+') {
                        break;
                    }
                    if (i == 9) {
                        char = '';
                    }
                }

                this.textFocusing.text = [
                    this.textInput.text.slice(0, this.linePositionIndex),
                    char,
                ].join('');
                this.textInput.text = [
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
                } else {
                    if (this.linePositionIndex == this.textInput.text.length) {
                        this.isLineIndexChanged = false;
                    }
                    this.linePositionIndex += 1;
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }

                if (this.line.x >= this.spriteInpArea.width) {
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }
                this.initRecreateBlinkTimer();
            }

            protected deleteText(): void {
                if (!this.isFocused) return;
                let initialTextWidth: number;
                let finalTextWidth: number;
                this.line.visible = true;
                this.checkDeleteAll();
                this.game.time.events.pause();
                initialTextWidth = this.textInput.width;


                this.textInput.text = this.textFocusing.text = [
                    this.textInput.text.slice(0, Math.max(0, this.linePositionIndex - 1)),
                    this.textInput.text.slice(this.linePositionIndex)
                ].join('');

                this.textFocusing.text = [
                    this.textInput.text.slice(0, Math.max(0, this.linePositionIndex - 1)),
                ].join('');

                if (this.placeHolder != null) {
                    this.placeHolder.visible = this.textInput.text.length == 0;
                }
                finalTextWidth = this.textInput.width;

                this.linePositionIndex = Math.max(0, --this.linePositionIndex);

                if (this.textInput.width < this.spriteInpArea.width || this.textInput.x >= 0) {
                    this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;

                    this.line.x = this.textFocusing.x + this.textFocusing.width;
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
                        this.timeBlink = this.game.time.events.loop(650, this.toggleLineVisibility, this);
                    }
                    this.spriteBorder.visible = true;
                    // this.game.input.keyboard.addCallbacks(this, null, null, this.handleKeyPressed);
                    
                    KeyboardManager.i.init(this.game);
                    KeyboardManager.i.onLetterWrite.add((letter: string) => this.handleKeyPressed(letter));
                    KeyboardManager.i.onKeyCombination.add((c: KeyboardAction) => this.generateKeyAction(c));
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

            private arrowGroupShow(): void {
                this.arrowGroup.visible = true;
            }

            private arrowGroupHide(): void {
                if (!this.isFocused) {
                    this.arrowGroup.visible = false;
                }
            }

            private upArrowClicked(): void {
                this.convertAndReturn(true);
                this.frontZeroRemove();
            }

            private downArrowClicked(): void {
                this.convertAndReturn(false);
                this.frontZeroRemove();
            }

            private frontZeroRemove(): void {
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

            private convertAndReturn(addition: boolean) {
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
                //         console.log('rememberTen');
                //     }else if (rememberMinusOne) {
                //             if (addition) {
                //                 num++;
                //             } else {
                //                 num--
                //             }
                //         console.log('rememberMinusOne');
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
                if (this.textInput.x >= 0) {
                    this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;
                }
                this.linePositionIndex = this.textFocusing.text.length;
                this.line.x = this.textFocusing.x + this.textFocusing.width;
            }

            private replaceAt(string, index, replace): string {
                return string.substring(0, index) + replace + string.substring(index + 1);
            }

            private deleteZeros(index: number) {
                this.textFocusing.text = this.textInput.text = [
                    this.textInput.text.slice(index + 1, this.textInput.text.length)
                ].join('');
                this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;
                this.linePositionIndex = this.textFocusing.text.length;
                this.line.x = this.textFocusing.x + this.textFocusing.width;
            }
        }

        export class InputPassword extends InputArea {

            protected handleKeyPressed(char: string): void {
                if (!this.isFocused) return;
                let initialTextWidth: number;
                let finalTextWidth: number;
                this.checkDeleteAll();
                this.game.time.events.pause();
                this.line.visible = true;
                initialTextWidth = this.textInput.width;

                this.textValue = [
                    this.textValue.slice(0, this.linePositionIndex),
                    char,
                    this.textValue.slice(this.linePositionIndex)
                ].join('');
                let passwordHidenLetters ='';
				for (let i = 0; i < char.length; i++) {
					passwordHidenLetters += '•';
				}

                this.textFocusing.text = [
                    this.textInput.text.slice(0, this.linePositionIndex),
					passwordHidenLetters,
                ].join('');
                this.textInput.text = [
                    this.textInput.text.slice(0, this.linePositionIndex),
					passwordHidenLetters,
                    this.textInput.text.slice(this.linePositionIndex)
                ].join('');

                if (this.placeHolder != null) {
                    this.placeHolder.visible = this.textInput.text.length == 0;
                }
                finalTextWidth = this.textInput.width;

                if (!this.isLineIndexChanged) {
                    this.line.x = this.textInput.x + this.textInput.width;
                    this.linePositionIndex = this.textInput.text.length;
                } else {
                    if (this.linePositionIndex == this.textInput.text.length) {
                        this.isLineIndexChanged = false;
                    }
                    this.linePositionIndex += 1;
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }

                if (this.line.x >= this.spriteInpArea.width) {
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                }
                this.initRecreateBlinkTimer();
            }

            protected deleteText(): void {
                if (!this.isFocused) return;
                let initialTextWidth: number;
                let finalTextWidth: number;
                this.line.visible = true;
                this.checkDeleteAll();
                this.game.time.events.pause();
                initialTextWidth = this.textInput.width;

                this.textValue = [
                    this.textValue.slice(0, Math.max(0, this.linePositionIndex - 1)),
                    this.textValue.slice(this.linePositionIndex)
                ].join('');


                this.textInput.text = this.textFocusing.text = [
                    this.textInput.text.slice(0, Math.max(0, this.linePositionIndex - 1)),
                    this.textInput.text.slice(this.linePositionIndex)
                ].join('');

                this.textFocusing.text = [
                    this.textInput.text.slice(0, Math.max(0, this.linePositionIndex - 1)),
                ].join('');

                if (this.placeHolder != null) {
                    this.placeHolder.visible = this.textInput.text.length == 0;
                }
                finalTextWidth = this.textInput.width;

                this.linePositionIndex = Math.max(0, --this.linePositionIndex);

                if (this.textInput.width < this.spriteInpArea.width || this.textInput.x >= 0) {
                    this.textInput.x = this.textFocusing.x = 2 * this.distAllElSync;

                    this.line.x = this.textFocusing.x + this.textFocusing.width;
                } else {
                    this.isLengthBig = true;
                    this.textInput.x -= finalTextWidth - initialTextWidth;
                    this.textFocusing.x -= finalTextWidth - initialTextWidth;
                }
                this.initRecreateBlinkTimer();
            }

        }

        export class SelectPlugin extends Phaser.Group {
            private realWidth: number;
            private groupOfSelect: Phaser.Group;
            private slideDownArrowGroup: Phaser.Group;
            private selectorBorder: Phaser.Sprite;
            private selectorArea: Phaser.Sprite;
            private arrowBg: Phaser.Sprite;
            private arrowDown: Phaser.Sprite;
            private distAllElSync: number;
            private isFocused: boolean;
            private selectedText: Phaser.Text;
            private maskText: Phaser.Graphics;
            private scroller: ScrollForSelect;
            private scrollConfiguration: SelectScrollConfiguration;
            private widthScrollBar: number;
            private readonly selectSetting: any;

            constructor(g: Phaser.Game, selectConfigurations?: SelectConfigurations) {
                super(g);
                const selectDefault: SelectConfigurations = {
                    x: 0,
                    y: 0,
                    width: 200,
                    height: 30,
                    textConfiguration: new TextConfigurations([''], ['']),
                    fontAndOtherSize: 17,
                    heightOfShowingSpace: 200,
                    byDefault: 0
                };
                this.selectSetting = Object.assign({}, selectDefault, selectConfigurations);
                this.init();
            }

            private init(): void {
                this.initGenGroup();
                this.initBackForeImages();
                this.initSelectedText();
                this.initMask(this.groupOfSelect.x, this.groupOfSelect.y, this.selectorArea.width, this.selectorArea.height, this.selectedText);
                this.initScroller();
                this.initEvents();
            }

            private countMaxLength() {
                let textObject: Phaser.Text = this.game.add.text(0, 0, '', {fontSize: this.selectSetting.fontAndOtherSize}, this.groupOfSelect);
                let textSizeChecking: Phaser.Text = this.game.add.text(0, 0, '', {fontSize: this.selectSetting.fontAndOtherSize}, this.groupOfSelect);

                textSizeChecking.visible = textObject.visible = false;
                let max = 0;
                for (let i = 0; i < this.selectSetting.textConfiguration.label.length; i++) {
                    if (this.selectSetting.textConfiguration.label[i].length > max) {
                        textObject.text = this.selectSetting.textConfiguration.label[i];
                        max = this.selectSetting.textConfiguration.label[i].length;
                    }
                    textSizeChecking.text = this.selectSetting.textConfiguration.label[i];
                    if (this.selectSetting.width + this.selectSetting.fontAndOtherSize < textSizeChecking.width) {
                        let k = 0;
                        textSizeChecking.text = '';
                        do {
                            textSizeChecking.text = this.selectSetting.textConfiguration.label[i].slice(0, k);
                            k++;
                        } while (this.selectSetting.width + this.selectSetting.fontAndOtherSize > textSizeChecking.width);

                        textSizeChecking.text = this.selectSetting.textConfiguration.label[i].slice(0, textSizeChecking.text.length - 3) + '...';
                        this.selectSetting.textConfiguration.label[i] = textSizeChecking.text;
                    }
                }
                this.realWidth = textObject.width;
                textSizeChecking.destroy();
                textObject.destroy();
            }

            private initGenGroup(): void {
                this.groupOfSelect = this.game.add.group(this);
                this.groupOfSelect.x = this.selectSetting.x;
                this.groupOfSelect.y = this.selectSetting.y;
                this.distAllElSync = 2;
                this.widthScrollBar = 20;
            }

            private initBackForeImages() {
                this.selectorBorder = this.game.add.sprite(0, 0, Images.ImagesInputBorderColor.getName(), null, this.groupOfSelect);
                this.countMaxLength();
                this.selectorBorder.width = this.selectSetting.width + this.selectSetting.fontAndOtherSize;
                this.selectorBorder.height = this.selectSetting.height;
                this.selectorBorder.visible = false;
                this.selectorArea = this.game.add.sprite(this.distAllElSync, this.distAllElSync, Images.ImagesInputArea.getName(),
                    null, this.groupOfSelect);
                this.selectorArea.width = this.selectorBorder.width - 2 * this.distAllElSync - this.selectSetting.fontAndOtherSize;
                this.selectorArea.height = this.selectorBorder.height - 2 * this.distAllElSync;
                this.selectorArea.inputEnabled = true;
                this.initArrowGroup();
            }

            private initSelectedText(): void {
                this.selectedText = this.game.add.text(2 * this.distAllElSync, this.selectorArea.worldPosition.y + 2 * this.distAllElSync,
                    this.selectSetting.textConfiguration.label[this.selectSetting.byDefault],
                    {fontSize: this.selectSetting.fontAndOtherSize}, this.groupOfSelect);
                this.selectedText.y = 2 * this.distAllElSync + this.selectorArea.height / 2 - this.selectedText.height / 2;
            }

            private initMask(x: number, y: number, rectWidth: number, rectHeight: number,
                             whoHaveMask: any): void {
                this.maskText = this.game.add.graphics(x, y, this);
                this.maskText.beginFill(0x000);
                this.maskText.drawRect(this.distAllElSync, this.distAllElSync, rectWidth, rectHeight);
                whoHaveMask.mask = this.maskText;
                this.maskText.endFill();
            }

            private initArrowGroup(): void {
                this.slideDownArrowGroup = this.game.add.group(this);
                this.slideDownArrowGroup.x = this.groupOfSelect.x + this.selectorArea.width + this.distAllElSync;
                this.slideDownArrowGroup.y = this.groupOfSelect.y;
                this.arrowBg = this.game.add.sprite(0,
                    this.distAllElSync, Images.ImagesInputArea.getName(), null, this.slideDownArrowGroup);
                this.arrowDown = this.game.add.sprite(0, 0, Images.ImagesDown.getName(), null, this.slideDownArrowGroup);
                this.arrowBg.width = this.arrowDown.width = this.arrowDown.height = this.selectSetting.fontAndOtherSize;
                this.arrowBg.height = this.selectorArea.height;
                this.arrowDown.y = this.arrowBg.centerY - this.arrowDown.height / 2;

            }

            private initEvents() {
                this.groupOfSelect.inputEnableChildren = true;
                this.slideDownArrowGroup.inputEnableChildren = true;
                this.game.input.onTap.add(this.onFocusSelectArea, this)
            }

            private onFocusSelectArea() {
                if (

                    this.groupOfSelect.getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y) ||
                    this.slideDownArrowGroup.getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y)
                ) {
                    this.isFocused = this.selectorBorder.visible = true;
                    this.scroller.visible = true;
                } else {
					if (!this.scroller.scrollGroup.getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y)) {
						this.scroller.visible = false;
					}
                    this.isFocused = false;

                    this.selectorBorder.visible = false;
                }
            }
            //TODO browser check... what browser it is?
            private initScroller() {
                this.scrollConfiguration = new SelectScrollConfiguration(
                    this.selectSetting.width + this.selectSetting.fontAndOtherSize - this.widthScrollBar - 2 * this.distAllElSync,
                    this.widthScrollBar, new Phaser.Point
                    (
                        this.groupOfSelect.x + this.distAllElSync,
                        this.groupOfSelect.y + this.selectorBorder.y + this.selectorBorder.height
                    ),
                    new ScrollBar(
                        Images.ImagesBackgroundTemplate.getName(),
                        Images.ImagesInputBorderColor.getName()
                    ),
                    true,
                    0xFFFFFF,
                    this.selectSetting.heightOfShowingSpace,
                    false,
                    this.selectedText,
                    this.selectorArea.width
                );
                this.scroller = new ScrollForSelect(this.game, this.initArray(),
                    this.scrollConfiguration);
                this.scroller.visible = false;
            }

            private initArray(): SelectorItem[] {
                let selectItems = [];
                for (let i = 0; i < this.selectSetting.textConfiguration.label.length; i++) {
                    const selectItem = new SelectorItem(
                        this.game, this.selectSetting.textConfiguration.label[i],
                        this.selectSetting.textConfiguration.value[i],
                        {fontSize: this.selectSetting.fontAndOtherSize}, this.selectedText,
                        this.selectSetting.width + this.selectSetting.fontAndOtherSize
                    );
                    selectItem.position.setTo(0, selectItem.height * i);
                    selectItems.push(selectItem);
                }
                return selectItems;
            }

        }

        export const addInput = (g: Phaser.Game, inputConfigurations?: InputConfigurations) => {
            let inputSetting;
            let inputDefault = {
                x: 0,
                y: 0,
                width: 200,
                height: 30,
                fontSize: 18,
                value: '',
                placeHolderValue: '',
                inputType: InputType.TEXT
            };
            inputSetting = Object.assign({}, inputDefault, inputConfigurations);

            let input;

            switch (inputSetting.inputType) {
                case InputType.NUMBER :
                    console.log('setting x = ' + inputSetting.x);
                    input = new DC.Input.InputNumber(g, inputSetting);
                    break;
                case InputType.PASSWORD :
                    input = new DC.Input.InputPassword(g, inputSetting);
                    break;
                case InputType.TEXT :
                    input = new DC.Input.InputArea(g, inputSetting);
                    break;
            }
        }
    }
}
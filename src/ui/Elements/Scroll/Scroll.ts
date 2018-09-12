import Color = Phaser.Color;
import {Images} from '../../../assets';
import {ScrollConfiguration} from "./ScrollConfiguration";
import {ScrollBar} from "./ScrollBar";
import {SelectorItem} from "../Select/SelectorItem";


export class Scroll extends Phaser.Group {
    private groupOfElements : Phaser.Group;
    private groupScrollBtn : Phaser.Group;
    private element : Phaser.Group;
    private scrollArea : Phaser.Sprite;
    private maskOfElements: Phaser.Graphics;
    private maskYPos : number;
    private maskHeight : number;
    private isMaskClicked : boolean;
    private scrollBtnHeight : number;
    private scrollSpeed : number;
    private scrollGroup : Phaser.Group;
    private scrollUp : Phaser.Image;
    private scrollDown : Phaser.Image;
    private scrollBtn : Phaser.Sprite;
    private mouseLastPos : number = 0;
    private mouseOldY : number = 0;
    private percent : number = 0;
    private bgGraphic : Phaser.Graphics;

    constructor(g, array : SelectorItem[], configuration : ScrollConfiguration) {
        super(g);
        this.init(array, configuration);
    }

    private init(arr : SelectorItem[], configuration : ScrollConfiguration) : void {
        this.initElements(arr,configuration);

        this.initScrollSystem(configuration);
        this.attachListeners();
    }

    private initBackground() : void {
        this.bgGraphic = this.game.add.graphics(0,0,this.groupOfElements);
    }

    private initElements(elements : SelectorItem[], configuration : ScrollConfiguration) : void {
        this.groupOfElements = this.game.add.group(this);
        // this.groupOfElements.scale.set(0.5);
        this.initBackground();
        for (let i = 0; i < elements.length ; i++) {
            this.element = elements[i];
            this.element.onChildInputDown.add(this.onChildClicked.bind(this,this.element,configuration.selectedText),this);
            this.element.onChildInputOver.add(this.onChildHovered.bind(this,this.element),this);
            this.element.onChildInputOut.add(this.onChildOut.bind(this,this.element),this);
            this.groupOfElements.addChild(this.element);
        }
        this.groupOfElements.x = configuration.position.x;
        this.initMask(configuration);
        this.bgGraphic.beginFill(configuration.backgroundColor,1);
        this.bgGraphic.drawRect(0,0,this.groupOfElements.width,this.groupOfElements.height);
        this.bgGraphic.endFill();
        this.groupOfElements.y = this.maskOfElements.y;
        this.groupOfElements.width = configuration.widthGroup;


    }

    private onChildClicked(group,selectedText) : void {
        if (this.maskOfElements.getBounds().contains(this.game.input.activePointer.x,this.game.input.activePointer.y)) {
            selectedText.text = group.getChildAt(1).text;
            console.log('the value of text = ' + group.value);
        }
    }

    private onChildHovered(groupText) : void {
        if (this.groupOfElements.getBounds().contains(this.game.input.activePointer.x,this.game.input.activePointer.y)
            // this.maskOfElements.getBounds().contains(this.game.input.activePointer.x,this.game.input.activePointer.y)
    ) {
            groupText.getChildAt(0).tint = 0x000fff;
            groupText.getChildAt(1).fill = '#ffffff';
        }
    }

    private onChildOut(groupText) : void {
        groupText.getChildAt(0).tint = 0xffffff;
        groupText.getChildAt(1).fill = '#000000';
    }

    private initMask(configuration : ScrollConfiguration) : void {
        this.maskYPos = configuration.position.y;
        this.maskHeight = configuration.maskHeight;

        this.maskOfElements = this.game.add.graphics(this.groupOfElements.x, this.maskYPos,this);
        this.maskOfElements.beginFill(Color.AQUA);
        this.maskOfElements.drawRect(0,0,
            configuration.widthGroup, this.maskHeight );
        this.maskOfElements.endFill();
        this.groupOfElements.mask = this.maskOfElements;
        if (configuration.isEnableClickOnMask) {
            this.maskOfElements.inputEnabled = true;
            this.maskOfElements.events.onInputDown.add(this.maskClick, this);
            this.maskOfElements.events.onInputUp.add(this.maskUp, this);
        }
    }

    private initScrollSystem(config : ScrollConfiguration) : void {
        this.scrollGroup = this.game.add.group(this);
        this.scrollGroup.x = this.groupOfElements.x + config.widthGroup;
        this.scrollGroup.y = 0;

        this.scrollUp = this.game.add.sprite(0,0,Images.ImagesUp.getName());
        this.scrollUp.scale.setTo(0.5);
        this.scrollUp.width = config.widthScrollBar;
        this.scrollGroup.addChild(this.scrollUp);

        this.scrollDown = this.game.add.sprite(0, this.maskHeight - this.scrollUp.height,Images.ImagesDown.getName());
        this.scrollDown.scale.setTo(0.5);
        this.scrollDown.width = config.widthScrollBar;
        this.scrollGroup.addChild(this.scrollDown);

        if (!config.arrowsEnabled) {
            this.scrollDown.visible = false;
            this.scrollUp.visible = false;
        }
        this.initScrollArea(config.scrollSrc);
    }

    private initScrollArea(configKeys : ScrollBar) : void {
        this.scrollArea = this.game.add.sprite(0,this.scrollUp.height,configKeys.scrollArea,false, this.scrollGroup);
        this.scrollArea.width = this.scrollDown.width;
        this.scrollArea.height = this.scrollDown.y - this.scrollDown.height;
        this.scrollGroup.addChild(this.scrollArea);
        this.scrollBtnHeight = (this.scrollDown.y - this.scrollDown.height) * this.maskHeight / this.groupOfElements.height;

        if (this.scrollBtnHeight < this.scrollDown.height) {
            //by default
            this.scrollBtnHeight = this.scrollDown.height;
        }
        this.groupScrollBtn = this.game.add.group(this.scrollGroup);
        this.groupScrollBtn.y = this.scrollUp.height;
        this.scrollBtn = this.game.add.sprite(0,0,configKeys.scroller,null,this.groupScrollBtn);
        this.scrollBtn.width = this.scrollDown.width;
        this.scrollBtn.height = this.scrollBtnHeight;
        this.scrollBtn.inputEnabled = true;
        this.scrollBtn.input.enableDrag(true);
        this.scrollBtn.input.allowHorizontalDrag = false;

        this.scrollBtn.input.boundsRect = new Phaser.Rectangle(0,0,this.scrollDown.width,
            (this.scrollDown.y - this.scrollDown.height));

        this.scrollBtn.events.onDragUpdate.add(this.posScrollBtnConvertGroup,this);
        // this.scrollGroup.addChild();


        if (this.maskOfElements != null) {
            this.scrollGroup.y = this.maskOfElements.y;
            if (this.groupOfElements.height <= this.maskHeight) {
                this.scrollGroup.visible = false;
            }
            this.scrollSpeed = 10;
        }
        this.scrollArea.inputEnabled = true;
        this.scrollArea.events.onInputDown.add(this.onClickScrollArea,this);
    }

    private onClickScrollArea() : void {
        if (this.game.input.activePointer.y > this.scrollBtn.worldPosition.y + this.scrollBtn.height) {
            // this.game.add.tween(this.scrollBtn).to( { y: this.scrollBtn.y + this.scrollBtnHeight },
            //     100, Phaser.Easing.Linear.None, true);
            this.scrollBtn.y += this.scrollBtnHeight;
            if (this.scrollBtn.y + this.scrollBtnHeight > this.scrollArea.height) {
                this.scrollBtn.y = this.scrollArea.height - this.scrollBtnHeight;
                this.game.add.tween(this.scrollBtn).to( { y: this.scrollArea.height - this.scrollBtnHeight },
                    100, Phaser.Easing.Linear.None, true);
            }
        } else {
            // this.game.add.tween(this.scrollBtn).to( { y: this.scrollBtn.y - this.scrollBtnHeight },
            //     100, Phaser.Easing.Linear.None, true);
            this.scrollBtn.y -= this.scrollBtnHeight;
            if (this.scrollBtn.y  < 0) {
                console.log("over up");
                this.scrollBtn.y = 0;
                this.game.add.tween(this.scrollBtn).to( { y: 0 },
                    100, Phaser.Easing.Linear.None, true);
            }
        }
        this.posScrollBtnConvertGroup();
    }

    private upClicked() : void {
        if (this.scrollBtn.y > 0) {
            if (this.scrollBtn.y - this.scrollSpeed < 0) {
                this.scrollBtn.y = 0;
                this.groupOfElements.y = this.maskOfElements.y;
            } else {
                this.groupOfElements.y += this.scrollSpeed;
                this.posGroupConvertScrollBtn();
            }
        }
    }

    private downClicked() : void {
        if (this.scrollBtn.y + this.scrollBtnHeight < this.scrollDown.y - this.scrollDown.height) {
            if (this.scrollBtn.y + this.scrollBtnHeight + this.scrollSpeed > this.scrollDown.y - this.scrollDown.height) {
                this.scrollBtn.y = this.scrollDown.y - this.scrollDown.height - this.scrollBtnHeight;
                this.groupOfElements.y =  (this.maskOfElements.y + this.maskOfElements.height) - this.groupOfElements.height;
            } else {
                this.groupOfElements.y -= this.scrollSpeed;
                this.posGroupConvertScrollBtn();
            }
        }
    }

    private attachListeners() : void {
        this.game.input.onDown.add(this.mouseFirstClick,this);
        this.scrollUp.inputEnabled = true;
        this.scrollDown.inputEnabled = true;
        this.scrollUp.events.onInputDown.add(this.upClicked,this);
        this.scrollDown.events.onInputDown.add(this.downClicked,this);
        window.addEventListener('wheel', () => {
            this.mouseWheel();
        });
    }

    private mouseFirstClick() : void {
        this.mouseOldY = this.game.input.mousePointer.y;
    }

    private mouseWheel() : void {
        if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP
            && (this.maskOfElements.getBounds().contains(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY)
                || this.scrollGroup.getBounds().contains(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY))
        ) {
            if (this.scrollBtn.y > 0) {
                // if (this.scrollBtn.y <= this.scrollArea.y) {
                //     this.scrollBtn.y = this.scrollUp.height;
                //     this.groupOfElements.y = this.maskOfElements.y;
                // } else {
                    this.groupOfElements.y += this.scrollSpeed;
                    this.posGroupConvertScrollBtn();
            }
        } else if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN
            && (this.maskOfElements.getBounds().contains(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY)
                || this.scrollGroup.getBounds().contains(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY))) {
            if (this.scrollBtn.y + this.scrollBtnHeight < this.scrollArea.height) {
                // if (this.scrollBtn.y + this.scrollBtnHeight + this.scrollSpeed > this.scrollDown.y - this.scrollDown.height) {
                //     this.scrollBtn.y = this.scrollDown.y - this.scrollBtnHeight;
                //     this.groupOfElements.y = (this.maskOfElements.y + this.maskOfElements.height) - this.groupOfElements.height;
                // } else {
                    this.groupOfElements.y -= this.scrollSpeed;
                    this.posGroupConvertScrollBtn();
            }
        }
    }

    private maskClick() : void {
        this.isMaskClicked = true;
    }

    private maskUp() : void {
        this.isMaskClicked = false;
    }

    private posScrollBtnConvertGroup() {
        this.percent = 100 * (this.scrollBtn.y) / (this.scrollDown.y -  this.scrollDown.height - this.scrollBtnHeight);
        this.groupOfElements.y = this.maskYPos - ((this.groupOfElements.height - this.maskHeight) * this.percent / 100); //- this.scrollUp.height;
    }

    private posGroupConvertScrollBtn() : void {
        this.percent =  100 * (this.maskYPos - this.groupOfElements.y) / (this.groupOfElements.height - this.maskHeight);
        this.scrollBtn.y = (this.scrollArea.height - this.scrollBtnHeight ) * this.percent / 100 ;
    }

    public update() : void {
        if (this.game.input.mousePointer.isDown && this.isMaskClicked) {
            if (this.maskOfElements.getBounds().contains(this.game.input.mousePointer.x, this.game.input.mousePointer.y)) {
                if (((this.groupOfElements.y >= -this.groupOfElements.height + this.maskYPos + this.maskOfElements.height)
                    && (this.game.input.mousePointer.y - this.mouseOldY < 0))
                    ||
                    ((this.groupOfElements.y <= this.maskYPos)
                        && (this.game.input.mousePointer.y - this.mouseOldY) > 0)
                ) {
                    this.groupOfElements.y = this.mouseLastPos + this.game.input.mousePointer.y - this.mouseOldY;
                    if (this.groupOfElements.y > this.maskYPos) {
                        this.groupOfElements.y = this.maskYPos;
                    }
                    else if (this.groupOfElements.y + this.groupOfElements.height < this.maskYPos + this.maskHeight) {
                        this.groupOfElements.y = this.maskYPos + this.maskHeight - this.groupOfElements.height;
                    }
                }
                this.percent = 100 * (this.maskYPos - this.groupOfElements.y) / (this.groupOfElements.height - this.maskHeight);
                this.scrollBtn.y = (this.scrollDown.y - this.scrollDown.height - this.scrollBtnHeight) * this.percent / 100;
            }
        } else {
            this.mouseLastPos = this.groupOfElements.y;
        }
    }

}
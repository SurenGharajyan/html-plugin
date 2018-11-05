import {KeyboardAction} from '../Input/enums/KeyboardAction';
import {BrowserHelper} from '../BrowserHelper';


export class KeyboardManager {
    private static _i: KeyboardManager;
    private keyboard: Phaser.Keyboard;
    private game: Phaser.Game;
    private _onLetterWrite: Phaser.Signal;
    private _onKeyCombination: Phaser.Signal;

    public static get i(): KeyboardManager {
        if (KeyboardManager._i == null) {
            KeyboardManager._i = new KeyboardManager();
        }
        return KeyboardManager._i;
    }

    public get onLetterWrite(): Phaser.Signal {
        return this._onLetterWrite;
    }

    public get onKeyCombination(): Phaser.Signal {
        return this._onKeyCombination;
    }

    public init(game: Phaser.Game) {
        this.game = game;
        this.keyboard = this.game.input.keyboard;
        this._onLetterWrite = new Phaser.Signal();
        this._onKeyCombination = new Phaser.Signal();
        this.keyboard.addCallbacks(this, this.handleKeyCombination, this.handleKeyUp);

    }

    private handleKeyCombination(e: KeyboardEvent): void {
        e.preventDefault();
        if (this.isBrowserCommandPressed(e)) {
            if (this.game.input.keyboard.isDown(Phaser.KeyCode.C)) {
                this._onKeyCombination.dispatch(KeyboardAction.COPY);
                return;
            } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.V)) {
                this._onKeyCombination.dispatch(KeyboardAction.PASTE);
                return;
            }
        }
        switch (e.keyCode) {
            case Phaser.KeyCode.ESC:
                this._onKeyCombination.dispatch(KeyboardAction.ESC);
                return;
            case Phaser.KeyCode.RIGHT:
                this._onKeyCombination.dispatch(KeyboardAction.RIGHT);
                return;
            case Phaser.KeyCode.LEFT:
                this._onKeyCombination.dispatch(KeyboardAction.LEFT);
                return;
            case Phaser.KeyCode.BACKSPACE:
                this._onKeyCombination.dispatch(KeyboardAction.BACKSPACE);
                return;
        }
        if (
            e.keyCode >= Phaser.KeyCode.ZERO && e.keyCode <= Phaser.KeyCode.Z ||
            e.keyCode >= Phaser.KeyCode.NUMPAD_0 && e.keyCode <= Phaser.KeyCode.NUMPAD_DIVIDE ||
            e.keyCode >= Phaser.KeyCode.COLON ||
            e.keyCode === Phaser.KeyCode.SPACEBAR
        ) {
            this._onLetterWrite.dispatch(e.key);
        }
    }


    private handleKeyUp(): void {
        // this._onKeyCombination.dispatch();
    }

    private isBrowserCommandPressed(e: KeyboardEvent): boolean {
        if (navigator.appVersion.indexOf("Mac") != -1) {
            if (BrowserHelper.newInstance.isFirefox() && e.keyCode === 224) {
                return this.game.input.keyboard.isDown(224);
            } else if (BrowserHelper.newInstance.isOpera() && e.keyCode === 17) {
                return this.game.input.keyboard.isDown(17);
            } else if (BrowserHelper.newInstance.isSafari() && (e.keyCode === 93 || e.keyCode === 91)) {
                return this.game.input.keyboard.isDown(e.keyCode);
            } else if (
                   BrowserHelper.newInstance.isChrome()
                || BrowserHelper.newInstance.isExplorer()
                || BrowserHelper.newInstance.isEdge() && e.keyCode === Phaser.KeyCode.CONTROL) {
                return this.game.input.keyboard.isDown(Phaser.KeyCode.CONTROL);
            }
        } else {
            return this.game.input.keyboard.isDown(Phaser.KeyCode.CONTROL);
        }
    }

}
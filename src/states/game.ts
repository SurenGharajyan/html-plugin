import {GameScreen} from '../ui/screens/GameScreen';


// @ts-ignore
export default class Game extends Phaser.State {
    // private backgroundImage : Phaser.TileSprite;
    private s : GameScreen;
    public preload() : void {
        console.log('PRELOAD');
    }
    public create() : void {
        this.s = new GameScreen(this.game);
        this.game.stage.add(this.s);
    }
}



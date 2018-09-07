export namespace Util {
    export class MathUtils {
        public static getRandomInt(min : number, max : number) : number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}
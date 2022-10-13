import { BLOCKSIZE } from "./consts.js";

export default class extends Array {
  constructor( game ) {
    super( game.height / BLOCKSIZE );
    this.game = game;
    this.reset();
  }

  gameOver() { }

  reset() { }

  checkLines() { }

  deleteLine() { }

  update() { }

  draw() { }
}

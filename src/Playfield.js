import { BLOCKSIZE, COLORS } from "./consts.js";

export default class {
  constructor( game ) {
    this.game = game;
    this.playfield = new Array( this.game.height / BLOCKSIZE ).fill( 0 );
    this.reset();
  }

  gameOver() { }

  reset() {
    this.playfield.fill( new Array( this.game.width / BLOCKSIZE ).fill( 0 ) );
  }

  checkLines() { }

  deleteLine() { }

  update() { }

  draw( context ) {
    this.playfield.forEach( ( row, i ) => row.forEach( ( block, j ) => {
      if ( block ) {
        const color  = COLORS[ block ];
        const x      = ( j * BLOCKSIZE ) + 1;
        const y      = ( i * BLOCKSIZE ) + 1;
        const width  = BLOCKSIZE - 2;
        const height = BLOCKSIZE - 2;

        context.fillStyle = color;
        context.fillRect( x, y, width, height ); 
      }
    }));
  }
}

import { BLOCKSIZE, COLORS, COLUMNS, ROWS, } from "./consts.js";

export default class {
  constructor() {
    this.playfield = new Array( ROWS ).fill( 0 );
    this.reset();
  }

  gameOver() { }

  reset() {
    this.playfield = this.playfield.map( () =>
      new Array( COLUMNS ).fill( 0 )
    );
  }

  checkLines() { }

  deleteLine() { }

  update( shape, x, y ) {
    shape.forEach( ( row, i ) => row.forEach( ( block, j ) => {
      if ( block ) {
        const yIdx  = ( y + i );
        const xIdx  = ( x + j );
        if ( yIdx < ROWS && xIdx < COLUMNS )
          this.playfield[ y + i ][ x + j ] = block;
      }
    }));
  }

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

import { HEIGHT, WIDTH } from "./consts.js";

export default class extends Array {
  constructor() {
    super( HEIGHT * WIDTH );
    this.reset();
  }

  gameOver() {
    this.fill( true );
  }

  reset() {
    this.fill( false );

    for ( let i = 0; i < HEIGHT * WIDTH; i += WIDTH )
      this[ i ] = true;

    for ( let i = WIDTH - 1; i < HEIGHT * WIDTH; i += WIDTH )
      this[ i ] = true;

    for ( let i = WIDTH * HEIGHT - WIDTH; i < HEIGHT * WIDTH; i++ )
      this[ i ] = true;
  }

  checkLines() {
    for ( let i = 0; i < HEIGHT * WIDTH - WIDTH; i += WIDTH ) {
      if ( this.slice( i + 1, i + WIDTH - 1 ).every( e => e ) ) {
        this.deleteLine( i );
      }
    }
  }

  deleteLine( n ) {
    for ( let i = n; i > 0; i -= WIDTH ) {
      for ( let j = i; j < i + WIDTH - 1; j++ ) {
        this[ j ] = this[ j - WIDTH ];
      }
    }
  }
}

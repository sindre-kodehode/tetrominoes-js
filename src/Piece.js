import { SHAPES, WIDTH } from "./consts.js"

const trans = ( x, y ) => y * WIDTH + x;

export default class {
  constructor( playfield, scoreboard ) {
    this.playfield  = playfield;
    this.scoreboard = scoreboard;

    this.reset();

    this.interval = setInterval( () => {
      this.y++;
      if ( this.collision() ) {
        this.y--;
        this.draw();
        this.reset();
      }
      if ( !this.playfield.slice( 1, WIDTH - 1 ).every( e => !e ) ) {
        this.playfield.gameOver();
        clearInterval( this.interval );
        // clearInterval( gameloop );
      }
    }, 200 );
  }

  rotate() {
    const dimension = this.shape.length;

    const newShape = Array( dimension ).fill().map( () =>
      Array( dimension ).fill( 0 )
    );

    for ( let i = 0; i < dimension; i++ )
      for ( let j = 0; j < dimension; j++ )
        newShape[ j ][ dimension - 1 - i ] = this.shape[ i ][ j ];

    if ( !this.collision( newShape ) )
      this.shape = newShape;
  }

  reset() {
    this.x     = 4;
    this.y     = 0;
    this.shape = SHAPES[ Math.floor( Math.random() * SHAPES.length ) ];
    this.scoreboard.update( this.playfield.checkLines() );
  }

  draw() {
    this.shape.forEach( ( e, i ) => {
      e.forEach( ( f, j ) => {
        const k = this.x + this.y * WIDTH + trans( j, i );
        this.playfield[ k ] = this.playfield[ k ] || f;
      })
    })
  }

  collision( shape=this.shape ) { 
    let collision = false;

    shape.forEach( ( e, i ) => {
      e.forEach( ( f, j ) => {
        const k = this.x + this.y * WIDTH + trans( j, i );
        if ( this.playfield[ k ] && f ) collision = true;
      })
    })

    return collision;
  }

  moveDown() {
    while( !this.collision() )
      this.y++;
    this.y--;
  }

  moveLeft()  { 
    this.x--;
    if ( this.collision() )
      this.x++;
  }

  moveRight() {
    this.x++;
    if ( this.collision() )
      this.x--;
  }
}

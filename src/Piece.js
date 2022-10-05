import { LEVELS, SHAPES, SPEEDS, WIDTH } from "./consts.js"

const trans = ( x, y ) => y * WIDTH + x;

export default class {
  constructor( playfield, scoreboard ) {
    this.playfield  = playfield;
    this.scoreboard = scoreboard;

    this.lines = 0;
    this.level = 0;
    this.shape = [];

    this.next     = SHAPES[ Math.floor( Math.random() * SHAPES.length ) ];
    this.interval = setInterval( () => this.loop(), SPEEDS[ this.level ] );

    this.reset();
  }

  loop() {
    this.y++;

    if ( this.collision() )
      this.reset();

    if ( !this.playfield.slice( 1, WIDTH - 1 ).every( e => !e ) ) {
      this.playfield.gameOver();
      this.scoreboard.gameOver();
      clearInterval( this.interval );
    }
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
    this.y--;
    this.draw();

    this.x = 4;
    this.y = 0;

    this.shape = this.next;
    this.next  = SHAPES[ Math.floor( Math.random() * SHAPES.length ) ];

    const newLines = this.playfield.checkLines();
    this.lines += newLines;

    if ( this.lines >= LEVELS[ this.level ] ) {
      this.level++;
      this.lines = 0;
    }

    this.scoreboard.update( newLines, this.next, this.level );

    clearInterval( this.interval );
    this.interval = setInterval( () => this.loop(), SPEEDS[ this.level ]);
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

  startSoftDrop() {
    clearInterval( this.interval );
    const newSpeed = Math.max( SPEEDS[ this.level ] / 10, SPEEDS[ SPEEDS.length - 1 ] );
    this.interval = setInterval( () => this.loop(), newSpeed );
  }

  stopSoftDrop() {
    clearInterval( this.interval );
    this.interval = setInterval( () => this.loop(), SPEEDS[ this.level ] );
  }

  hardDrop() {
    while( !this.collision() ) this.y++;
    this.reset();
  }

  moveLeft()  { 
    this.x--;
    if ( this.collision() ) this.x++;
  }

  moveRight() {
    this.x++;
    if ( this.collision() ) this.x--;
  }
}

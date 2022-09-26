const WIDTH = 12, HEIGHT = 21, FPS = 30, MILLI = 1000 / FPS;

const trans = ( x, y ) => y * WIDTH + x;

const shapes = [
  [
    [ false, true , false ],
    [ true , true , true  ],
    [ false, false, false ],
  ],
  [
    [ true , true , false ],
    [ false, true , true  ],
    [ false, false, false ],
  ],
  [
    [ false, true , true  ],
    [ true , true , false ],
    [ false, false, false ],
  ],
  [
    [ true , false, false ],
    [ true , true , true  ],
    [ false, false, false ],
  ],
  [
    [ false, false, true  ],
    [ true , true , true  ],
    [ false, false, false ],
  ],
  [
    [ true, true ],
    [ true, true ],
  ],
  [
    [ false, false, false, false ],
    [ true , true , true , true  ],
    [ false, false, false, false ],
    [ false, false, false, false ],
  ],
]

class Piece {
  constructor( playfield ) {
    this.playfield = playfield;
    this.reset();
    this.interval  = setInterval( () => {
      this.y++;
      this.checkCollision();
    }, 200 );
  }

  rotate() {
    const dimension = this.shape.length;

    const newShape = Array( dimension ).fill().map( _ =>
      Array( dimension ).fill( 0 )
    );

    for ( let i = 0; i < dimension; i++ )
      for ( let j = 0; j < dimension; j++ )
        newShape[ j ][ dimension - 1 - i ] = this.shape[ i ][ j ];

    this.shape = newShape;
  }

  reset() {
    this.x      = 4;
    this.y      = 0;
    this.shape  = shapes[ Math.floor( Math.random() * shapes.length ) ];
    this.height = this.shape.length;
    this.width  = this.shape[0].length;
    this.playfield.checkLines();
  }

  draw() {
    this.shape.forEach( ( e, i ) => {
      e.forEach( ( f, j ) => {
        const k = this.x + this.y * WIDTH + trans( j, i );
        this.playfield[ k ] = this.playfield[ k ] || f;
      })
    })
  }

  checkCollision() { 
    let collision = false;

    this.shape.forEach( ( e, i ) => {
      e.forEach( ( f, j ) => {
        const k = this.x + this.y * WIDTH + trans( j, i );
        if ( this.playfield[ k ] && f ) collision = true;
      })
    })

    if ( collision ) {
      this.y--;
      this.draw();
      this.reset();
    }

    return collision;
  }

  checkCollisionX() {
    let collision = false;

    this.shape.forEach( ( e, i ) => {
      e.forEach( ( f, j ) => {
        const k = this.x + this.y * WIDTH + trans( j, i );
        if ( this.playfield[ k ] && f ) collision = true;
      })
    })
    
    return collision;
  }

  moveDown() {
    while( !this.checkCollision() ) this.y++;
  }

  moveLeft()  { 
    this.x--;
    if ( this.checkCollisionX() )
      this.x++;
  }

  moveRight() {
    this.x++;
    if ( this.checkCollisionX() )
      this.x--;
  }
}

class Playfield extends Array {
  constructor() {
    super( HEIGHT * WIDTH ).fill( false );

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

class Buffer extends Array {
  constructor( piece, playfield ) {
    super( HEIGHT * WIDTH ).fill( false );
    this.piece     = piece;
    this.playfield = playfield;
  }

  render() {
    this.playfield.forEach( ( e, i ) => {
      this[ i ] = !!e;
    })

    this.piece.shape.forEach( ( e, i ) => {
      e.forEach( ( f, j ) => {
        const k = this.piece.x + this.piece.y * WIDTH + trans( j, i );
        this[ k ] = this[ k ] || !!f;
      })
    })

    this.forEach( ( _, i ) =>
      cells[ i ].className = buffer[ i ] ? "active" : ""
    )
  }
}

const cells = Array( HEIGHT * WIDTH ).fill().map( () =>
    document.createElement( "td" ) );

const rows = Array( HEIGHT ).fill().map( () =>
  document.createElement( "tr" ) );

rows.forEach( ( row, i ) => row.append(
  ...cells.slice( i * WIDTH, i * WIDTH + WIDTH ) ) );

const table = document.createElement( "table" );

table.append( ...rows );
document.body.append( table );

const playfield = new Playfield();
const piece     = new Piece( playfield );
const buffer    = new Buffer( piece, playfield );

setInterval( () => {
  buffer.render();
}, MILLI );

document.addEventListener( "keydown", ({ key }) => {
  switch( key ) {
    case "ArrowLeft"  : piece.moveLeft()  ; break ;
    case "ArrowRight" : piece.moveRight() ; break ;
    case "ArrowDown"  : piece.moveDown()  ; break ;
    case "ArrowUp"    : piece.rotate()    ; break ;
}});

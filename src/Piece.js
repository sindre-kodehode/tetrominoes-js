import { BLOCKSIZE, COLORS, SHAPES } from "./consts.js";

export default class Piece {
  constructor( game, inputHandler ) {
    this.game         = game;
    this.inputHandler = inputHandler;

    this.shape        = 0;
    this.x            = 3 * BLOCKSIZE;
    this.y            = -BLOCKSIZE;
    this.speed        = 16;
    this.drop         = false;
    this.smooth       = false;
    this.dropTimer    = 0;
    this.dropInterval = 500;

    this.assingKeys();
  }

  assingKeys() {
    this.inputHandler.assignKey( "Enter",      () => this.changeShape()  );
    this.inputHandler.assignKey( "s",          () => this.toggleSmooth() );
    this.inputHandler.assignKey( "ArrowLeft",  () => this.moveLeft()     );
    this.inputHandler.assignKey( "ArrowRight", () => this.moveRight()    );
    this.inputHandler.assignKey( 
      "ArrowDown",
      () => this.toggleDrop(),
      () => this.toggleDrop(),
    );
  }

  draw( context ) {
    SHAPES[ this.shape ].forEach( ( e, i ) => e.forEach( ( f, j ) => {
      if ( f ) {
        context.fillStyle = COLORS[ f ];
        context.fillRect( 
          this.x + ( j * BLOCKSIZE ) + 1,
          this.y + ( i * BLOCKSIZE ) + 1,
          BLOCKSIZE - 2,
          BLOCKSIZE - 2,
        );
      }
    })
  )}

  changeShape()  { this.shape = ++this.shape % SHAPES.length; }
  toggleDrop()   { this.drop = !this.drop;                    }
  toggleSmooth() { this.smooth = !this.smooth;                }
  moveLeft()     { this.x -= BLOCKSIZE;                       }
  moveRight()    { this.x += BLOCKSIZE;                       }

  update( deltaTime ) {
    this.x = Math.max( 0, this.x );
    this.x = Math.min( this.game.width - SHAPES[ this.shape ].length * BLOCKSIZE, this.x );

    this.dropInterval = this.smooth ? 100 : 1600;
    this.dropTimer += deltaTime;

    if ( this.dropTimer < this.dropInterval ) return;

    while ( this.dropTimer > this.dropInterval ) {
      this.dropTimer = this.dropTimer - this.dropInterval;
      this.y += this.smooth ? 1 : BLOCKSIZE;
    }

    if ( this.y >= this.game.height ) this.y = -2 * BLOCKSIZE;
  }
}

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
    this.inputHandler.assignKey( "ArrowDown",  () => this.toggleDrop()   );
    this.inputHandler.assignKey( "ArrowLeft",  () => this.moveLeft()     );
    this.inputHandler.assignKey( "ArrowRight", () => this.moveRight()    );
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

    if ( this.smooth ) this.y += this.drop ? 2 : 1;
    else {
      this.dropInterval = this.drop ? 200 : 500;

      if ( this.dropTimer < this.dropInterval ) {
        this.dropTimer += deltaTime;
        return;
      }

      this.dropTimer = 0;
      this.y += BLOCKSIZE;
    }

    if ( this.y > this.game.height ) this.y = -2 * BLOCKSIZE;
  }
}

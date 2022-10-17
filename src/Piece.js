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
    SHAPES[ this.shape ].forEach( ( row, i ) => row.forEach( ( block, j ) => {
      if ( block ) {
        const color  = COLORS[ block ];
        const x      = this.x + ( j * BLOCKSIZE ) + 1;
        const y      = this.y + ( i * BLOCKSIZE ) + 1;
        const width  = BLOCKSIZE - 2;
        const height = BLOCKSIZE - 2;

        context.fillStyle = color;
        context.fillRect( x, y, width, height );
      }
    })
  )}

  changeShape()  { this.shape = ++this.shape % SHAPES.length; }
  toggleDrop()   { this.drop = !this.drop;                    }
  toggleSmooth() { this.smooth = !this.smooth;                }
  moveLeft()     { this.x -= BLOCKSIZE;                       }
  moveRight()    { this.x += BLOCKSIZE;                       }

  update( deltaTime ) {
    const minX = 0;
    const maxX = this.game.width - SHAPES[ this.shape ].length * BLOCKSIZE;

    this.x = Math.max( minX, this.x );
    this.x = Math.min( maxX, this.x );

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

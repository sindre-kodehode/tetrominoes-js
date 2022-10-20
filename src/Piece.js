import Shape from "./Shape.js"

export default class Piece {
  constructor( game, inputHandler, playfield ) {
    this.inputHandler = inputHandler;
    this.playfield    = playfield;
    this.shape        = new Shape();

    this.dropTimer    = 0;
    this.dropInterval = 600;

    this.assingKeys();
  }

  assingKeys() {
    this.inputHandler.assignKey( "ArrowLeft",  () => this.shape.column = -1 );
    this.inputHandler.assignKey( "ArrowRight", () => this.shape.column =  1 );
  }

  update( deltaTime ) {
    this.dropTimer += deltaTime;

    if ( this.dropTimer < this.dropInterval ) return;

    while ( this.dropTimer > this.dropInterval ) {
      this.dropTimer = this.dropTimer - this.dropInterval;
      this.shape.row = 1;
    }
  }

  draw( context ) {
    this.shape.draw( context );
  }
}

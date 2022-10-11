import InputHandler from "./InputHandler.js";
import Piece        from "./Piece.js";

export default class {
  constructor( width, height ) {
    this.width  = width;
    this.height = height;
    this.smooth = false;
    this.paused = false;
    this.keys   = [];

    this.inputHandler = new InputHandler( this );
    this.piece        = new Piece( this, this.inputHandler );

    this.assignKeys();
  }

  assignKeys() {
    this.inputHandler.assignKey( "p", () => this.pauseGame() );
  }

  pauseGame()  { 
    this.paused = !this.paused;
    this.inputHandler.unassignAll();
    this.assignKeys();

    if ( this.paused ) return;
    this.piece.assingKeys();
  }

  draw( context ) {
    if ( this.paused ) return;
    context.clearRect( 0, 0, this.width, this.height );
    this.piece.draw( context );
  }

  update( deltaTime ) {
    this.inputHandler.update( deltaTime );

    if ( this.paused ) return;
    this.piece.update( deltaTime );
  }
}

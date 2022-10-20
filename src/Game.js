import InputHandler from "./InputHandler.js";
import Piece        from "./Piece.js";
import Playfield    from "./Playfield.js";

export default class {
  constructor( width, height ) {
    this.width    = width;
    this.height   = height;
    this.smooth   = false;
    this.isPaused = false;
    this.keys     = [];

    this.inputHandler = new InputHandler( this );
    this.playfield    = new Playfield();
    this.piece        = new Piece( this.inputHandler, this.playfield );

    this.assignKeys();
  }

  assignKeys() {
    this.inputHandler.assignKey( "p", () => this.pauseGame() );
  }

  pauseGame()  { 
    this.isPaused = !this.isPaused;
    this.inputHandler.unassignAll();
    this.assignKeys();
    if ( !this.isPaused ) this.piece.assingKeys();
  }

  draw( context ) {
    context.clearRect( 0, 0, this.width, this.height );
    this.piece.draw( context );
    this.playfield.draw( context );
  }

  update( deltaTime ) {
    this.inputHandler.update( deltaTime );
    if ( !this.isPaused ) this.piece.update( deltaTime );
  }
}

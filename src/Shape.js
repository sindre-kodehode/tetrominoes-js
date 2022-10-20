import Block from "./Block.js";

export default class {
  constructor( playfield ) {
    this.playfield = playfield;
    this.shape = this.TShape();
  }

  get collision() {
    return this.shape.some( block => block.collision )
        || this.playfield.collision( this.shape );
  }

  set column( diff ) {
    this.shape.forEach( block => block.column += diff );
    if ( this.collision )
      this.shape.forEach( block => block.column -= diff );
  }

  set row( diff ) {
    this.shape.forEach( block => block.row += diff );
    if ( this.collision ) {
      this.shape.forEach( block => block.row -= diff );
      this.playfield.add( this.shape );
      this.shape = this.TShape();
    }
  }

  TShape() {
    const shape = Array(4);
    shape[0] = new Block( 0, 0, "purple" );
    shape[1] = new Block( 1, 0, "purple" );
    shape[2] = new Block( 2, 0, "purple" );
    shape[3] = new Block( 1, 1, "purple" );

    shape.forEach( block => {
      block.column += 3;
      block.row    -= 2;
    });

    return shape;
  }

  draw( context ) {
    this.shape.forEach( block => block.draw( context ) );
  }
}

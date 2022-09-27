import { HEIGHT, WIDTH } from "./consts.js";

export default class extends Array {
  constructor( piece, playfield, cells ) {
    super( HEIGHT * WIDTH ).fill( false );
    this.piece     = piece;
    this.playfield = playfield;
    this.cells     = cells;
  }

  render() {
    this.playfield.forEach( ( e, i ) => {
      this[ i ] = !!e;
    })

    this.piece.shape.forEach( ( e, i ) => {
      e.forEach( ( f, j ) => {
        const k = this.piece.x + this.piece.y * WIDTH + ( i * WIDTH + j );
        this[ k ] = this[ k ] || !!f;
      })
    })

    this.forEach( ( _, i ) =>
      this.cells[ i ].className = this[ i ] ? "active" : ""
    )
  }
}

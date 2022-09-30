import { HEIGHT, WIDTH } from "./consts.js";

export default class extends Array {
  constructor( piece, playfield ) {
    super( HEIGHT * WIDTH ).fill( false );

    this.piece     = piece;
    this.playfield = playfield;

    this.cells = Array( HEIGHT * WIDTH ).fill().map( () =>
        document.createElement( "td" ) );

    this.rows = Array( HEIGHT ).fill().map( () =>
      document.createElement( "tr" ) );

    this.rows.forEach( ( row, i ) => row.append(
      ...this.cells.slice( i * WIDTH, i * WIDTH + WIDTH ) ) );

    this.table = document.querySelector( "#display" );
    this.table.append( ...this.rows );
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

    for ( let i = 0; i < this.cells.length; i++ )
      this.cells[ i ].className = this[ i ] ? "active" : ""
  }
}

import { SCORES } from "./consts.js";

export default class {
  constructor() {
    this.score = 0;
    this.lines = 0;
    this.shape = [];

    this.scoreEl   = document.querySelector( "#score"   );
    this.linesEl   = document.querySelector( "#lines"   );
    this.previewEl = document.querySelector( "#preview" );

    this.rowsEl = Array( 4 ).fill().map( () =>
      document.createElement( "tr" )
    );

    this.rowsEl.forEach( row =>
      row.append( ...Array( 4 ).fill().map( () => 
        document.createElement( "td" )
    )));

    this.previewEl.append( ...this.rowsEl );

    this.update( 0, 0 );
  }

  update( lines, shape ) {
    this.lines += lines;
    this.score += SCORES[ lines ];
    this.shape  = shape;

    this.rowsEl.forEach( row =>
      [ ...row.children ].forEach( child => child.className = "" )
    );

    for ( let i = 0; i < this.shape.length; i++ )
      for ( let j = 0; j < this.shape[ i ].length; j++ )
        this.rowsEl[ i ].children[ j ].className
          = this.shape[ i ][ j ] ? "active" : "";

    this.linesEl.textContent = this.lines;
    this.scoreEl.textContent = this.score;
  }
}

import { SCORES } from "./consts.js";

export default class {
  constructor() {
    this.hiscore = localStorage.getItem( "hiscore" ) || 0;
    this.score = 0;
    this.lines = 0;
    this.shape = [];

    this.previewEl = document.querySelector( "#preview" );
    this.hiscoreEl = document.querySelector( "#hiscore" );
    this.scoreEl   = document.querySelector( "#score"   );
    this.linesEl   = document.querySelector( "#lines"   );
    this.levelEl   = document.querySelector( "#level"   );

    this.rowsEl = Array( 4 ).fill().map( () =>
      document.createElement( "tr" )
    );

    this.rowsEl.forEach( row =>
      row.append( ...Array( 4 ).fill().map( () => 
        document.createElement( "td" )
    )));

    this.previewEl.append( ...this.rowsEl );

    this.update( this.lines, this.shape );
  }

  update( lines, shape, level ) {
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

    this.hiscoreEl.textContent = `${ this.hiscore }`.padStart( 6, "0" );
    this.scoreEl.textContent   = `${ this.score }`.padStart( 6, "0" );
    this.linesEl.textContent   = `${ this.lines }`.padStart( 3, "0" );
    this.levelEl.textContent   = `${ level }`.padStart( 2, "0" );
  }

  gameOver() {
    if ( this.score > this.hiscore ) {
      this.hiscore = this.score;
      this.hiscoreEl.textContent = `${ this.hiscore }`.padStart( 6, "0" );
      localStorage.setItem( "hiscore", this.hiscore );
    }
  }
}

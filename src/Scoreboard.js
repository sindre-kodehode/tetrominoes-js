import { SCORES } from "./consts.js";

export default class {
  constructor() {
    this.score   = 0;
    this.lines   = 0;

    this.scoreEl = document.querySelector( "#score" );
    this.linesEl = document.querySelector( "#lines" );

    this.update( 0, 0 );
  }

  update( lines ) {
    this.lines += lines;
    this.score += SCORES[ lines ];

    this.linesEl.textContent = this.lines;
    this.scoreEl.textContent = this.score;
  }
}

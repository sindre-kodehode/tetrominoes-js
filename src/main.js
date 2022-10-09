import { HEIGHT, WIDTH } from "./consts.js";

import Game from "./Game.js";

const display = document.getElementById( "display" );
const context = display.getContext( "2d" );
const game    = new Game( WIDTH, HEIGHT );

display.height = HEIGHT;
display.width  = WIDTH;

let frame    = 0;
let prevTime = 0;

const loop = currTime => {
  frame = requestAnimationFrame( loop );

  const deltaTime = currTime - prevTime;
  prevTime = currTime;

  game.update( deltaTime );
  game.draw( context );
}

loop( 0 );

import Buffer     from "./Buffer.js";
import Controller from "./Controller.js";
import Piece      from "./Piece.js";
import Playfield  from "./Playfield.js";
import Scoreboard from "./Scoreboard.js"

import { MILLI } from "./consts.js";

const playfield  = new Playfield();
const scoreboard = new Scoreboard();
const piece      = new Piece( playfield, scoreboard );
const buffer     = new Buffer( piece, playfield );
const controller = new Controller( piece );

setInterval( () => {
  buffer.render();
  controller.update();
  controller.buttonPress();
}, MILLI );

document.addEventListener( "keydown", ({ key }) => {
  switch( key ) {
    case "ArrowLeft"  : piece.moveLeft()         ; break ;
    case "ArrowRight" : piece.moveRight()        ; break ;
    case "ArrowDown"  : piece.moveDown()         ; break ;
    case "ArrowUp"    : piece.rotate()           ; break ;
    case "d"          : controller.toggleDebug() ; break ;
}});

window.addEventListener( "gamepadconnected", e =>
  controller.connect( e )
);

window.addEventListener( "gamepaddisconnected", e =>
  controller.disconnect( e )
);

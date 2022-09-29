import Buffer     from "./Buffer.js";
import Controller from "./Controller.js";
import Piece      from "./Piece.js";
import Playfield  from "./Playfield.js";
import Scoreboard from "./Scoreboard.js"

import { 
  HEIGHT,  
  MILLI,
  WIDTH, 
} from "./consts.js";

const cells = Array( HEIGHT * WIDTH ).fill().map( () =>
    document.createElement( "td" ) );

const rows = Array( HEIGHT ).fill().map( () =>
  document.createElement( "tr" ) );

rows.forEach( ( row, i ) => row.append(
  ...cells.slice( i * WIDTH, i * WIDTH + WIDTH ) ) );

const table = document.createElement( "table" );

table.append( ...rows );
document.body.append( table );

const playfield  = new Playfield();
const scoreboard = new Scoreboard();
const piece      = new Piece( playfield, scoreboard );
const buffer     = new Buffer( piece, playfield, cells );
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

window.addEventListener( "gamepadconnected", e => {
  controller.connect( e );
});

window.addEventListener( "gamepaddisconnected", e => {
  controller.disconnect( e );
});
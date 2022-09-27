import { 
  HEIGHT,  
  MILLI,
  WIDTH, 
} from "./consts.js";

import Buffer    from "./Buffer.js";
import Piece     from "./Piece.js";
import Playfield from "./Playfield.js";

const cells = Array( HEIGHT * WIDTH ).fill().map( () =>
    document.createElement( "td" ) );

const rows = Array( HEIGHT ).fill().map( () =>
  document.createElement( "tr" ) );

rows.forEach( ( row, i ) => row.append(
  ...cells.slice( i * WIDTH, i * WIDTH + WIDTH ) ) );

const table = document.createElement( "table" );

table.append( ...rows );
document.body.append( table );

const playfield = new Playfield();
const piece     = new Piece( playfield );
const buffer    = new Buffer( piece, playfield, cells );

setInterval( () => {
  buffer.render();
}, MILLI );

document.addEventListener( "keydown", ({ key }) => {
  switch( key ) {
    case "ArrowLeft"  : piece.moveLeft()  ; break ;
    case "ArrowRight" : piece.moveRight() ; break ;
    case "ArrowDown"  : piece.moveDown()  ; break ;
    case "ArrowUp"    : piece.rotate()    ; break ;
}});

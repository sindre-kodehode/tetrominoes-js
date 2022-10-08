import Buffer     from "./Buffer.js";
import Controller from "./Controller.js";
import HiScores   from "./HiScores.js"
import Piece      from "./Piece.js";
import Playfield  from "./Playfield.js";
import Scoreboard from "./Scoreboard.js";
import {Play} from "./Audio.js";

import { MILLI } from "./consts.js";

const menuEl = document.querySelector( "#menu" );
const nameEl = document.querySelector( "#menu input" );
nameEl.value = "";


window.playfield = new Playfield();
window.hiscores  = new HiScores();

nameEl.addEventListener( "keydown", ({ key }) => {
  if ( key === "Enter" ) {
    menuEl.style.display = "none";
    const name = nameEl.value.toUpperCase();

    Play();
    window.scoreboard = new Scoreboard( hiscores, name );
    window.piece      = new Piece( playfield, scoreboard );
    window.buffer     = new Buffer( piece, playfield );
    window.controller = new Controller( piece );

    setInterval( () => {
      buffer.render();
      controller.update();
      controller.buttonPress();
    }, MILLI );

    document.addEventListener( "keydown", ({ key, repeat }) => {
      if ( piece.gameOver ) return;

      switch( key ) {
        case "ArrowLeft"  : piece.moveLeft()         ; break ;
        case "ArrowRight" : piece.moveRight()        ; break ;
        case "ArrowUp"    : piece.rotate()           ; break ;
        case "d"          : controller.toggleDebug() ; break ;
        case " "          : piece.hardDrop();        ; break ;
        case "ArrowDown"  : {
          if ( !repeat ) {
            piece.loop();
            piece.startSoftDrop();
          }
          break ;
        }
    }});

    document.addEventListener( "keyup", ({ key }) => {
      if ( piece.gameOver ) return;

      switch( key ) { case "ArrowDown" : piece.stopSoftDrop() }
    });

    window.addEventListener( "gamepadconnected", e =>
      controller.connect( e )
    );

    window.addEventListener( "gamepaddisconnected", e =>
      controller.disconnect( e )
    );
  }
});

import { COLORS, HEIGHT, MILLI, SHAPES, WIDTH } from "./consts.js";

const BLOCKSIZE = 16;

const display = document.getElementById( "display" );
const context = display.getContext( "2d" );

let frame = 0;

display.height = HEIGHT;
display.width  = WIDTH;

class Piece {
  constructor() {
    this.shape = 0;
    this.x     = 0;
    this.y     = - BLOCKSIZE;
  }

  changeShape() {
    this.shape++;
    if ( this.shape >= SHAPES.length ) this.shape = 0;
  }

  incY() {
    this.y++;
    if ( this.y > HEIGHT ) this.y = -32;
  }

  draw() {
    SHAPES[ this.shape ].forEach( ( e, i ) =>
      e.forEach( ( f, j ) => {
        if ( f ) {
          context.fillStyle = COLORS[ f ];
          context.fillRect( 
            this.x + ( j * BLOCKSIZE ),
            this.y + ( i * BLOCKSIZE ),
            BLOCKSIZE - 2,
            BLOCKSIZE - 2,
          );
        }
      })
    );
  }
}

const piece = new Piece();

const main = () => {
  frame = requestAnimationFrame( main );

  context.clearRect( 0, 0, WIDTH, HEIGHT );

  piece.draw();
  piece.incY();

}

main();

document.addEventListener( "keydown", ({ key, repeat }) => {
  switch( key ) {
    case "Enter" : !repeat && piece.changeShape(); break;
    // case "ArrowLeft"  : piece.moveLeft()         ; break ;
    // case "ArrowRight" : piece.moveRight()        ; break ;
    // case "ArrowUp"    : piece.rotate()           ; break ;
    // case "d"          : controller.toggleDebug() ; break ;
    // case " "          : piece.hardDrop();        ; break ;
    // case "ArrowDown"  : {
    //   if ( !repeat ) {
    //     piece.loop();
    //     piece.startSoftDrop();
    //   }
    //   break ;
    // }
}});
//
// document.addEventListener( "keyup", ({ key }) => {
//   switch( key ) { case "ArrowDown" : piece.stopSoftDrop() }
// });
//
// window.addEventListener( "gamepadconnected", e =>
//   controller.connect( e )
// );
//
// window.addEventListener( "gamepaddisconnected", e =>
//   controller.disconnect( e )
// );

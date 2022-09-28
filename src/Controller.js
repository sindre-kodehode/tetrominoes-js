export default class {
  constructor( piece ) {
    this.piece      = piece;
    this.gamepad    = null;
    this.debug      = false;

    this.axes       = [];
    this.axsCache   = [];
    this.axsDisplay = null;

    this.buttons    = [];
    this.btnCache   = [];
    this.btnDisplay = null;
  }
  
  connect( event ) { 
    this.gamepad = event.gamepad;
    this.turbo   = true;
    console.log( "controller connected" )
  }

  toggleDebug() {
    this.debug = !this.debug;
    const debugEl = document.querySelector( ".debug" );
    debugEl.textContent = "";

    if ( !this.debug ) return;

    this.btnDisplay = document.createElement( "section" );
    this.btnDisplay.className = "dbg-buttons";
    
    this.buttons.forEach( () => {
      const btnEl = document.createElement( "div" );
      this.btnDisplay.append( btnEl );
    });

    this.axsDisplay = document.createElement( "section" );
    this.axsDisplay.className = "dbg-axes";
    this.axes.forEach( () => {
      const axsEl = document.createElement( "progress" );
      axsEl.className = "dbg-axis";
      axsEl.value = 1;
      axsEl.max   = 2;
      this.axsDisplay.append( axsEl );
    });

    debugEl.append( this.btnDisplay, this.axsDisplay );
  }

  disconnect() {
    this.gamepad = null;
  }

  buttonPress() {
    if ( !this.gamepad ) return;
    
    if ( this.axes[6] === 0 && this.axsCache[6] !== 0 )
      this.piece.moveLeft();

    if ( this.axes[6] === 2 && this.axsCache[6] !== 2 )
      this.piece.moveRight();

    if ( this.axes[7] === 2 && this.axsCache[7] !== 2 )
      this.piece.moveDown();

    if ( this.buttons[0] && !this.btnCache[0] )
      this.piece.rotate();
  }

  update() {
    if ( !this.gamepad ) return;

    this.axsCache = [ ...this.axes    ];
    this.axes = this.gamepad.axes.map( axis => axis + 1.0 );

    this.btnCache = [ ...this.buttons ];
    this.buttons = this.gamepad.buttons.map( button => button.pressed );

    if ( !this.debug ) return;

    this.axes.forEach( ( e, i ) =>
      this.axsDisplay.children[ i ].value = e
    );

    this.buttons.forEach( ( e, i ) =>
      this.btnDisplay.children[ i ].className = e ? "active" : ""
    );
  }
}

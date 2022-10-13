export default class {
  constructor( game ) {
    this.game             = game;
    this.registeredKeys   = [];
    this.pressedKeys      = [];
    this.pressedKeysCache = [];

    document.addEventListener( "keydown", ({ key, repeat }) => {
      if ( repeat ) return;

      this.registeredKeys.forEach( k => {
        if( k.key === key ) k.pressed = true;
      });
    });

    document.addEventListener( "keyup", ({ key }) => {
      this.registeredKeys.forEach( k => {
        if( k.key === key ) k.pressed = false;
      });
    });
  }

  assignKey( key, keydown, keyup ) {
    this.registeredKeys.push({
      keydown : keydown,
      key     : key,
      keyup   : keyup,
      pressed : false,
    });
  }

  unassignAll() {
    this.registeredKeys = [];
  }

  update() {
    this.pressedKeysCache = [ ...this.pressedKeys ];
    this.pressedKeys      = this.registeredKeys.map( k => k.pressed );

    this.registeredKeys.forEach( ( k, i ) => {
      if ( this.pressedKeys[ i ] && !this.pressedKeysCache[ i ] )
        k.keydown && k.keydown();
    });

    this.registeredKeys.forEach( ( k, i ) => {
      if ( !this.pressedKeys[ i ] && this.pressedKeysCache[ i ] )
        k.keyup && k.keyup();
    });
  }
}

export default class {
  constructor( game ) {
    this.game = game;
    this.registeredKeys = [ 
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "Enter",
      "s",
      "p",
    ];
    
    document.addEventListener( "keydown", ({ key, repeat }) => {
      if ( repeat ) return;

      if ( this.registeredKeys.includes( key ) )
        this.game.keys.push( key );
    });

    document.addEventListener( "keyup", ({ key }) => {
      if ( this.registeredKeys.includes( key ) )
        this.game.keys = this.game.keys.filter( k => k !== key );
    });
  }
}

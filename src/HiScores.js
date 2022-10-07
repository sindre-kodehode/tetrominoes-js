export default class {
  constructor() {
    this.globalHiscoreEl = document.getElementById( "global-hi-scores" );
    this.fetchGlobalHiScore();
  }

  async insertHiScore( name, score, lines, level ) {
    if ( score <= 0 ) return;

    try {
      const url = "https://data.mongodb-api.com"
                + "/app/application-0-kptch/"
                + "endpoint/insertHiScore";

      const opt = {
        method  : "POST",
        headers : { "Content-Type" : "application/json" },
        body    : JSON.stringify(
          { 
            name  : name,
            lines : lines,
            level : level,
            score : score
          }),
      };

      await fetch( url, opt );

      this.fetchGlobalHiScore();
    }
    catch ( error ) {
      console.log( "error:", error );
    }
  }

  async fetchGlobalHiScore() {
    try {
      const url = "https://data.mongodb-api.com"
                + "/app/application-0-kptch/"
                + "endpoint/getTopHiScores";

      const res  = await fetch( url );
      const data = await res.json();

      let nameEl  = document.createElement( "p" );
      let scoreEl = document.createElement( "p" );

      nameEl.textContent  = "NAME";
      scoreEl.textContent = "SCORE";

      this.globalHiscoreEl.textContent = "";
      this.globalHiscoreEl.append( nameEl, scoreEl );

      data.forEach( ({ name, score }) => {
        nameEl  = document.createElement( "p" )
        scoreEl = document.createElement( "p" )

        nameEl.textContent  = name.toUpperCase();
        scoreEl.textContent = `${ score }`.padStart( 6, 0 );

        this.globalHiscoreEl.append( nameEl, scoreEl );
      });
    }
    catch ( error ) {
      console.log( "error:", error );
    }
  }
}

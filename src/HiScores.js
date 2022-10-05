export default class {
  constructor() {
    this.globalHiscoreEl = document.getElementById( "global-hi-scores" );
    this.userHiscoreEl   = document.getElementById( "user-hi-scores"   );
    this.top             = 0;

    this.fetchGlobalHiScore();
    this.fetchUserHiScore();
  }

  async insertHiScore( name, score ) {
    if ( score <= 0 ) return;

    try {
      const url = "https://data.mongodb-api.com"
                + "/app/application-0-kptch/"
                + "endpoint/insertHiScore";

      const opt = {
        method  : "POST",
        headers : { "Content-Type" : "application/json" },
        body    : JSON.stringify({ name : name, score : score }),
      };

      await fetch( url, opt );

      this.fetchUserHiScore();
      this.fetchGlobalHiScore();
    }
    catch ( error ) {
      console.log( "error:", error );
    }
  }

  async fetchUserHiScore() {
    try {
      const url = "https://data.mongodb-api.com"
                + "/app/application-0-kptch/"
                + "endpoint/getUserHiScores";

      const opt =
      { method  : "POST"
      , headers : { "Content-Type" : "application/json" }
      , body    : JSON.stringify({ name : "SIN" })
      };

      const res  = await fetch( url, opt );
      const data = await res.json();

      let nameEl  = document.createElement( "p" );
      let scoreEl = document.createElement( "p" );

      nameEl.textContent  = "NAME";
      scoreEl.textContent = "SCORE";

      this.userHiscoreEl.textContent = "";
      this.userHiscoreEl.append( nameEl, scoreEl );

      data.forEach( ({ name, score }) => {
        nameEl  = document.createElement( "p" )
        scoreEl = document.createElement( "p" )

        nameEl.textContent  = name.toUpperCase();
        scoreEl.textContent = `${ score }`.padStart( 6, 0 );

        this.userHiscoreEl.append( nameEl, scoreEl );
      });

      this.top = data[0].score;

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

export default class {
  constructor( column, row, color ) {
    this.color     = color;
    this.column    = column;
    this.row       = row;
    this.size      = 14;
    this.blocksize = 16;
  }

  get x() {
    return this.column * this.blocksize;
  }

  get y() {
    return this.row * this.blocksize;
  }

  get collision() {
    return this.column < 0 || this.column > 9 || this.row > 19;
  }

  draw( context ) {
    context.fillStyle = this.color;
    context.fillRect( this.x, this.y, this.size, this.size); 
  }
}

const FPS = 30;
const HEIGHT = 21;
const MILLI = 1000 / FPS;
const WIDTH = 12;

const SHAPES = [
  [
    [ false, true , false ],
    [ true , true , true  ],
    [ false, false, false ],
  ],
  [
    [ true , true , false ],
    [ false, true , true  ],
    [ false, false, false ],
  ],
  [
    [ false, true , true  ],
    [ true , true , false ],
    [ false, false, false ],
  ],
  [
    [ true , false, false ],
    [ true , true , true  ],
    [ false, false, false ],
  ],
  [
    [ false, false, true  ],
    [ true , true , true  ],
    [ false, false, false ],
  ],
  [
    [ true, true ],
    [ true, true ],
  ],
  [
    [ false, false, false, false ],
    [ true , true , true , true  ],
    [ false, false, false, false ],
    [ false, false, false, false ],
  ],
]

export {
  HEIGHT,
  MILLI,
  SHAPES,
  WIDTH,
};

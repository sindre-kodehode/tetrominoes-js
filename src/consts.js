const FPS    = 30;
const HEIGHT = 21;
const MILLI  = 1000 / FPS;
const WIDTH  = 12;

const SCORES = [ 0, 40, 100, 300, 1200 ];

const LEVELS = [
   10,  20,  30,  40,  50,
   60,  70,  80,  90, 100,
  100, 100, 100, 100, 100,
  100, 110, 120, 130, 140,
  150, 160, 170, 180, 190,
  200, 200, 200, 200,
];

const SPEEDS = [
  798, 715, 632, 549, 465,
  382, 299, 216, 133,  99,
   83,  83,  83,  66,  66,
   66,  49,  49,  49,  33,
   33,  33,  33,  33,  33,
   33,  33,  33,  16,
];

const SHAPES = [
  [
    [ 0, 1, 0 ],
    [ 1, 1, 1 ],
    [ 0, 0, 0 ],
  ],
  [
    [ 1, 1, 0 ],
    [ 0, 1, 1 ],
    [ 0, 0, 0 ],
  ],
  [
    [ 0, 1, 1 ],
    [ 1, 1, 0 ],
    [ 0, 0, 0 ],
  ],
  [
    [ 1, 0, 0 ],
    [ 1, 1, 1 ],
    [ 0, 0, 0 ],
  ],
  [
    [ 0, 0, 1 ],
    [ 1, 1, 1 ],
    [ 0, 0, 0 ],
  ],
  [
    [ 1, 1 ],
    [ 1, 1 ],
  ],
  [
    [ 0, 0, 0, 0 ],
    [ 1, 1, 1, 1 ],
    [ 0, 0, 0, 0 ],
    [ 0, 0, 0, 0 ],
  ],
]

export {
  HEIGHT,
  LEVELS,
  MILLI,
  SCORES,
  SHAPES,
  SPEEDS,
  WIDTH,
};

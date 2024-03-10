import { listenToMaxIterations } from '../maxIterations.js';

let maxIterations = 100;

listenToMaxIterations(newMaxIterations => {
  maxIterations = newMaxIterations;
});

function preciseMandelbrot(r, i) {

}

function naturalMandelbrot(r, i) {
  let zr = 0;
  let zi = 0;
  let iterations = 0;

  while (iterations < maxIterations) {
    const zrtemp = zr * zr - zi * zi + r;
    zi = 2 * zr * zi + i;
    zr = zrtemp;

    if (zr * zr + zi * zi > 4) {
      return iterations;
    }
    iterations++;
  }

  return -1; // Inside the Mandelbrot set 
}

export default function mandelbrot(r, i, usePrecise) {
  return naturalMandelbrot(r, i);
};

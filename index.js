import mouseDragInteraction from './modules/interactions/mouseDragInteraction.js';

const canvas = document.getElementById('myCanvas');

mouseDragInteraction.register(canvas);

function mandelbrot(x, y) {
    let zr = 0;
    let zi = 0;
    let i = 0;

    while (i < maxIterations) {
        const zrtemp = zr * zr - zi * zi + x;
        zi = 2 * zr * zi + y;
        zr = zrtemp;

        if (zr * zr + zi * zi > 4) {
            return i;
        }
        i++;
    }

    return -1; // Inside the Mandelbrot set 
}

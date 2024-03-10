const MAX_ITERACTIONS = 100;

export default function mandelbrot(r, i) {
    let zr = 0;
    let zi = 0;
    let iterations = 0;

    while (iterations < MAX_ITERACTIONS) {
        const zrtemp = zr * zr - zi * zi + r;
        zi = 2 * zr * zi + i;
        zr = zrtemp;

        if (zr * zr + zi * zi > 4) {
            return iterations;
        }
        iterations++;
    }

    return -1; // Inside the Mandelbrot set 
};

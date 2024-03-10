const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let isDragging = false;
let startX, startY;

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

function onDrag(dx, dy) {
    console.log(dx, dy);
}

canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const endX = event.clientX;
    const endY = event.clientY;

    onDrag(endX - startX, endY - startY);

    startX = endX;
    startY = endY;
});
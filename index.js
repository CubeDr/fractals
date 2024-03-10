import mandelbrot from './modules/fractals/mandelbrot.js';
import mouseDragInteraction from './modules/interactions/mouseDragInteraction.js';
import mouseZoomInteraction from './modules/interactions/mouseZoomInteraction.js';
import { InteractiveCanvas } from './modules/InteractiveCanvas.js';
import { attachMaxIterationsListener } from './modules/maxIterations.js';

const interactiveCanvas = new InteractiveCanvas(600, 400, mandelbrot);
const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

mouseDragInteraction.register(canvas, interactiveCanvas);
mouseZoomInteraction.register(canvas, interactiveCanvas);

const result = interactiveCanvas.populate();
for (let y = 0; y < result.length; y++) {
  for (let x = 0; x < result[y].length; x++) {
    const iterations = result[y][x];
    ctx.fillStyle = iterations === -1 ? 'black' : `hsl(${(iterations / 100) * 360}, 100%, 50%)`;
    ctx.fillRect(x, y, 1, 1);
  }
}

attachMaxIterationsListener();
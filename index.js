import mandelbrot from './modules/fractals/mandelbrot.js';
import mouseDragInteraction from './modules/interactions/mouseDragInteraction.js';
import mouseZoomInteraction from './modules/interactions/mouseZoomInteraction.js';
import { InteractiveCanvas } from './modules/interactiveCanvas/InteractiveCanvas.js';
import { attachMaxIterationsListener, listenToMaxIterations } from './modules/maxIterations.js';

const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');
const interactiveCanvas = new InteractiveCanvas(canvas.width, canvas.height, mandelbrot);

mouseDragInteraction.register(canvas, interactiveCanvas);
mouseZoomInteraction.register(canvas, interactiveCanvas);

const imageData = ctx.createImageData(canvas.width, canvas.height);
async function generateImageData(result) {
  for (let y = 0; y < result.length; y++) {
    for (let x = 0; x < result[y].length; x++) {
      const iterations = result[y][x];

      const index = (y * result[y].length + x) * 4;
      if (iterations === -1) {
        imageData.data[index] = 0;
        imageData.data[index + 1] = 0;
        imageData.data[index + 2] = 0;
        imageData.data[index + 3] = 255;
      } else {
        imageData.data[index] = 255;
        imageData.data[index + 1] = iterations / 100 * 255;
        imageData.data[index + 2] = 80;
        imageData.data[index + 3] = 255;
      }
    }
  }
}

function paint(result) {
  generateImageData(result).then(() => ctx.putImageData(imageData, 0, 0));
}

interactiveCanvas.listen(paint);

attachMaxIterationsListener();
listenToMaxIterations(() => {
  interactiveCanvas.populate();
});
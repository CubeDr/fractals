import AbstractInteraction from './AbstractInteraction.js';
import { InteractiveCanvas } from '../interactiveCanvas/InteractiveCanvas.js';

class MouseZoomInteraction extends AbstractInteraction {
  constructor() {
    super();
    this.interactiveCanvas_ = null;
  }

  zoomIn_(x, y) {
    this.interactiveCanvas_?.zoomIn(x, y);
  }

  zoomOut_(x, y) {
    this.interactiveCanvas_?.zoomOut(x, y);
  }

  /**
   * @param {HTMLCanvasElement} canvas 
   * @Param {InteractiveCanvas} interactiveCanvas
   */
  register(canvas, interactiveCanvas) {
    canvas.addEventListener('wheel', (event) => {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;

      if (event.deltaY > 0) {
        this.zoomOut_(x, y);
      } else if (event.deltaY < 0) {
        this.zoomIn_(x, y);
      }
    });

    this.interactiveCanvas_ = interactiveCanvas;
  }
}

const mouseZoomInteraction = new MouseZoomInteraction();
export default mouseZoomInteraction;

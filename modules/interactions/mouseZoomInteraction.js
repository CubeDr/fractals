import AbstractInteraction from './AbstractInteraction.js';

class MouseZoomInteraction extends AbstractInteraction {
  constructor() {
    super();
  }

  zoomIn_({clientX, clientY}) {
    console.log('zoom in');
  }

  zoomOut_({clientX, clientY}) {
    console.log('zoom out');
  }

  /**
   * @param {HTMLCanvasElement} canvas 
   */
  register(canvas) {
    canvas.addEventListener('wheel', (event) => {
      if (event.deltaY > 0) {
        this.zoomOut_(event);
      } else if (event.deltaY < 0) {
        this.zoomIn_(event);
      }
    });
  }
}

const mouseZoomInteraction = new MouseZoomInteraction();
export default mouseZoomInteraction;

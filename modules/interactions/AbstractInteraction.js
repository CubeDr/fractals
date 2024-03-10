import { InteractiveCanvas } from '../interactiveCanvas/InteractiveCanvas.js';

export default class AbstractInteraction {
  /**
   * @param {HTMLCanvasElement} canvas 
   * @Param {InteractiveCanvas} interactiveCanvas
   */
  register(canvas, interactiveCanvas) {
    throw new Error('Unimplemented');
  }
}

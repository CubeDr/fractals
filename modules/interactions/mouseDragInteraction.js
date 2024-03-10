import AbstractInteraction from './AbstractInteraction.js';
import { InteractiveCanvas } from '../InteractiveCanvas.js';

class MouseDragInteraction extends AbstractInteraction {
  constructor() {
    super();
    this.isDragging_ = false;
    this.startX_ = 0;
    this.startY_ = 0;
    this.interactiveCanvas_ = null;
  }

  onDrag_(dx, dy) {
    this.interactiveCanvas_?.move(dx, dy);

    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');

    const result = this.interactiveCanvas_.populate();
    for (let y = 0; y < result.length; y++) {
      for (let x = 0; x < result[y].length; x++) {
        const iterations = result[y][x];
        ctx.fillStyle = iterations === -1 ? 'black' : `hsl(${(iterations / 100) * 360}, 100%, 50%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  onMouseDown_({ clientX, clientY }) {
    this.isDragging_ = true;
    this.startX_ = clientX;
    this.startY_ = clientY;
  }

  onMouseUp_() {
    this.isDragging_ = false;
  }

  onMouseMove_({ clientX, clientY }) {
    if (!this.isDragging_) return;

    this.onDrag_(clientX - this.startX_, clientY - this.startY_);

    this.startX_ = clientX;
    this.startY_ = clientY;
  }

  /**
   * @param {HTMLCanvasElement} canvas 
   * @Param {InteractiveCanvas} interactiveCanvas
   */
  register(canvas, interactiveCanvas) {
    canvas.addEventListener('mousedown', this.onMouseDown_.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp_.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove_.bind(this));
    this.interactiveCanvas_ = interactiveCanvas;
  }
}

const mouseDragInteraction = new MouseDragInteraction();
export default mouseDragInteraction;

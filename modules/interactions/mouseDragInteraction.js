import AbstractInteraction from './AbstractInteraction.js';
import { InteractiveCanvas } from '../interactiveCanvas/InteractiveCanvas.js';

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

import AbstractInteraction from './AbstractInteraction.js';

class MouseDragInteraction extends AbstractInteraction {
    constructor() {
        super();
        this.isDragging_ = false;
        this.startX_ = 0;
        this.startY_ = 0;
    }

    onDrag_(dx, dy) {
        // TODO: Call InteractiveCanvas.move()
        console.log(dx, dy);
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
     */
    register(canvas) {
        canvas.addEventListener('mousedown', this.onMouseDown_.bind(this));
        canvas.addEventListener('mouseup', this.onMouseUp_.bind(this));
        canvas.addEventListener('mousemove', this.onMouseMove_.bind(this));
    }
}

const mouseDragInteraction = new MouseDragInteraction();
export default mouseDragInteraction;

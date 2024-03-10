import Bounds from './bounds.js';
import BufferedCanvas from './BufferedCanvas.js';

const realMin = -2.4; // LEFT x min
const realMax = 1.2; // RIGHT x max
const imagMin = -1.2; // bottom y min
const imagMax = 1.2; // top y max

const PRECISE_THRESHOLD = 0.00000000000001;

export class InteractiveCanvas {
  /**
   * 
   * @param {number} width // pixel
   * @param {number} height // height
   * @param {(r: number, i: number) => number} listener 
   */
  constructor(width, height, listener) {
    this.listener = listener;
    this.canvasBounds = new Bounds(0, 0, width, height);
    this.fractalBounds = new Bounds(realMin, imagMin, realMax - realMin, imagMax - imagMin);

    this.bufferedCanvas = new BufferedCanvas(width, height);

    this.resultListeners_ = new Set();
    this.populate();
  }

  listen(resultListener) {
    this.resultListeners_.add(resultListener);
    resultListener(this.bufferedCanvas.frontCanvas);
  }

  /**
   * 
   * @param {number} dpx 
   * @param {number} dpy 
   */
  async move(dpx, dpy) {
    const { x: dr, y: di } = this.canvasBounds.convertUnit(-dpx, -dpy, this.fractalBounds);
    this.fractalBounds.move(dr, di);

    for (let y = 0; y < this.canvasBounds.height; y++) {
      for (let x = 0; x < this.canvasBounds.width; x++) {
        const px = x - dpx;
        const py = y - dpy;

        if (this.bufferedCanvas.frontCanvas[py] != null && this.bufferedCanvas.frontCanvas[py][px] != null) {
          this.bufferedCanvas.setValue(x, y, this.bufferedCanvas.frontCanvas[py][px]);
        } else {
          const { x: r, y: i } = this.canvasBounds.convert(x, y, this.fractalBounds);
          this.bufferedCanvas.setValue(x, y, this.listener(r, i, this.fractalBounds.width < PRECISE_THRESHOLD));
        }
      }
    }

    
    this.bufferedCanvas.commit();
    this.notifyListeners_();
  }

  populate() {
    for (let y = 0; y < this.bufferedCanvas.height; y++) {
      for (let x = 0; x < this.bufferedCanvas.width; x++) {
        const { x: r, y: i } = this.canvasBounds.convert(x, y, this.fractalBounds);
        this.bufferedCanvas.setValue(x, y, this.listener(r, i, this.fractalBounds.width < PRECISE_THRESHOLD));
      }
    }

    this.bufferedCanvas.commit();
    this.notifyListeners_();
  }

  async previewZoomIn_(px, py) {
    for (let y = 0; y < this.bufferedCanvas.height; y++) {
      for (let x = 0; x < this.bufferedCanvas.width; x++) {
        const dx = x - px;
        const dy = y - py;

        const tx = Math.floor(dx / 2) + px;
        const ty = Math.floor(dy / 2) + py;
        this.bufferedCanvas.setValue(x, y, this.bufferedCanvas.frontCanvas[ty][tx]);
      }
    }
    
    this.bufferedCanvas.commit();
    this.notifyListeners_();
  }

  realZoomIn_(px, py) {
    const { x: r, y: i } = this.canvasBounds.convert(px, py, this.fractalBounds);
    this.fractalBounds.zoomIn(r, i);
    this.populate();
  }

  zoomIn(px, py) {
    this.previewZoomIn_(px, py).then(() => this.realZoomIn_(px, py));
  }

  zoomOut(px, py) {
    const { x: r, y: i } = this.canvasBounds.convert(px, py, this.fractalBounds);
    this.fractalBounds.zoomOut(r, i);

    this.populate();
  }

  notifyListeners_() {
    for (const resultListener of this.resultListeners_) {
      resultListener(this.bufferedCanvas.frontCanvas);
    }
  }
}
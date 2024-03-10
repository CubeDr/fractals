import Bounds from './bounds.js';

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

    this.map = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(null));

    this.resultListeners_ = new Set();
    this.populate();
  }

  listen(resultListener) {
    this.resultListeners_.add(resultListener);
    resultListener(this.map);
  }

  /**
   * 
   * @param {number} dpx 
   * @param {number} dpy 
   */
  move(dpx, dpy) {
    const { x: dr, y: di } = this.canvasBounds.convertUnit(-dpx, -dpy, this.fractalBounds);
    this.fractalBounds.move(dr, di);

    const newMap = new Array(this.canvasBounds.height)
      .fill(null)
      .map(() => new Array(this.canvasBounds.width).fill(null));

    for (let y = 0; y < this.canvasBounds.height; y++) {
      for (let x = 0; x < this.canvasBounds.width; x++) {
        const px = x - dpx;
        const py = y - dpy;

        if (this.map[py] != null && this.map[py][px] != null) {
          newMap[y][x] = this.map[py][px];
        } else {
          const { x: r, y: i } = this.canvasBounds.convert(x, y, this.fractalBounds);
          newMap[y][x] = this.listener(r, i, this.fractalBounds.width < PRECISE_THRESHOLD);
        }
      }
    }

    this.map = newMap;

    this.notifyListeners_();
  }

  populate() {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const { x: r, y: i } = this.canvasBounds.convert(x, y, this.fractalBounds);
        this.map[y][x] = this.listener(r, i, this.fractalBounds.width < PRECISE_THRESHOLD);
      }
    }

    this.notifyListeners_();
  }

  async previewZoomIn_(px, py) {
    const newMap = new Array(this.canvasBounds.height)
      .fill(null)
      .map(() => new Array(this.canvasBounds.width).fill(null));

    for (let y = 0; y < this.canvasBounds.height; y++) {
      for (let x = 0; x < this.canvasBounds.width; x++) {
        const dx = x - px;
        const dy = y - py;

        const tx = Math.floor(dx / 2) + px;
        const ty = Math.floor(dy / 2) + py;
        newMap[y][x] = this.map[ty][tx];
      }
    }
    this.map = newMap;
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
      resultListener(this.map);
    }
  }
}
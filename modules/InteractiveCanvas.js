const realMin = -2.0; // LEFT x min
const realMax = 1.0; // RIGHT x max
const imagMin = -1.2; // bottom y min
const imagMax = 1.2; // top y max
const realTotal = realMax - realMin;
const imagTotal = imagMax - imagMin;

export class InteractiveCanvas {
  /**
   * 
   * @param {number} width // pixel
   * @param {number} height // height
   * @param {(r: number, i: number) => number} listener 
   */
  constructor(width, height, listener) {
    // 좌표를 받아서 좌표에 해당하는 정수값을 계산하는 리스너
    this.width = width;
    this.height = height;
    this.listener = listener;
    this.leftTopR = realMin;
    this.leftTopI = imagMin;
    this.map = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(null));
    this.populate();
  }

  /**
   * 
   * @param {number} dpx 
   * @param {number} dpy 
   */
  move(dpx, dpy) {
    this.leftTopR += this.convertPixelToReal(dpx);
    this.leftTopI -= this.convertPixelToImaginary(dpy);
    return populate();
  }

  convertPixelToReal(px) {
    return px * realTotal / this.width;
  }

  convertPixelToImaginary(py) {
    return py * imagTotal / this.height;
  }

  populate() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        this.map[i][j] = this.listener(this.leftTopR + this.convertPixelToReal(i), this.leftTopI - this.convertPixelToImaginary(j))
      }
    }

    return this.map;
  }
}
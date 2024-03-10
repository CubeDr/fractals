const realMin = -2.4; // LEFT x min
const realMax = 1.2; // RIGHT x max
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
    this.leftTopI = imagMax;
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
    this.leftTopR -= this.convertPixelToReal(dpx);
    this.leftTopI += this.convertPixelToImaginary(dpy);
    
    console.log(dpx, dpy);
    
    // return this.populate();

    // 좌상단으로 드래그 했을 때 (즉, 보여지는 영역은 전체 그림의 우하단으로 이동)
    if (dpx <= 0 && dpy <= 0) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          if (i < this.height + dpy && j < this.width + dpx) {
            this.map[i][j] = this.map[i - dpy][j - dpx];
          }
          else {
            this.map[i][j] = this.listener(this.leftTopR + this.convertPixelToReal(j), this.leftTopI - this.convertPixelToImaginary(i));
          }
        }
      }
    }

    // 좌하단으로 드래그 했을 때 (즉, 보여지는 영역은 전체 그림의 우상단으로 이동)
    else if (dpx <= 0 && dpy > 0) {
      for (let i = this.height - 1; i >= 0; i--) {
        for (let j = 0; j < this.width; j++) {
          if (i >= dpy && j < this.width + dpx) {
            this.map[i][j] = this.map[i - dpy][j - dpx];
          }
          else {
            this.map[i][j] = this.listener(this.leftTopR + this.convertPixelToReal(j), this.leftTopI - this.convertPixelToImaginary(i));
          }
        }
      }
    }

    // 우상단으로 드래그 했을 때 (즉, 보여지는 영역은 전체 그림의 좌하단으로 이동)
    else if (dpx > 0 && dpy <= 0) {
      for (let i = 0; i < this.height; i++) {
        for (let j = this.width - 1; j >= 0; j--) {
          if (i < this.height + dpy && j >= dpx) {
            this.map[i][j] = this.map[i - dpy][j - dpx];
          }
          else {
            this.map[i][j] = this.listener(this.leftTopR + this.convertPixelToReal(j), this.leftTopI - this.convertPixelToImaginary(i));
          }
        }
      }
    }

    // 우하단으로 드래그 했을 때 (즉, 보여지는 영역은 전체 그림의 좌상단으로 이동)
    else {
      for (let i = this.height - 1; i >= 0; i--) {
        for (let j = this.width - 1; j >= 0; j--) {
          if (i >= dpy && j >= dpx) {
            this.map[i][j] = this.map[i - dpy][j - dpx];
          }
          else {
            this.map[i][j] = this.listener(this.leftTopR + this.convertPixelToReal(j), this.leftTopI - this.convertPixelToImaginary(i));
          }
        }
      }
    }

    this.notifyListeners_();
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
        this.map[i][j] = this.listener(this.leftTopR + this.convertPixelToReal(j), this.leftTopI - this.convertPixelToImaginary(i));
      }
    }

    this.notifyListeners_();
  }

  zoomIn(px, py) {
    const newMap = new Array(this.height)
      .fill(null)
      .map(() => new Array(this.width).fill(null));

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
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

  notifyListeners_() {
    for (const resultListener of this.resultListeners_) {
      resultListener(this.map);
    }
  }
}
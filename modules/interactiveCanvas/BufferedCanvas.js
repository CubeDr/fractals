function new2DArray(width, height) {
    return new Array(height)
        .fill(null)
        .map(() => new Array(width).fill(null));
}

export default class BufferedCanvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.canvas1_ = new2DArray(width, height);
        this.canvas2_ = new2DArray(width, height);

        this.frontCanvas = this.canvas1_;
        this.bufferCanvas_ = this.canvas2_;
    }

    commit() {
        const temp = this.frontCanvas;
        this.frontCanvas = this.bufferCanvas_;
        this.bufferCanvas_ = temp;
    }

    setValue(x, y, value) {
        this.bufferCanvas_[y][x] = value;
    }
}

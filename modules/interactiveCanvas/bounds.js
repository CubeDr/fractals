export default class Bounds {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    /**
     * Zoom bounds relative to centerX, centerY
     * @param {number} centerX 
     * @param {number} centerY 
     */
    zoom(centerX, centerY) {
        this.x = (this.x + centerX) / 2;
        this.y = (this.y + centerY) / 2;
        this.width /= 2;
        this.height /= 2;
    }

    /**
     * Convert (x, y) in this Bounds into another Bounds.
     * @param {number} x 
     * @param {number} y 
     * @param {Bounds} bounds 
     */
    convert(x, y, bounds) {
        const normalizedX = (x - this.x) / this.width;
        const normalizedY = (y - this.y) / this.height;
        return {
            x: bounds.x + normalizedX * bounds.width,
            y: bounds.y + normalizedY * bounds.height,
        };
    }

    convertUnit(x, y, bounds) {
        return {
            x: x * bounds.width / this.width,
            y: y * bounds.height / this.height,
        };
    }
}

class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    copy() {
        return new Vector2(this.x, this.y);
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    scale(factor) {
        if(isNaN(factor)) return;
        this.x *= factor;
        this.y *= factor;
        return this;
    }

    static scale(vec, factor) {
        if(isNaN(factor)) return;
        return new Vector2(vec.x * factor, vec.y * factor);
    }

    normalize() {
        this.scale(1/this.magnitude());
        return this;
    }

    static add(vec_a, vec_b) {
        return new Vector2(vec_a.x + vec_b.x, vec_a.y + vec_b.y);
    }

    static sub(vec_a, vec_b) {
        return new Vector2(vec_a.x - vec_b.x, vec_a.y - vec_b.y);
    }

    static down() {
        return new Vector2(0, 1);
    }
}
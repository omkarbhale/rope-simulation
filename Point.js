class Point {
    // Vector2 position
    // Vector2 prevPosition
    // Boolean locked

    constructor(position) {
        this.position = position.copy();
        this.prevPosition = position.copy();

        this.unlock();

        this.diameter = 20;
        this.hovered = false;
    }

    checkHovered(mX, mY) {
        if(mX > this.position.x - this.diameter/2 && mX < this.position.x + this.diameter/2) {
            if(mY > this.position.y - this.diameter/2 && mY < this.position.y + this.diameter/2) {
                this.hovered = true;
                return true;
            }
        }
        this.hovered = false;
        return false;
    }

    lock() {
        console.log("locking...");
        this.color = {
            r: 200, g: 25, b: 110
        }
        this.locked = true;
    }

    unlock() {
        this.color = {
            r: 255, g: 255, b: 255
        }
        this.locked = false;
    }

    toggleLock() {
        if(this.locked) {
            this.unlock();
            return;
        } else {
            this.lock()
            return;
        }
    }

    show() {
        push()
        noStroke()
        fill(this.color.r, this.color.g, this.color.b);
        if(this.hovered) {
            fill(150, 0, 255)
        }
        ellipse(this.position.x, this.position.y, this.diameter);
        pop()
    }

    static hovered(points, mousex, mousey) {
        for(let i = 0; i < points.length; i++) {
            if(points[i].checkHovered(mousex, mousey)) {
                return points[i];
            }
        }
        return false;
    }
}
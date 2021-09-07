class Stick {
    // Point pointA
    // point pointB
    // float length

    constructor(pointA, pointB) {
        this.pointA = pointA;
        this.pointB = pointB;

        let x1_x2_2 = (pointA.position.x - pointB.position.x) * (pointA.position.x - pointB.position.x);
        let y1_22_2 = (pointA.position.y - pointB.position.y) * (pointA.position.y - pointB.position.y);
        this.length = Math.sqrt(x1_x2_2 + y1_22_2);
    }

    show() {
        line(this.pointA.position.x, this.pointA.position.y, this.pointB.position.x, this.pointB.position.y);
    }
}
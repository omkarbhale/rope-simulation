
let points = [];
let sticks = [];

const gravity = 0.05;

let makingPoints = true;

let makingSticks = false;
let pointA = false, pointB = false

let simulating = false;

function setup() {
    createCanvas(1080, 720);
}

function draw() {
    background(52)

    Point.hovered(points, mouseX, mouseY);
    points.forEach(p => {
        p.show();
    })


    sticks.forEach(stick => {
        stick.show();
    })

    if(simulating) {
        simulate();
    }
}

function mousePressed() {

    if(makingSticks) {
        if(!pointA) {
            pointA = Point.hovered(points, mouseX, mouseY);
        } else if(!pointB) {
            pointB = Point.hovered(points, mouseX, mouseY);
        }

        if(pointA && pointB) {
            sticks.push(new Stick(pointA, pointB))
            pointA = false;
            pointB = false;
        }

        return;
    }

    if(makingPoints) {
        points.push(new Point(new Vector2(mouseX, mouseY)));
    } else {
        let point = Point.hovered(points, mouseX, mouseY);
        if(point) {
            point.toggleLock();
        }
    }
}


function simulate() {
    points.forEach(p => {
        if(!p.locked) {
            let positionBeforeUpdate = p.position.copy();
            // p.position += p.position - p.prevPosition;
            p.position.add( Vector2.sub(p.position, p.prevPosition ));
            // p.position += Vector2.down * gravity 
            p.position.add( Vector2.down().scale(gravity) );
            // console.log(Vector2.down().scale(gravity));
            p.prevPosition = positionBeforeUpdate
        }
    });

    const numIterations = 10;
    for(let i = 0; i < numIterations; i++) {
        sticks.forEach(stick => {
            // let stickCenter = (stick.pointA.position + stick.pointB.position) / 2;
            let stickCenter = Vector2.add(stick.pointA.position, stick.pointB.position).scale(0.5);
            // let stickDir = (stick.pointA.position - stick.pointB.position).normalized();
            let stickDir = Vector2.sub(stick.pointA.position, stick.pointB.position).normalize();
            if(!stick.pointA.locked) {
                // stick.pointA.position = stickCenter + stickDir * stick.length / 2;
                stick.pointA.position = Vector2.add( stickCenter, Vector2.scale(stickDir, stick.length/2) );
            }
            if(!stick.pointB.locked) {
                // stick.pointB.position = stickCenter - stickDir * stick.length / 2;
                stick.pointB.position = Vector2.sub( stickCenter, Vector2.scale(stickDir, stick.length/2) );
            }
        });
    }
}
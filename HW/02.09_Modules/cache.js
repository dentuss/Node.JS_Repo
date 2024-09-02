function Point(x,y)
{
    this.x=x;
    this.y=y;
    this.print = ()=>{
        console.log('X = '+this.x+" Y = " + this.y);
    }
}

function LineInterface(point1, point2) {

    this.point1 = point1
    this.point2 = point2

    this.isParallel = () => {

        if (point1.x === point2.x) {

            return (console.log("Line is Parallel to Y"));
        }
        if (point1.y === point2.y) {

            return (console.log("Line is Parallel to X"));
        }
    }
}

function Rectangle(pointA, pointB, pointC, pointD) {

    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;
    this.pointD = pointD;

    this.print = () => {

        return console.log(this.pointA + " " + this.pointB + " " + this.pointC + " " + this.pointD + " ");
    }
}
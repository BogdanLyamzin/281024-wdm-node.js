namespace Shapes {
    export class Circle {
        constructor(public radius: number) {
            this.radius = radius;
        }

        getArea() {
            return Math.PI * this.radius ** 2
        }
    }

    export class Sqaure {
        constructor(public side: number) {
            this.side = side;
        }

        getArea() {
            return this.side * this.side;
        }
    }
}

const circle = new Shapes.Circle(10);
console.log(circle.getArea());
const square = new Shapes.Sqaure(10);
console.log(square.getArea());

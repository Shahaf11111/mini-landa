
import React from "react";
import * as Konva from "react-konva";
import { Side } from "../../interfaces";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = RGB | RGBA | HEX;

interface IShape {
    x: number;
    y: number;
    fill: Color;
}

export abstract class Shape implements IShape {
    x: number;
    y: number;
    fill: Color;

    constructor(x: number, y: number, fill: Color) {
        this.x = x
        this.y = y
        this.fill = fill
    }

    abstract draw(): React.ReactElement;

    getSide(containerWidth?: number): Side {
        const threshold = containerWidth ? containerWidth / 2 : window.innerWidth / 2;
        return this.x > Math.floor(threshold) ? Side.right : Side.left;
    }
}

class Circle extends Shape {
    radius: number;

    constructor(x: number, y: number, fill: Color, radius: number) {
        super(x, y, fill);
        this.radius = radius;
    }

    draw(): React.ReactElement {
        return (
            <Konva.Circle
                x={this.x}
                y={this.y}
                radius={this.radius}
                fill={this.fill}
                stroke="black"
                strokeWidth={2}
            />
        );
    }
}

class Rectangle extends Shape {
    height: number;
    width: number;

    constructor(x: number, y: number, fill: Color, height: number, width: number) {
        super(x, y, fill);
        this.height = height;
        this.width = width;
    }

    draw(): React.ReactElement {
        return (
            <Konva.Rect
                x={this.x}
                y={this.y}
                width={this.width}
                height={this.height}
                fill={this.fill}
                stroke="black"
                strokeWidth={2}
            />
        );
    }
}

class Square extends Shape {
    size: number;

    constructor(x: number, y: number, fill: Color, size: number) {
        super(x, y, fill);
        this.size = size;
    }

    draw(): React.ReactElement {
        return (
            <Konva.Rect
                x={this.x}
                y={this.y}
                width={this.size}
                height={this.size}
                fill={this.fill}
                stroke="black"
                strokeWidth={2}
            />
        );
    }
}

class IsoscelesTriangle extends Shape {
    points: number[];
    size: number;

    constructor(x: number, y: number, fill: Color, size: number) {
        super(x, y, fill);
        this.size = size;
        this.points = this.calcPoints(size);
    }

    calcPoints(size: number): number[] {
        const points = [0, 0];
        points.push(0, size);
        points.push(size, 0);
        return points;
    }

    draw(): React.ReactElement {
        return (
            <Konva.Line
                x={this.x}
                y={this.y}
                points={this.points}
                fill={this.fill}
                rotation={45}
                closed
                stroke="black"
                strokeWidth={2}
            />
        );
    }
}

enum Shapes {
    circle = "circle",
    rectangle = "rectangle",
    square = "square",
    isoscelesTriangle = "isoscelesTriangle",
}

class ShapeFactory {
    height: number;
    width: number;

    constructor(height?: number, width?: number) {
        this.height = height || window.innerHeight;
        this.width = width || window.innerWidth;
    }

    setContainer(height: number, width: number) {
        this.height = height;
        this.width = width;
    }

    randomShapeType(): string {
        const arr: string[] = Object.values(Shapes);
        return arr[Math.floor(Math.random() * arr.length)];
    }

    random(min = 0, max: number) {
        return Math.floor((Math.random() * max) + min);
    }

    randomFill(): HEX {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    randomSide(): Side {
        return Math.floor(Math.random() * 2) % 2 == 0 ? Side.left : Side.right;
    }

    createShape(): IShape {
        const fill: HEX = this.randomFill();
        const x = this.random(0, this.width);
        const y = this.random(0, this.height);
        return { x, y, fill };
    }

    createRectangle() {
        const { x, y, fill } = this.createShape();
        const width = this.random(10, Math.abs(this.width / 2 - x));
        const height = this.random(10, this.height - y);
        return new Rectangle(x, y, fill, height, width);
    }

    createCircle() {
        const { x, y, fill } = this.createShape();
        const radius = this.random(10, Math.abs(this.width / 2 - x));
        return new Circle(x, y, fill, radius);
    }

    createSquare() {
        const { x, y, fill } = this.createShape();
        const size = this.random(10, Math.abs(this.width / 2 - x));
        return new Square(x, y, fill, size);
    }

    createIsoscelesTriangle() {
        const { x, y, fill } = this.createShape();
        const size = this.random(10, 1.5 * Math.abs(this.width / 2 - x));
        return new IsoscelesTriangle(x, y, fill, size);
    }

    create(shapeType?: string): Shape {
        if (!shapeType) {
            shapeType = this.randomShapeType();
        }
        if (shapeType === Shapes.circle) {
            return this.createCircle();
        }
        if (shapeType === Shapes.rectangle) {
            return this.createRectangle();
        }
        if (shapeType === Shapes.square) {
            return this.createSquare();
        }
        if (shapeType === Shapes.isoscelesTriangle) {
            return this.createIsoscelesTriangle();
        }
        throw new Error(`no matching shape type for requested ${shapeType}`);
    }

    draw(shapeType?: string): [Side, React.ReactElement] {
        const shape = this.create(shapeType);
        return [
            shape.getSide(this.width),
            (
                <Konva.Stage height={this.height} width={this.width}>
                    <Konva.Layer>
                        {shape.draw()}
                        <Konva.Line
                            x={this.width / 2}
                            y={0}
                            points={[0, 0, 0, this.height]}
                            stroke="black" />
                    </Konva.Layer>
                </Konva.Stage>
            )
        ];
    }
}

export default ShapeFactory;

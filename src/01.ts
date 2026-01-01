import { Input } from "./utils.ts";

const day = 1;

type Direction = "L" | "R";

type Instruction = {
    direction: Direction, 
    amount: number
}

function validateDirection(arg0: string | undefined): arg0 is Direction {
    return typeof arg0 === "string" && ["L", "R"].includes(arg0);
}

function parse(input: string): Instruction {
    const protoDirection = input[0];
    const protoAmount = Number(input.slice(1));
    if(validateDirection(protoDirection) && !Number.isNaN(protoAmount)) {
        return {
            direction: protoDirection,
            amount: protoAmount
        }
    } else {
        throw `invalid Input: "${input}"`;
    }
}

const input = Input.load(day).asLines().parse(parse);

function simulate(start: number, sequence: Instruction[]): number {
    let position = start;
    const toHit = 0;
    let hitCounter = 0;
    for (let instruction of sequence) {
        if(instruction.direction === "L") {
            position -= instruction.amount;
        } else {
            position += instruction.amount;
        }
        position = (position + 100) % 100;
        if(position === toHit)
            hitCounter++;
    }
    return hitCounter;
}

console.log(simulate(50, input.asArray()));
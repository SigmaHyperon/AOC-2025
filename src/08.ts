import Graph from "graphology";
import { connectedComponents, largestConnectedComponent } from "graphology-components";
import { product } from "./lib/collections.ts";
import { Point3 } from "./lib/geometry.ts";
import { Input } from "./lib/input.ts";

const input = Input.load(8, false).asLines().parse(v => {
        const [x, y, z] = v.split(",").map(k => Number(k));
        return new Point3(x, y, z);
    }
);

type Link = {a: Point3, b: Point3, distance: number};

function simulateLinks(points: Point3[]): Link[] {
    const links: Link[] = [];
    for (let i = 0; i < points.length; i++) {
        const current = points[i];
        for (let k = i + 1; k < points.length; k ++) {
            const companion = points[k];
            if(!current || !companion)
                throw "Array access dumbass";
            links.push({
                a: current,
                b: companion,
                distance: current.to(companion).length()
            })
        }
    }
    return links;
}

function part1() {
    const remaining = [...input.asArray()];
    const simulation = simulateLinks(remaining).sort((a, b) => b.distance - a.distance).reverse().slice(0, 1000);
    const graph = new Graph.MultiUndirectedGraph();
    for(let junction of remaining) {
        graph.addNode(junction.toString());
    }
    for(let link of simulation.slice(0, 1000)) {
        graph.addEdge(link.a.toString(), link.b.toString());
        if(largestConnectedComponent(graph).length >= remaining.length) {
            return link.a.x * link.b.x;
        }
    }
    const components = connectedComponents(graph);
    const componentSizes = components.map(v => v.length).sort((a, b) => b - a)
    return product(componentSizes.slice(0, 3));
}

console.log(part1());

function part2() {
    const remaining = [...input.asArray()];
    const simulation = simulateLinks(remaining).sort((a, b) => b.distance - a.distance).reverse();
    const graph = new Graph.MultiUndirectedGraph();
    for(let junction of remaining) {
        graph.addNode(junction.toString());
    }
    for(let link of simulation) {
        graph.addEdge(link.a.toString(), link.b.toString());
        if(largestConnectedComponent(graph).length >= remaining.length) {
            return link.a.x * link.b.x;
        }
    }
}

console.log(part2());
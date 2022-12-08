import * as fs from 'fs';
import {splitLines} from '../common';

class Grid {
    private data: number[];
    width = 0;
    height = 0;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
        this.data = new Array(width * height).fill(0);
    }
    private getIdx(x: number, y: number): number {
        return y * this.width + x;
    }
    set(x: number, y: number, val: number){
        this.data[this.getIdx(x,y)] = val;
    }
    get(x: number, y: number): number{
        return this.data[this.getIdx(x,y)];
    }
    onGrid(x: number, y: number): boolean{
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    }
    getScore(x: number, y: number): number{
        const dirs = [[1,0],[-1,0],[0,1],[0,-1],];
        const scores: number[] = [];
        // let vis = false;
        const th = this.get(x,y);
        for (const [dx,dy] of dirs) {
            let [cx,cy] = [x, y];
            scores.push(0);
            while(true){
                cx+=dx; cy+=dy;
                if(!this.onGrid(cx,cy)) break;
                scores[scores.length-1]++;
                if(this.get(cx,cy) >= th) break;
            }
        }
        return scores.reduce((a,b)=>a*b, 1);
    }
}

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const grid = new Grid(lines.length, lines.length);
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++){
            grid.set(i, j, +line[j]);
        }
    }
    let total = 0;
    for (let i = 0; i < grid.width; i++) {
        for (let j = 0; j < grid.height; j++){
            // if(grid.isVisible(i, j)) total++;
            const score = grid.getScore(i,j);
            total = Math.max(total, score);
        }
    }
    console.log(total);
    
}

main(fs.readFileSync('./2022/d8-i.txt', {encoding: 'utf-8'}));

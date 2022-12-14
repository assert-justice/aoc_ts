import * as fs from 'fs';
import {splitLines, Grid} from '../../common';

enum State{
    Empty,
    Rock,
    Sand
}

type vec2 = [number, number];

function findExtents(lines: string[]):[number,number,number,number]{
    let [xMin, xMax, yMin, yMax] = [Infinity, -Infinity, Infinity, -Infinity];
    for (const line of lines) {
        for (const seg of line.split('->')) {
            const [cx, cy] = seg.split(',').map(Number);
            
            xMin = Math.min(xMin, cx);
            xMax = Math.max(xMax, cx);
            yMin = Math.min(yMin, cy);
            yMax = Math.max(yMax, cy);
        }
    }
    return [xMin, xMax, yMin, yMax];
}

function print(grid: Grid<State>){
    const lookup = '.#o';
    for(let y = 0; y < grid.height; y++){
        const line: string[] = [];
        for(let x = 0; x < grid.width; x++){
            const val = grid.get(x, y);
            
            line.push(lookup[val]);
        }
        console.log(line.join(''));
        
    }
}

function drawWalls(grid: Grid<State>, lines: string[], xMin: number, yMin: number):void{
    for (const line of lines) {
        const segments = line.split('->');
        for (let i = 0; i < segments.length - 1; i++) {
            const [ax, ay] = segments[i].split(',').map(Number);
            const [bx, by] = segments[i+1].split(',').map(Number);
            grid.setLine(ax-xMin, ay-yMin, bx-xMin, by-yMin, State.Rock);
        }
    }
}

function simGrain(grid: Grid<State>, sx: number, sy: number): boolean{
    let [x, y] = [sx, sy];
    const isEmpty = (x: number, y: number) => !grid.onGrid(x, y) || grid.get(x, y) === State.Empty;
    for(let i = 0; true; i++){
        // console.log(x, y);
        
        if(!grid.onGrid(x, y)) return false;
        if(isEmpty(x, y+1)) {y++;}
        else if(isEmpty(x-1,y+1)) {x--; y++;}
        else if(isEmpty(x+1, y+1)){x++; y++;}
        else{break;}
    }
    grid.set(x, y, State.Sand);
    return true;
}

function main(text: string): void{
    const lines = splitLines(text);
    // console.log(findExtents(lines));
    
    const [xMin, xMax, yMin, yMax] = findExtents(lines);
    const grid = new Grid<State>(xMax - xMin + 20, yMax - yMin + 20, State.Empty);
    drawWalls(grid, lines, xMin - 9, yMin - 9);
    // console.log(grid.get(498, 4));
    let count = 0;
    while(simGrain(grid, 500 - xMin + 9, 0))count++;
    
    print(grid);
    console.log(count);
    
}

main(fs.readFileSync('./2022/d14/input.txt', {encoding: 'utf-8'}));

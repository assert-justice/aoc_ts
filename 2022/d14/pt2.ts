import * as fs from 'fs';
import {splitLines, HashGrid2D} from '../../common';

enum State{
    Empty,
    Rock,
    Sand
}

function print(grid: HashGrid2D<State>, xMin: number, xMax: number, yMin: number, yMax: number){
    const lookup = '.#o';
    for(let y = yMin; y <= yMax; y++){
        const line: string[] = [];
        for(let x = xMin; x <= xMax; x++){
            const val = grid.get(x, y);
            
            line.push(lookup[val]);
        }
        console.log(line.join(''));
        
    }
}

function drawWalls(grid: HashGrid2D<State>, lines: string[]):void{
    for (const line of lines) {
        const segments = line.split('->');
        for (let i = 0; i < segments.length - 1; i++) {
            const [ax, ay] = segments[i].split(',').map(Number);
            const [bx, by] = segments[i+1].split(',').map(Number);
            
            grid.setLine(ax, ay, bx, by, State.Rock);
        }
    }
}

function simGrain(grid: HashGrid2D<State>, sx: number, sy: number, yMax: number): boolean{
    if(grid.get(sx, sy) === State.Sand) return false;
    let [x, y] = [sx, sy];
    for(let i = 0; true; i++){
        // console.log(x, y);
        
        if(y > yMax) break;
        if(grid.get(x, y+1) === State.Empty) {y++;}
        else if(grid.get(x-1,y+1) === State.Empty) {x--; y++;}
        else if(grid.get(x+1, y+1) === State.Empty) {x++; y++;}
        else{break;}
    }
    grid.set(x, y, State.Sand);
    return true;
}

function main(text: string): void{
    const lines = splitLines(text);
    // console.log(findExtents(lines));
    
    const grid = new HashGrid2D<State>(State.Empty);
    
    drawWalls(grid, lines);
    let [xMin, xMax, yMin, yMax] = grid.getExtents();
    // console.log(grid.get(498, 4));
    let count = 0;
    while(simGrain(grid, 500, 0, yMax))count++;
    
    print(grid, xMin-5, xMax+5, yMin-5, yMax+5);
    console.log(count);
    
}

main(fs.readFileSync('./2022/d14/input.txt', {encoding: 'utf-8'}));

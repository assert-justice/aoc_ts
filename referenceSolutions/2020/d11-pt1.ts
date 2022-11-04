import * as fs from 'fs';

function genGrid(lines: string[]): Map<string, boolean>{
    const grid = new Map<string, boolean>();
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let f = 0; f < line.length; f++) {
            const c = line[f];
            if(c === 'L'){
                grid.set(`${i}-${f}`, false);
            }
        }
    }
    return grid;
}

function getAdj(grid: Map<string, boolean>, x: number, y: number): number{
    let count = 0;
    for(let i = -1; i < 2; i++){
        for(let f = -1; f < 2; f++){
            if (i === 0 && f === 0) continue;
            if(grid.get(`${x+i}-${y+f}`)) count++;
            // console.log(x+i, ' ', y+f, ' ', grid.get(`${x+i}-${y+f}`));
            
        }
    }
    // console.log(count);
    
    return count;
}

function sim(grid: Map<string, boolean>): number{
    let changed = 0;
    const newGrid = new Map<string, boolean>();
    for (let [coords,occupied] of grid.entries()) {
        const [x,y] = coords.split('-').map(Number);
        const count = getAdj(grid, x, y);
        if(occupied && count > 3) {
            occupied = false;
            changed++;
        }
        else if(!occupied && count === 0){
            occupied = true;
            changed++;
        }
        newGrid.set(`${x}-${y}`, occupied);
    }
    grid.clear();
    for (const [key, value] of newGrid.entries()) {
        grid.set(key, value);
    }
    return changed;
}

function main(text: string): void{
    const lines = text.trim().split('\n');
    let grid = genGrid(lines);
    let changed = 1;
    let sims = 0;
    while(changed){
        changed = sim(grid);
        sims++;
    }
    // console.log(getAdj(grid, 0, 0));
    
    const ans = [...grid.values()].filter(val => val).length;
    console.log(ans);
    // console.log(sims);
    
}

main(fs.readFileSync('./2020/d11-i.txt', {encoding: 'utf-8'}));

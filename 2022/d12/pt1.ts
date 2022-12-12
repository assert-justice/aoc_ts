import * as fs from 'fs';
import {splitLines, Grid} from '../../common';

function getKey(x: number, y: number): string{
    return `${x}:${y}`;
}

function getCoords(key: string):[number, number]{
    const [x,y] = key.split(':').map(Number);
    return [x,y];
}

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const grid = new Grid<number>(lines[0].length, lines.length, 0);
    let [start, end] = ['',''];
    const alp = 'abcdefghijklmnopqrstuvwxyz';
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            const c = line[x];
            let val = 0;
            if(c === 'S'){
                start = getKey(x,y);
            }
            else if(c === 'E'){
                end = getKey(x,y);
                val = 25;
            }
            else{
                val = alp.indexOf(c);
            }
            grid.set(x, y, val);
        }
    }
    let open = new Map([[start, 0]]);
    const closed: typeof open = new Map();
    const dirs: [number, number][] = [[1,0],[0,1],[-1,0],[0,-1]];

    while(open.size > 0){
        const tOpen: typeof open = new Map();
        for (const [key, cost] of open.entries()) {
            if(key === end){
                console.log(cost);
                return;
            }
            const [x,y] = getCoords(key);
            const val = grid.get(x,y);
            for (const [i, j] of dirs) {
                const [tx, ty] = [x+i, y+j];
                const nk = getKey(tx, ty);
                if(!grid.onGrid(tx, ty)) continue;
                const tv = grid.get(tx, ty);
                if(tv > val + 1) continue;
                if(open.has(nk) || closed.has(nk)) continue;
                tOpen.set(nk, cost + 1);
            }
            closed.set(key, cost);
        }
        open = tOpen;
    }
}

main(fs.readFileSync('./2022/d12/input.txt', {encoding: 'utf-8'}));

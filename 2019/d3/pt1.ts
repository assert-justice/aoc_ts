import * as fs from 'fs';
import {splitLines, vec2, HashGrid2D} from '../../common';

function main(text: string): void{
    // Solution here.
    const dirs: vec2[] = [[-1,0],[1,0],[0,-1],[0, 1]];
    const dNames = 'LRUD';
    const grid = new HashGrid2D<number>(0);
    const collide = new Set<string>();
    const lines = splitLines(text);
    let [x,y] = [0,0];
    for (const seg of lines[0].split(',')) {
        const [dx,dy] = dirs[dNames.indexOf(seg[0])];
        
        for (let i = 0; i < +seg.slice(1); i++) {
            grid.set(x,y,1);
            [x,y] = [x+dx, y+dy];
        }
        grid.set(x,y,1);
    }
    const set = (x: number, y: number)=>{
        const v = grid.get(x,y);
        if(v === 1){
            grid.set(x,y,3);
            collide.add(grid.toKey(x,y));
        }
        else{
            grid.set(x,y,2);
        }
    }
    [x,y] = [0,0];
    for (const seg of lines[1].split(',')) {
        const [dx,dy] = dirs[dNames.indexOf(seg[0])];
        for (let i = 0; i < +seg.slice(1); i++) {
            set(x,y);
            [x,y] = [x+dx, y+dy];
        }
        set(x,y);
    }
    grid.set(0,0,4);
    const [xMin, xMax, yMin, yMax] = grid.getExtents();
    
    // const txt = grid.toString(xMin, xMax, yMin, yMax, (v)=>'.#o+x'[v]);
    // fs.writeFileSync('./2019/d3/out.txt', txt);
    // console.log([xMin, xMax, yMin, yMax]);
    
    collide.delete('0:0');
    // console.log(collide);
    let min = Infinity;
    for (const key of collide.keys()) {
        const [x,y] = grid.toCoord(key);
        min = Math.min(min, Math.abs(x) + Math.abs(y));
    }
    console.log(min);
    
}

main(fs.readFileSync('./2019/d3/input.txt', {encoding: 'utf-8'}));

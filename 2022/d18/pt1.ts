import * as fs from 'fs';
import {splitLines} from '../../common';

type vec3 = [number, number, number];

function toCoord(key: string): vec3{
    const [x,y,z] = key.split(',').map(Number);
    return [x,y,z];
}

function toKey(coord: vec3): string{
    return coord.join(',');
}

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const data = new Set(lines);
    const dirs = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
    let area = 0;
    for (const cube of data) {
        const [x,y,z] = toCoord(cube);
        for (const dir of dirs) {
            const [dx,dy,dz] = dir;
            if(!data.has(toKey([x+dx, y+dy, z+dz]))) area++;
        }
    }
    console.log(area);
    
}

main(fs.readFileSync('./2022/d18/input.txt', {encoding: 'utf-8'}));

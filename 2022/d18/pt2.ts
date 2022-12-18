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

function getExtents(data: Set<string>): [vec3, vec3]{
    const min: vec3 = [Infinity, Infinity, Infinity];
    const max: vec3 = [-Infinity, -Infinity, -Infinity];

    for (const str of data) {
        const cube = toCoord(str);
        for (let i = 0; i < cube.length; i++) {
            const v = cube[i];
            min[i] = Math.min(min[i], v);
            max[i] = Math.max(max[i], v);
        }
    }

    return [min, max];
}

function isOutside(cube: vec3, min: vec3, max: vec3): boolean{
    for (let i = 0; i < cube.length; i++) {
        const v = cube[i];
        if(v < min[i] - 1|| v > max[i] + 1) return true;
    }
    return false;
}

function getAdj([x,y,z]: vec3): string[]{
    const dirs: vec3[] = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
    return dirs.map(([dx, dy, dz]) => toKey([x+dx, y+dy, z+dz]));
}

function flood(data: Set<string>, cube: vec3): Set<string>{
    const closed = new Set<string>();
    const [min, max] = getExtents(data);
    let open = new Set([toKey(cube)]);
    // console.log(open);
    
    while(open.size > 0){
        const nOpen = new Set<string>();
        for (const key of open.keys()) {
            for (const cube of getAdj(toCoord(key))) {
                
                if(isOutside(toCoord(cube), min, max)) continue;
                if(!data.has(cube) && !open.has(cube) && !closed.has(cube)) nOpen.add(cube);
                // console.log(nOpen);
            }
            closed.add(key);
        }
        open = nOpen;
        // break;
    }
    return closed;
}

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const data = new Set(lines);
    const external = flood(data, [0,0,0]);
    
    let area = 0;
    for (const cube of data) {
        const adj = getAdj(toCoord(cube));
        for (const key of adj) {
            if(external.has(key)) area++;
        }
        // const [x,y,z] = toCoord(cube);
        // for (const dir of dirs) {
        //     const [dx,dy,dz] = dir;
        //     if(!data.has(toKey([x+dx, y+dy, z+dz]))) area++;
        // }
    }
    console.log(area);
    
}

main(fs.readFileSync('./2022/d18/input.txt', {encoding: 'utf-8'}));

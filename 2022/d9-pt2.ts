import * as fs from 'fs';
import {splitLines} from '../common';

const toCoord = (key: string): [number, number] => {
    const [a,b] = key.split('-').map(Number);
    return [a,b];
}

const toKey = (coords: [number, number]): string => `${coords[0]}-${coords[1]}`;

const getDist = (c0: [number, number], c1: [number, number]): number => {
    return Math.pow(c0[0]-c1[0], 2) + Math.pow(c0[1]-c1[1], 2);
}

const getClosest = (head: [number, number], [tx, ty]: [number, number]) => {
    let minDis = Infinity;
    let minCoord: [number, number] = [0, 0];
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            if(i === 0 && j === 0) continue;
            const ax = tx + i; const ay = ty + j;
            const dis = getDist(head, [ax, ay]);
            if(dis < minDis){
                minDis = dis;
                minCoord = [ax, ay];
            }
        }
    }
    return minCoord;
}

function main(text: string): void{
    const lines = splitLines(text);
    const visited = new Set<string>();
    const rope: [number, number][] = new Array(10)
        .fill([0,0]).map(_=>[0,0]); 
    // let [hx, hy] = [0, 0];
    // let [tx, ty] = [0, 0];
    const dirs: [number, number][] = [[1,0],[-1,0],[0,1],[0,-1],];
    for (const line of lines) {
        const [dir_s, dis_s] = line.split(' ');
        const [dx, dy] = dirs['RLUD'.indexOf(dir_s)];
        const dis = +dis_s;
        
        for(let i = 0; i < dis; i++){
            // steps
            // move head
            rope[0][0] += dx; rope[0][1] += dy;
            // move tail to be closer to head if needed
            // if tail dis squared >= 4  move tail to closest available cell
            // console.log(rope);
            // return
            for(let i = 1; i < rope.length; i++){
                const dis = getDist(rope[i-1], rope[i]);
                if(dis < 4) continue;
                rope[i] = getClosest(rope[i-1], rope[i]);
            }
            visited.add(toKey(rope[rope.length-1]));
            // if(dis < 4) {
            //     visited.add(toKey([tx, ty]));
            //     continue;
            // }
            
        }
    }
    console.log(visited);
    console.log(visited.size);
    
}

main(fs.readFileSync('./2022/d9-i.txt', {encoding: 'utf-8'}));

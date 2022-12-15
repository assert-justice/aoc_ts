import * as fs from 'fs';
import {splitLines, vec2} from '../../common';

// type Beacon = [number, number, number, number];

interface Sensor{
    sx: number,
    sy: number,
    bx: number,
    by: number,
    dis: number
}

function matDis(ax: number, ay: number, bx: number, by: number): number{
    return Math.abs(ax - bx) + Math.abs(ay - by);
}

function parse(text: string): Sensor[]{
    const lines = splitLines(text);
    const sensors: Sensor[] = [];
    for (const line of lines) {
        const temp = line.split(' ');
        let [sx,sy,bx,by,dis] = [0,0,0,0,0];
        sx = +temp[2].slice(2, -1);
        sy = +temp[3].slice(2, -1);
        bx = +temp[8].slice(2, -1);
        by = +temp[9].slice(2);
        dis = matDis(sx,sy,bx,by);
        sensors.push({sx,sy,bx,by,dis});
    }
    return sensors;
}

function genSegment(sensor: Sensor, y: number): vec2 | null{
    
    const n = Math.abs(y - sensor.sy);
    const val = sensor.dis - n;
    if(val < 0) return null;
    
    return [sensor.sx - val,  sensor.sx + val];
}

function addSegment(segments: vec2[], segment: vec2){
    let [a, b] = segment;
    for (const [c, d] of segments) {
        if(a <= c && b >= d) {
            // ab subsumes cd
            segments.push([a,c], [d,b]);
            return; 
        }
        else if(a >= c && b <= d){
            // cd subsumes ab, do nothing
            return;
        }
        else if(a < c && c < b) b = c;
        else if(a < d && d < b) a = d;
    }
    segments.push([a, b]);
}

function main(text: string): void{
    const sensors = parse(text);
    let segments: vec2[] = [];
    let temp: typeof segments = [];
    for (const sen of sensors) {
        const seg = genSegment(sen, 2000000);
        if(!seg) continue;
        temp.push(seg);
    }
    temp.sort((a,b) => (b[1]-b[0]) - (a[1]-a[0]));
    for (const seg of temp) {
        addSegment(segments, seg);
    }
    segments.sort((a,b)=>a[0]-b[0]);
    // console.log(sensors[9]);
    
    // console.log(genSegment(sensors[9], 7));
    // addSegment(segments, [1,3]);
    // addSegment(segments, [0,4]);
    // console.log(segments);
    
    console.log(segments.reduce((acc, [a,b]) => acc + b-a, 0));
    
}

main(fs.readFileSync('./2022/d15/input.txt', {encoding: 'utf-8'}));

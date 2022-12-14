import { listeners } from "process";

export function splitLines(text: string): string[]{
    const lines = text.trim().split(/\r?\n/);
    if(!lines[lines.length - 1]) lines.pop();
    return lines;
}

export function tally<T>(data: T[]): Map<T,number>{
    const res = new Map<T,number>();
    for (const entry of data) {
        res.set(entry, (res.get(entry) ?? 0) + 1);
    }
    return res;
}

export function groupLines(lines: string[]) :string[][]{
    const out :string[][] = [[]];
    // for (const line of lines) {
    //     if(line){
    //         out[out.leng]
    //     }
    // }
    return lines.reduce((ls: string[][], line:string): typeof ls=>{
        if(line){
            ls[ls.length-1].push(line);
        }
        else{
            ls.push([]);
        }
        return ls;
    },[[]]);
}

export type vec2 = [number, number];

export class HashGrid2D<T> {
    data: Map<string,T>;
    startValue: T;
    separator = ':';

    private toCoord(key: string): vec2{
        const [x,y] = key.split(this.separator).map(Number);
        return [x,y];
    }

    private toKey(x: number, y: number): string{
        return [x, this.separator, y].join('');
    }

    set(x: number, y: number, val: T){
        this.data.set(this.toKey(x, y), val);
    }

    get(x: number, y: number): T{
        const val = this.data.get(this.toKey(x, y));
        if(val === undefined) return this.startValue;
        return val;
    }

    setLine(ax: number, ay: number, bx: number, by: number, val: T){
        
        let [cx, cy] = [ax, ay];
        const dx = ax === bx ? 0 : (bx - ax) / Math.abs(bx - ax);
        const dy = ay === by ? 0 : (by - ay) / Math.abs(by - ay);
        
        this.set(cx, cy, val);
        
        while(cx !== bx || cy !== by){
            [cx, cy] = [cx + dx, cy + dy];
            this.set(cx, cy, val);
        }
    }

    getExtents(): [number, number, number, number]{
        let [xMin, xMax, yMin, yMax] = [Infinity, -Infinity, Infinity, -Infinity];
        for (const key of this.data.keys()) {
            const [cx, cy] = this.toCoord(key);
            xMin = Math.min(xMin, cx);
            xMax = Math.max(xMax, cx);
            yMin = Math.min(yMin, cy);
            yMax = Math.max(yMax, cy);
        }
        return [xMin, xMax, yMin, yMax];
    }

    constructor(startValue: T){
        this.data = new Map();
        this.startValue = startValue;
    }
}

export class Grid<T> {
    data: T[];
    width: number;
    height: number;
    constructor(width: number, height: number, startValue: T){
        this.data = new Array<T>(width * height).fill(startValue).map(_=>startValue);
        this.width = width; this.height = height;

    }
    getIdx(x: number, y: number): number{
        if(!this.onGrid(x, y)) throw `Attempted to access invalid coordinate (${x},${y})`;
        return y*this.width+x;
    }
    get(x: number, y: number): T{
        return this.data[this.getIdx(x,y)];
    }
    set(x: number, y: number, val: T): void{
        this.data[this.getIdx(x,y)] = val;
    }
    onGrid(x: number, y: number):boolean{
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
    setLine(ax: number, ay: number, bx: number, by: number, val: T){
        // console.log(ax, ay, bx, by);
        
        let [cx, cy] = [ax, ay];
        const dx = ax === bx ? 0 : (bx - ax) / Math.abs(bx - ax);
        const dy = ay === by ? 0 : (by - ay) / Math.abs(by - ay);
        // console.log(dx, dy);
        
        this.set(cx, cy, val);
        
        while(cx !== bx || cy !== by){
            [cx, cy] = [cx + dx, cy + dy];
            this.set(cx, cy, val);
        }
    }
}

// export class DefaultMap<T,R> extends Map{
//     defaultValue: R;
//     public constructor(defaultValue: R){
//         super();
//         this.defaultValue = defaultValue;
//     }
//     get(key: T): R{
//         return super.get(key) || this.defaultValue;
//     }
// }
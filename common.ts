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

export class Grid<T> {
    data: T[];
    width: number;
    height: number;
    constructor(width: number, height: number, startValue: T){
        this.data = new Array<T>(width * height).fill(startValue).map(_=>startValue);
        this.width = width; this.height = height;

    }
    getIdx(x: number, y: number): number{
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
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
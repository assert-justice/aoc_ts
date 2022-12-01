export function splitLines(text: string): string[]{
    return text.trim().split("\n").map(str => str.trim());
}

export function tally<T>(data: T[]): Map<any,number>{
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
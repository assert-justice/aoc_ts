import * as fs from 'fs';
import * as common from '../common';

function window(values: number[], idx: number): number{
    return values[idx] + values[idx + 1] + values[idx + 2];
}

function main(text: string): void{
    const values = common.splitLines(text).map(str => Number(str));
    let count = 0;
    for(let i = 0; i < values.length - 2; i++){
        if(window(values, i) < window(values, i + 1)) count++;
    }
    console.log(count);
}

main(fs.readFileSync('./2021/d1-i.txt', {encoding: 'utf-8'}));

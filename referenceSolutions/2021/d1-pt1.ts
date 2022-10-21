import * as fs from 'fs';
import * as common from '../common';

function main(text: string): void{
    // Solution here.
    const values = common.splitLines(text).map(str => Number(str));
    let count = 0;
    for(let i = 0; i < values.length - 1; i++){
        if(values[i] < values[i + 1]) count++;
    }
    console.log(count);
}

main(fs.readFileSync('./2021/d1-i.txt', {encoding: 'utf-8'}));

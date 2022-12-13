import * as fs from 'fs';
import {splitLines} from '../../common';

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const val = lines
        .reduce((acc, line)=>Math.floor(+line / 3) - 2 + acc, 0);
    console.log(val);
    
}

main(fs.readFileSync('./2019/d1/input.txt', {encoding: 'utf-8'}));

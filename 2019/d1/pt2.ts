import * as fs from 'fs';
import {splitLines} from '../../common';

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const con = (x:number): number => Math.floor(x / 3) - 2;
    const seq = (x:number): number => x <= 0 ? 0 : x + seq(con(x));
    const val = lines
        .reduce((acc, line)=>seq(con(+line)) + acc, 0);
    console.log(val);
    // console.log(seq(14));
    
}

main(fs.readFileSync('./2019/d1/input.txt', {encoding: 'utf-8'}));

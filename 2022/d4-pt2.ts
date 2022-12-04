import * as fs from 'fs';
import {splitLines} from '../common';

function checkPair(line: string){
    const [first, second] = line.split(',');
    const getPair = (line: string)=>line.split('-').map(Number);
    const [fmin, fmax] = getPair(first);
    const [smin, smax] = getPair(second);
    return (fmin >= smin && fmin <= smax) || 
        (fmax >= smin && fmax <= smax) ||
        (smin >= fmin && smin <= fmax) ||
        (smax >= fmin && smax <= fmax)
}

function main(text: string): void{
    const lines = splitLines(text);
    const val = lines.reduce((acc,line)=>checkPair(line) ? acc + 1 : acc, 0);
    console.log(val);
    
}

main(fs.readFileSync('./2022/d4-i.txt', {encoding: 'utf-8'}));

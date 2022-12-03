import * as fs from 'fs';
import {splitLines} from '../common';

function findChar(line: string): string{
    const front = line.slice(0, line.length/2);
    const back = line.slice(line.length/2);
    for (const c of front) {
        if(back.includes(c)) return c;
    }
    return '';
    
}

function charValue(c: string): number{
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = lower.toUpperCase();
    if(lower.includes(c)){
        return (lower.indexOf(c) ?? 0) + 1;
    }
    return (upper.indexOf(c) ?? 0) + 27;
}

function main(text: string): void{
    const lines = splitLines(text);
    let total = 0;
    for (const line of lines) {
        // console.log(findChar(line));
        total += charValue(findChar(line));
        
    }
    console.log(total);
    
}

main(fs.readFileSync('./2022/d3-i.txt', {encoding: 'utf-8'}));

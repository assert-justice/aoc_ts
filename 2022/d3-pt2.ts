import * as fs from 'fs';
import {splitLines} from '../common';

function findChar(group: string[]): string{
    const first = group[0];
    const others = group.slice(1);
    for (const char of first) {
        let found = true;
        for (const line of others) {
            if(!line.includes(char)){
                found = false;
                break;
            }
        }
        if(found) return char;
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
    const groups: string[][] = [];
    for (const i in lines) {
        const line = lines[i];
        if(+i%3 === 0){
            groups.push([]);
        }
        groups[groups.length - 1].push(line);
    }
    let total = 0;
    for (const group of groups) {
        const char = findChar(group);
        console.log(char);
        total += charValue(char);
    }
    console.log(total);
    
}

main(fs.readFileSync('./2022/d3-i.txt', {encoding: 'utf-8'}));

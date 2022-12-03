import * as fs from 'fs';
import {splitLines} from '../common';

function score(line: string){
    let [elf, me] = line.split(' ');
    const lookup = new Map([['A','X'],['B','Y'],['C','Z'],]);
    elf = lookup.get(elf) ?? '';
    const beats = new Map([['X','Z'],['Y','X'],['Z','Y'],]);
    const pointLookup = new Map([['X',1],['Y',2],['Z',3]]);
    let points = pointLookup.get(me) ?? 0;
    if(beats.get(elf) === me){}
    else if(elf === me){
        points += 3;
    }
    else{
        points += 6;
    }
    return points;
}

function main(text: string): void{
    const lines = splitLines(text);
    let points = 0;
    for (const line of lines) {
        const add = score(line);
        points+=add;
    }
    console.log(points);
    
}

main(fs.readFileSync('./2022/d2-i.txt', {encoding: 'utf-8'}));

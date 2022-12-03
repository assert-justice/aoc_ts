import * as fs from 'fs';
import {splitLines} from '../common';

function score(line: string){
    let [elf, me] = line.split(' ');
    const lookup = new Map([['A','X'],['B','Y'],['C','Z'],]);
    elf = lookup.get(elf) ?? '';
    const pointLookup = new Map([['X',1],['Y',2],['Z',3]]);
    const outcomeLookup = new Map([['X',0],['Y',3],['Z',6]]);
    const beats = new Map([['X','Z'],['Y','X'],['Z','Y'],]);
    const loses: typeof beats = new Map();
    for (const [t,y] of beats.entries()) {
        loses.set(y,t);
    }

    let points = outcomeLookup.get(me) ?? 0;
    if(points === 0){
        me = beats.get(elf) ?? '';
    }
    else if(points === 3){
        me = elf;
    }
    else{
        me = loses.get(elf) ?? '';
    }
    points += pointLookup.get(me) ?? 0;
    
    return points;
}

function main(text: string): void{
    const lines = splitLines(text);
    let points = 0;
    for (const line of lines) {
        const add = score(line);
        // console.log(add);
        points+=add;
    }
    console.log(points);
    
}

main(fs.readFileSync('./2022/d2-i.txt', {encoding: 'utf-8'}));

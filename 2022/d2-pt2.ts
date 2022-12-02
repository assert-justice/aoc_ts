import * as fs from 'fs';
import {splitLines} from '../common';

function score(line: string){
    let [them, you] = line.split(' ');
    const lookup = new Map([['A','X'],['B','Y'],['C','Z'],]);
    them = lookup.get(them) ?? '';
    const beats = new Map([['X','Z'],['Y','X'],['Z','Y'],]);
    const pointLookup = new Map([['X',1],['Y',2],['Z',3]]);
    const outcomeLookup = new Map([['X',0],['Y',3],['Z',6]]);

    let points = outcomeLookup.get(you) ?? 0;
    if(points === 0){
        you = beats.get(them) ?? '';
    }
    else if(points === 3){
        you = them;
    }
    else{
        // you = ([...beats.entries()].find(([t,y])=>y === them) ?? [0])[0];
        
        for (const [t,y] of beats.entries()) {
            //console.log(t,y);
            if(y === them){
                you = t;
                break;
            }
        }
    }
    points += pointLookup.get(you) ?? 0;
    // console.log(points);
    
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

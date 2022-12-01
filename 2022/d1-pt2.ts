import * as fs from 'fs';
import {splitLines} from '../common';

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const totals: number[] = [0];
    for (const line of lines) {
        if(!line){
            totals.push(0);
        }
        else{
            totals[totals.length-1] += +line;
        }
    }
    totals.sort((a,b)=>b-a);
    console.log(totals[0]+totals[1]+totals[2]);
    
}

main(fs.readFileSync('./2022/d1-i.txt', {encoding: 'utf-8'}));

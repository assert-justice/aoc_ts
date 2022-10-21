import * as fs from 'fs';
import { splitLines, tally } from "../common";

function main(text: string): void{
    const lines = splitLines(text);
    let pattern = lines[0];
    const rules = new Map<string,string>();
    for (const line of lines.slice(2)) {
        rules.set(line.slice(0,2), line[6]);
    }
    const steps = 10;
    for(let i = 0; i < steps; i++){
        let newPattern: string[] = [];
        for (let f = 0; f < pattern.length - 1; f++) {
            const pair = pattern.slice(f, f + 2);
            newPattern.push(pattern[f], rules.get(pair) ?? 'err');
        }
        newPattern.push(pattern[pattern.length - 1]);
        pattern = newPattern.join('');
        // console.log(pattern);
    }
    const freq = tally<string>(pattern.split(''));
    // console.log(freq);
    let most = 0;
    let least = Infinity;
    for (const quant of freq.values()) {
        if(quant > most) most = quant;
        if(quant < least) least = quant;
    }
    console.log(most - least);
    
}

main(fs.readFileSync('./2021/d14-i.txt', {encoding: 'utf-8'}));

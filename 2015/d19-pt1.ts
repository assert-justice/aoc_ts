import * as fs from 'fs';
import {splitLines} from '../common';

function applyRule([pattern, sub]: [string, string], src: string): string[] {
    const outputs: string[] = [];
    let startIdx = 0;
    while(true){
        startIdx = src.indexOf(pattern, startIdx);
        if(startIdx === -1) break;
        const start = src.slice(0, startIdx);
        const end = src.slice(startIdx + pattern.length);
        outputs.push([start, sub, end].join(''));
        startIdx += pattern.length;
    }
    return outputs;
}

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const idx = lines.findIndex(line => line.length === 0);
    const rules = lines.slice(0, idx).map((line):[string, string] => {
        const [a,b] = line.split(' => ');
        return [a,b];
    });
    const molecule = lines[idx + 1];
    const products = new Set<string>();
    for (const rule of rules) {
        for (const prod of applyRule(rule, molecule)) {
            products.add(prod);
        }
    }
    // console.log(products);
    console.log(products.size);
    
    
    // console.log(rules);
    // console.log(molecule);
    
}

main(fs.readFileSync('./2015/d19-i.txt', {encoding: 'utf-8'}));

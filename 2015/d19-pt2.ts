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

function melt(rules: [string,string][], molecule: string, depth: number): number{
    // console.log(molecule, depth);
    if(molecule === 'e') return depth;
    
    // const products = new Set<string>();
    for (const rule of rules) {
        if(rule[1] === 'e' && molecule !== rule[0]) continue;
        const min = Math.min(...applyRule(rule, molecule).map(prod => melt(rules, prod, depth + 1)));
        if(min < Infinity) return min;
        // for (const prod of applyRule(rule, molecule)) {
        //     products.add(prod);
        // }
    }
    // console.log('dead end');
    return Infinity;
    // if(products.size === 0) return Infinity;
    // if(products.has('e')) return depth;
    // return [...products.values()].reduce((acc: number, prod: string) => Math.min(acc, melt(rules, prod, depth + 1)), Infinity);
    // return Math.min([...products.values()].map((prod:number): number => melt(rules, prod, depth + 1)))
}

function shuffle(ls: [string,string][]){
    const out: typeof ls = [];
    while(ls.length){
        const idx = Math.random() * ls.length;
        
    }
}

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const idx = lines.findIndex(line => line.length === 0);
    const rules = lines.slice(0, idx).map((line):[string, string] => {
        const [a,b] = line.split(' => ').reverse();
        return [a,b];
    });
    // rules.sort((a,b) => b[0].length - a[0].length);
    // console.log(rules);
    let molecule = lines[idx + 1];
    // console.log(melt(rules, molecule, 0));
    
    // for(let i = 0; i < 300; i++){
    //     for (const rule of rules) {
    //         const products = applyRule(rule, molecule);
    //         if(products.length === 0) continue;
    //         const [product] = products;
    //         molecule = product;
    //         break;
    //     }
    //     console.log(molecule);
    //     if(molecule === 'e'){
    //         console.log(i + 1);
    //         return;
    //     }
    // }
    
}

main(fs.readFileSync('./2015/input.txt', {encoding: 'utf-8'}));

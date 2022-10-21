import * as fs from 'fs';
import {splitLines} from '../common';

function main(text: string): void{
    const pairs = '()3,[]57,{}1197,<>25137'.split(',');
    const lr = new Map<string,string>();
    const rl = new Map<string,string>();
    const lookup = new Map<string,number>();
    for (const pair of pairs) {
        const [l,r] = pair;
        lr.set(l, r);
        rl.set(r, l);
        lookup.set(r, Number(pair.slice(2)));
    }
    const lines = splitLines(text);
    let score = 0;
    for (const line of lines) {
        const stack: string[] = [];
        for (const c of line) {
            if(lr.has(c)){
                stack.push(lr.get(c) ?? '');
            }
            else{
                const val = stack.pop() ?? '';
                if(c !== val){
                    score += lookup.get(c) ?? 0;
                    break;
                }
            }
        }
        //
    }
    console.log(score);
    
}

main(fs.readFileSync('./2021/d10-i.txt', {encoding: 'utf-8'}));

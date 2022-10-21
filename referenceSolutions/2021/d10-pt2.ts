import * as fs from 'fs';
import {splitLines} from '../common';

function main(text: string): void{
    const pairs = '()1,[]2,{}3,<>4'.split(',');
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
    let scores: number[] = [];
    for (const line of lines) {
        const stack: string[] = [];
        let broken = false;
        for (const c of line) {
            if(lr.has(c)){
                stack.push(lr.get(c) ?? '');
            }
            else{
                const val = stack.pop() ?? '';
                if(c !== val){
                    broken = true;
                    break;
                }
            }
        }
        if(!broken){
            let bonus = 0;
            while(stack.length > 0){
                bonus *= 5;
                bonus += lookup.get(stack.pop() ?? '') ?? 0;
            }
            scores.push(bonus);
        }
    }
    scores = scores.sort((a,b)=>b-a);
    console.log(scores[Math.floor(scores.length / 2)]);
    
}

main(fs.readFileSync('./2021/d10-i.txt', {encoding: 'utf-8'}));

import * as fs from 'fs';
import {splitLines} from '../../common';

function parse(text: string): Map<string,string>{
    const out = new Map<string,string>();
    const lines = splitLines(text);
    for (const line of lines) {
        const name = line.slice(0, 4);
        const args = line.slice(6);
        out.set(name, args);
    }
    return out;
}

function solve(name: string, lookup: Map<string,string>,  mem: Map<string,number>): number{
    let val = mem.get(name);
    if(val !== undefined) return val;
    let args = (lookup.get(name) ?? '').split(' ');
    if(args.length === 1){
        val = +args[0];
    }
    else{
        const [a,b] = [solve(args[0], lookup, mem), solve(args[2], lookup, mem)];
        switch (args[1]) {
            case '+':
                val = a+b;
                break;
            case '-':
                val = a-b;
                break;
            case '*':
                val = a*b;
                break;
            case '/':
                val = a/b;
                break;
            default:
                throw `unexpected operator ${args[1]}`
                break;
        }
    }
    mem.set(name, val);
    return val;
}

function main(text: string): void{
    const lookup = parse(text);
    const mem = new Map<string, number>();
    console.log(solve('root', lookup, mem));
    // console.log(lookup);
    // console.log(mem);
    
    
}

main(fs.readFileSync('./2022/d21/input.txt', {encoding: 'utf-8'}));

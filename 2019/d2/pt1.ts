import * as fs from 'fs';
import {splitLines} from '../../common';

function sim(code: number[]){
    for (let i = 0; i < code.length; i+=4) {
        const [op, i0, i1, out] = code.slice(i, i + 4);
        if (op === 99) break;
        const [a0,a1] = [code[i0], code[i1]];
        if(op === 1){
            code [out] = a0+a1;
        }
        else if(op === 2){
            code [out] = a0*a1;
        }
        else{
            throw `Unexpected opcode ${op}`;
        }
    }
    console.log(code[0]);
    
}

function main(text: string): void{
    const code = text.split(',').map(Number);
    code[1] = 12;
    code[2] = 2;
    sim(code);
}

main(fs.readFileSync('./2019/d2/input.txt', {encoding: 'utf-8'}));

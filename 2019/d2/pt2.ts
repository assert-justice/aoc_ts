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
            // return 0;
            throw `Unexpected opcode ${op}`;
        }
    }
    return code[0];
    
}

function main(text: string): void{
    const code = text.split(',').map(Number);
    for(let i = 0; i < 100; i++){
        for(let j = 0; j < 100; j++){
            code[1] = i;
            code[2] = j;
            if(sim([...code]) === 19690720){
                console.log(100 * i + j);
                return;
            }
        }
    }
}

main(fs.readFileSync('./2019/d2/input.txt', {encoding: 'utf-8'}));

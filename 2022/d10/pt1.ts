import * as fs from 'fs';
import {splitLines} from '../../common';

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    let x = 1;
    let c = 0;
    let sum = 0;
    function cycle(){
        // console.log(c, x);
        c++;
        if([20, 60, 100, 140, 180, 220].includes(c)) sum += c * x;
    }
    for (const line of lines) {
        if(line === 'noop'){
            cycle();
        }
        else{
            cycle();
            cycle();
            x += +line.split(' ')[1];
        }
    }
    cycle();
    console.log(sum);
    
}

main(fs.readFileSync('./2022/d10/input.txt', {encoding: 'utf-8'}));

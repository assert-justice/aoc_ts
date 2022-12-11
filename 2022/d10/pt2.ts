import * as fs from 'fs';
import {splitLines} from '../../common';

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    let x = 1;
    let c = 0;
    const outline: string[] = [];
    function cycle(){
        // console.log(c, x);
        // determine if sprite is in window
        // eg abs(c - x) <= 1
        // if it is draw #
        // else draw .
        const chr = Math.abs(c % 40 - x) <= 1 ? '#' : '.';
        outline.push(chr);
        // if outline is full print it and clear it
        if(outline.length === 40){
            console.log(outline.join(''));
            outline.length = 0;
        }
        c++;
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
    // cycle();
    
}

main(fs.readFileSync('./2022/d10/input.txt', {encoding: 'utf-8'}));

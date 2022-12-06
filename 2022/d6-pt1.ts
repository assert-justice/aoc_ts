import * as fs from 'fs';
import {splitLines} from '../common';

function main(text: string): void{
    for(let i = 0; i < text.length - 4; i++){
        const s = new Set(text.slice(i, i+4));
        if(s.size === 4){
            console.log(i + 4);
            return;
        }
    }
}

main(fs.readFileSync('./2022/d6-i.txt', {encoding: 'utf-8'}));

import * as fs from 'fs';
import {splitLines} from '../common';

function main(text: string): void{
    for(let i = 0; i < text.length - 14; i++){
        const s = new Set(text.slice(i, i+14));
        if(s.size === 14){
            console.log(i + 14);
            return;
        }
    }
}

main(fs.readFileSync('./2022/d6-i.txt', {encoding: 'utf-8'}));

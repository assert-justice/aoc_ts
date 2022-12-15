import * as fs from 'fs';
import {splitLines} from '../../common';

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
}

main(fs.readFileSync('./2022/d15/input.txt', {encoding: 'utf-8'}));

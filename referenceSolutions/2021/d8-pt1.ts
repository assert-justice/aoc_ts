import * as fs from 'fs';

function parseLine(line: string): string[][]{
    const [start, end] = line.split('|');
    return [
        start.split(' ').map(str => str.trim()),
        end.split(' ').map(str => str.trim())
    ];
}

function main(text: string): void{
    const lines = text.trim().split('\n').map(parseLine);
    let count = 0;
    for (const [_,outputs] of lines) {
        for (const output of outputs) {
            if([2, 4, 3, 7].includes(output.length)) count++;
        }
    }
    console.log(count);
    
}

main(fs.readFileSync('./2021/d8-i.txt', {encoding: 'utf-8'}));

import * as fs from 'fs';

function main(text: string): void{
    // Solution here.
    const lines = text.trim().split('\n').map(line => Number(line));
    let increases = 0;
    for(let i = 0; i < lines.length - 1; i++){
        if(lines[i] < lines[i+1]) {
            increases++;
        }
    }
    console.log(increases);
    
}

main(fs.readFileSync('./2021/d1-i.txt', {encoding: 'utf-8'}));

import * as fs from 'fs';

function count(str: string, char: string){
    let tally = 0;
    for (const c of str) {
        if (c === char) tally++;
    }
    return tally;
}

function main(text: string): void{
    const lines = text.trim().split('\n');
    let valid = 0;
    for (const line of lines) {
        const [range, char, pass] = line.split(' ');
        const [min, max] = range.split('-').map(Number);
        const tally = count(pass, char[0]);
        if(tally >= min && tally <= max) valid ++;
    }
    console.log(valid);
    
}

main(fs.readFileSync('./2020/d2-i.txt', {encoding: 'utf-8'}));

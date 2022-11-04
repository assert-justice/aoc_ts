import * as fs from 'fs';

function main(text: string): void{
    const lines = text.trim().split('\n');
    let valid = 0;
    for (const line of lines) {
        let [range, char, pass] = line.split(' ');
        char = char[0];
        const [min, max] = range.split('-').map(Number);
        let match = 0;
        match = pass[min - 1] === char ? match + 1 : match;
        match = pass[max - 1] === char ? match + 1 : match;
        if(match === 1) valid++;
    }
    console.log(valid);
    
}

main(fs.readFileSync('./2020/d2-i.txt', {encoding: 'utf-8'}));

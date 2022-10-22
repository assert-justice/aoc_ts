import * as fs from 'fs';

function sumOfThree(arr: number[], idx: number): number{
    return arr[idx] + arr[idx+1] + arr[idx+2];
}

function main(text: string): void{
    // Solution here.
    const lines = text.trim().split('\n').map(line => Number(line));
    let increases = 0;
    for(let i = 0; i < lines.length - 2; i++){
        
        if(sumOfThree(lines, i) < sumOfThree(lines, i+1)) {
            increases++;
        }
    }
    console.log(increases);
    
}

main(fs.readFileSync('./2021/d1-i.txt', {encoding: 'utf-8'}));

import * as fs from 'fs';

function main(text: string): void{
    const lines = text.trim().split("\n").map(str => str.trim());
    const totals = lines.reduce((acc: number[], line: string)=>{
        if(!line) acc.push(0);
        else acc[acc.length-1] += +line;
        return acc;
    }, []).sort((a,b)=>b-a);
    console.log(totals[0]);
}

main(fs.readFileSync('./2022/d1-i.txt', {encoding: 'utf-8'}));

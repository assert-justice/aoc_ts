import * as fs from 'fs';

function parse(text: string):[string[][], number[][]]{
    const lines = text.split('\r\n');
    const splitIdx = lines.findIndex(line => line.length === 0);
    const columns = lines.slice(0, splitIdx - 1);
    columns.reverse();
    
    const numColumns = columns[0].split(' ').length;
    const stacks: string[][] = new Array(numColumns).fill([]).map(_ => []);
    
    for (const col of columns) {
        let idx = 0;
        for(let i = 1; i < col.length; i+=4){
            if(col[i] !== ' ') stacks[idx].push(col[i]);
            idx++;
        }
    }
    
    const instructions = lines.slice(splitIdx + 1).map(line => {
        const [a, b, c, d, e, f] = line.split(' ');
        return [b, d, f].map(v => +v-1);
    });
    return [stacks, instructions];
    
}

function main(text: string): void{
    // Solution here.
    // parse(text);
    const [stacks, instructions] = parse(text);
    for (const [num, src, des] of instructions) {
        // console.log(num, src, des);
        for(let i = 0; i <= num; i++){
            stacks[des].push(stacks[src].pop() ?? '');
        }
        // break;
        
    }
    // for (const stack of stacks) {
    //     console.log(stack);   
    // }
    const out = stacks.map(stack => stack[stack.length-1]).join('');
    console.log(out);
    
}

main(fs.readFileSync('./2022/d5-i.txt', {encoding: 'utf-8'}));

import * as fs from 'fs';

function main(text: string): void{
    // 
    const lines = text.trim().split('\n');
    const code = lines.map((line: string): [string, number] =>{
        const op = line.slice(0, 3);
        const num = parseInt(line.slice(3));
        return [op, num];
    });
    const visited: number[] = [];
    let acc = 0;
    let ip = 0;
    while(true){
        if(visited.includes(ip)) break;
        visited.push(ip);
        const [op, val] = code[ip];
        ip++;
        switch (op) {
            case 'acc':
                acc += val;
                break;
            case 'jmp':
                ip += val - 1;
                break;
            default:
                break;
        }
    }
    console.log(acc);
    
    
}

main(fs.readFileSync('./2020/d8-i.txt', {encoding: 'utf-8'}));

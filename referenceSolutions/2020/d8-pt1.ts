import * as fs from 'fs';

function main(text: string): void{
    const lines = text.trim().split("\n");
    const code = lines.map((line: string): [string, number] => {
        const [op, val] = line.split(" ");
        return [op, +val];
    });
    let ip = 0;
    let acc = 0;
    let visited = new Set<number>();
    while(true){
        if(visited.has(ip)){
            console.log(acc);
            return;
        }
        visited.add(ip);
        const [op, val] = code[ip];
        ip++;
        if (op === "acc"){
            acc += val;
        }
        else if (op === "jmp"){
            ip = ip - 1 + val;
        }
    }
}

main(fs.readFileSync('./2020/d8-i.txt', {encoding: 'utf-8'}));

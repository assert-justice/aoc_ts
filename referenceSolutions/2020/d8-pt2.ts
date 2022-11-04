import * as fs from 'fs';

function sim(code: [string, number][]): number | null {
    let ip = 0;
    let acc = 0;
    let visited = new Set<number>();
    while(ip < code.length){
        if(visited.has(ip)){
            return null;
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
    return acc;
}

function main(text: string): void{
    const lines = text.trim().split("\n");
    const code = lines.map((line: string): [string, number] => {
        const [op, val] = line.split(" ");
        return [op, +val];
    });
    const lookup = new Map([['jmp', 'nop'], ['nop','jmp']]);
    for(let i = 0; i < code.length; i++){
        const elem = code[i];
        const oldOp = elem[0];
        const newOp = lookup.get(oldOp);
        if(newOp){
            elem[0] = newOp;
            const res = sim(code);
            if(res){
                console.log(res);
                return;
            }
            elem[0] = oldOp;
        }
    }
}

main(fs.readFileSync('./2020/d8-i.txt', {encoding: 'utf-8'}));

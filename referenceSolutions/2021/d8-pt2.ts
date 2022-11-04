import * as fs from 'fs';

const perms: string[][] = permutations('abcdefg'.split(''));

function parseLine(line: string): string[][]{
    const [start, end] = line.split('|');
    return [
        start.split(' ').map(str => str.trim()),
        end.split(' ').map(str => str.trim())
    ];
}

function permutations(array: any[]): any[][]{
    if(array.length === 1) return [array];
    const first = array[0];
    const end = [...array].splice(1);
    
    const perms = permutations(end);
    const result: any[][] = [];
    for (const perm of perms) {
        for(let i = 0; i <= perm.length; i++){
            const arr = perm.slice(0, i);
            arr.push(first);
            for (const temp of perm.slice(i)) {
                arr.push(temp)
            }
            result.push(arr);
        }
    }
    return result;
}

function applyPerm(pattern: string, perm: string[]): string{
    const chars = 'abcdefg';
    const out: string[] = [];
    for (const c of pattern) {
        const idx = chars.indexOf(c);
        out.push(perm[idx]);
    }
    return out.join('');
}

function grind(signals: string[], outputs: string[]): number{
    const patterns = new Map([
        ['abcefg', '0'], 
        ['cf', '1'], 
        ['acdeg', '2'], 
        ['acdfg', '3'], 
        ['bcdf', '4'], 
        ['abdfg', '5'], 
        ['abdefg', '6'], 
        ['acf', '7'], 
        ['abcdefg', '8'], 
        ['abcdfg', '9'], 
    ]);
    let correctPerm: typeof perms[0] = [];
    for (const perm of perms) {
        let broken = false;
        for (const signal of signals) {
            const pattern = applyPerm(signal, perm);
            if(!patterns.has(pattern)){
                broken = true;
                break;
            };
        }
        if(!broken){
            correctPerm = perm;
            break;
        }
    }
    console.log(correctPerm);
    
    const ans = [];
    for (const out of outputs) {
        
    }
    return 0;
}

function main(text: string): void{
    const lines = text.trim().split('\n').map(parseLine);
    for (const [signals, outputs] of lines) {
        grind(signals, outputs);
        break;
    }
    // console.log([1].slice(0));
    
    // console.log(permutations([1,2,3,4,5,6,7]).length);
    
    
}

main(fs.readFileSync('./2021/d8-i.txt', {encoding: 'utf-8'}));

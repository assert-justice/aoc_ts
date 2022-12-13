import * as fs from 'fs';
import {splitLines, groupLines} from '../../common';

type Data<T> = T | Data<T>[];

type Tern = true | false | 'shrug'

function compare(left: Data<number>, right: Data<number>): Tern{
    // console.log(left, right);
    
    if(typeof left === 'number' && typeof right === 'number'){
        if(left === right) return 'shrug';
        return left <= right;
    }
    else if(typeof left === 'object' && typeof right === 'object'){
        // compare each element
        for (let i = 0; i < Math.min(left.length, right.length); i++) {
            const x = left[i];
            const y = right[i];
            const res = compare(x, y);
            if(res !== 'shrug') return res;
        }
        if(left.length === right.length) return 'shrug';
        return left.length < right.length;
    }
    else{
        if(typeof left === 'number'){
            return compare([left], right);
        }
        else{
            return compare(left, [right]);
        }
    }
}

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const groups = groupLines(lines);
    
    let total = 0;
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const left = eval(group[0]) as Data<number>;
        const right = eval(group[1]) as Data<number>;
        const val = compare(left, right);
        // console.log(val);
        
        if(val) {
            total += (i+1);
            // console.log(i);
            
        }
    }
    console.log(total);
    
}

main(fs.readFileSync('./2022/d13/input.txt', {encoding: 'utf-8'}));

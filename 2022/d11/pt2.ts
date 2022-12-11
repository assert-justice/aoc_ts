import * as fs from 'fs';
import {splitLines} from '../../common';

class Monkey {
    held: number[];
    fn: (a: number) => number;
    thrown = 0;
    test: number;
    tTarget: number;
    fTarget: number;
    pass: (target: number, value: number) => void;
    constructor(lines: string[], pass: (target: number, value: number) => void){
        this.pass = pass;
        
        let temp = '';
        temp = lines[1].split(':')[1];
        this.held = temp.split(',').map(Number);
        temp = lines[2].split('old ')[1];
        if(temp === '* old'){
            this.fn = (a:number)=>a * a;
        }
        else if(temp[0] === '+'){
            this.fn = (a:number)=>a + +temp.split(' ')[1];
        }
        else{
            this.fn = (a:number)=>a * +temp.split(' ')[1];
        }
        // console.log(this.fn(10));
        this.test = +lines[3].split('by ')[1];
        // console.log(this.test);
        this.tTarget = +lines[4].split('key ')[1];
        this.fTarget = +lines[5].split('key ')[1];
        
        // console.log(this.tTarget, this.fTarget);
    }
    turn(){
        for (let val of this.held) {
            this.thrown++;
            val = this.fn(val);
            // val = Math.floor(val / 3);
            if (val % this.test === 0) this.pass(this.tTarget, val);
            else this.pass(this.fTarget, val);
        }
        this.held.length = 0;
    }
}

function main(text: string): void{
    let mod = 1;
    const lines = text.trim().split(/\r?\n/);
    const groups: string[][] = [[]];
    const monkeys = new Map<number, Monkey>();
    const pass = (target: number, value: number) => {
        const monkey = monkeys.get(target);
        if(monkey){
            monkey.held.push(value % mod);
            
        }
    }
    for (const line of lines) {
        if(line.length === 0) groups.push([]);
        else groups[groups.length - 1].push(line);
    }
    for (const group of groups) {
        const m = new Monkey(group, pass);
        monkeys.set(monkeys.size, m);
        mod *= m.test;
    }
    for(let i = 0; i < 10000 ; i++){
        for (const monkey of monkeys.values()) {
            monkey.turn();
            
        }
    }
    const xs = [...monkeys.values()].map(m => m.thrown).sort((a,b)=>b-a);
    console.log(xs);
    console.log(xs[0] * xs[1]);
    
    
}

main(fs.readFileSync('./2022/d11/input.txt', {encoding: 'utf-8'}));

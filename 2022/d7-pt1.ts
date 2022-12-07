import * as fs from 'fs';
import {splitLines} from '../common';

// type val = Map<string, val>;
// interface val{
//     map: Map<string, val> | null;
// }

class Dir {
    map: Map<string, Dir>;
    private _size = 0;
    name = '/';
    constructor(label: string){
        const [name, size] = this.getData(label);
        this.name = name;
        this._size = size;
        this.map = new Map();
    }
    private getData(label: string):[string, number]{
        const [first, second] = label.split(' ');
        if(first === '/') return ['/', 0];
        else if(first === 'dir') return [second, 0];
        else return [second, +first];
    }
    get size(): number{
        let total = this._size;
        for (const dir of this.map.values()) {
            total += dir.size;
        }
        return total;
    }
    add(label: string){
        const [name, _] = this.getData(label);
        this.map.set(name, new Dir(label));
    }
}

function sillySize(top: Map<string,Dir>):void{
    
    const smallDirs: [string, number][] = [];
    const rec = (dirDir: Map<string,Dir>):void => {
        for (const [name, dir] of dirDir.entries()) {
            if(dir.map.size === 0) continue;
            const size = dir.size;
            if(size <= 100_000){
                smallDirs.push([name, size]);
            }
            rec(dir.map)
        }
    }
    rec(top);
    const total = smallDirs.reduce((acc, [name,size]) => {
        console.log(name, size);
        
        return acc + size;
    }, 0);
    console.log(total);
    
}

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
    const top = new Dir('');
    top.add('/');
    // const currentDir = top;
    const dirStack: string[] = [];
    let idx = 0;
    while(idx < lines.length){
        const command = lines[idx];
        // console.log(command);
        
        idx++;
        if(command === '$ cd /'){
            dirStack.length = 0;
            dirStack.push('/');
        }
        else if(command === '$ cd ..'){
            dirStack.pop();
        }
        else if(command.startsWith('$ cd')){
            const dir = command.split(' ')[2];
            dirStack.push(dir);
        }
        else{
            // ls command
            let currentDir = top;
            for (const dir of dirStack) {
                const next = currentDir.map.get(dir);
                if(!next) throw `hold up bruh ${dir}`;
                currentDir = next;
            }
            while(idx < lines.length && !lines[idx].startsWith('$')){
                currentDir.add(lines[idx]);
                idx++;
            }
        }
    }
    // console.log(top.size);
    sillySize(top.map);
    
}

main(fs.readFileSync('./2022/d7-i.txt', {encoding: 'utf-8'}));

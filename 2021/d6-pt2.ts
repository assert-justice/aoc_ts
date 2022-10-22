import * as fs from 'fs';

// 3,4,3,1,2
/*
// days until spawn : population size
{
    3: 2,
    4: 1,
    1: 1,
    2: 1
}
{
    2: 2,
    3: 1,
    0: 1,
    1: 1,
}
{
    1: 2,
    2: 1,
    6: 1,
    8: 1,
    0: 1,
}
*/

function tally(arr: number[]): Map<number, number>{
    const result = new Map<number, number>();
    for (const num of arr) {
        const population = result.get(num);
        if(population){
            result.set(num, population + 1);
        }
        else{
            result.set(num, 1);
        }
    }
    return result;
}

function daySim(fish: Map<number, number>): Map<number, number>{
    const newFish = new Map<number, number>();
    
    let born = 0;
    for (const [cycle, pop] of fish.entries()) {
        if(cycle === 0) {
            newFish.set(8, pop);
            born = pop;
        }
        else{
            newFish.set(cycle - 1, pop);  
        }
    }
    newFish.set(6, (newFish.get(6) ?? 0) + born);
    return newFish;
}

function main(text: string): void{
    let fish = tally(text.split(',').map(Number));
    console.log(fish);
    
    for(let i = 0; i < 80; i++){
        fish = daySim(fish);
    }
    console.log(Array.from(fish.values()).reduce((a,b)=>a+b, 0));
}

main(fs.readFileSync('./2021/d6-i.txt', {encoding: 'utf-8'}));

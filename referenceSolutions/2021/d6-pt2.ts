import * as fs from 'fs';

function main(text: string): void{
    const fishValues = text.trim().split(',').map(str => Number(str));
    let fish = new Map<number,number>();
    for (const value of fishValues) {
        fish.set(value, (fish.get(value) ?? 0) + 1);
    }
    const steps = 256;
    for(let i = 0; i < steps; i++){
        const newFish = new Map<number,number>();
        for (const [age, count] of fish) {
            if(age === 0){
                newFish.set(6, (newFish.get(6) ?? 0) + count);
                newFish.set(8, (newFish.get(8) ?? 0) + count);
            }
            else{
                newFish.set(age - 1, (newFish.get(age - 1) ?? 0) + count);
            }
        }
        fish = newFish;
    }
    console.log(fish);
    const total = [...fish.values()].reduce((a,b)=>a+b, 0);
    console.log(total);
    
}

main(fs.readFileSync('./2021/d6-i.txt', {encoding: 'utf-8'}));

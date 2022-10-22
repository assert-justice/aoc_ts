import * as fs from 'fs';

function daySim(fish: number[]): void{
    let newFish = 0;
    for(let i = 0; i < fish.length; i++){
        if(fish[i] > 0){
            fish[i]--;
        }
        else{
            fish[i] = 6;
            newFish++;
        }
    }
    for(let i = 0; i < newFish; i++){
        fish.push(8);
    }
}

function main(text: string): void{
    const fish = text.split(',').map(Number);
    for(let i = 0; i < 80; i++){
        daySim(fish);
    }
    console.log(fish.length);
    
}

main(fs.readFileSync('./2021/d6-i.txt', {encoding: 'utf-8'}));

import * as fs from 'fs';
import * as common from '../common';

function main(text: string): void{
    const fish = text.trim().split(',').map(str => Number(str));
    const steps = 80;
    for(let i = 0; i < steps; i++){
        let newFish = 0;
        for (let f = 0; f < fish.length; f++) {
            const element = fish[f];
            if(element === 0){
                newFish++;
                fish[f] = 6;
            }
            else{
                fish[f]--;
            }
        }
        for (let f = 0; f < newFish; f++) {fish.push(8);}
    }
    console.log(fish.length);
    
}

main(fs.readFileSync('./2021/d6-i.txt', {encoding: 'utf-8'}));

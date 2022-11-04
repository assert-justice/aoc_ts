import * as fs from 'fs';

function findSum(nums: number[], start: number, len: number, target: number): boolean{
    for(let i = start; i < start + len; i++){
        for(let f = i + 1; f < start + len; f++){
            // if(i === f) continue;
            if(nums[i] + nums[f] === target) return true;
        }
    }
    return false;
}

function findRange(nums: number[], target: number): number[]{
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let f = i; f < nums.length; f++) {
            sum += nums[f];
            if(sum === target) return nums.slice(i, f);
            if(sum > target) break;
        }
    }
    return [];
}

function solve(nums: number[], preamble: number): number{
    
    for (let i = 0; i < nums.length - preamble; i++) {
        if(!findSum(nums, i, preamble, nums[i + preamble])){
            return nums[i + preamble];
        }
    }
    return 0;
}

function main(text: string): void{
    const nums = text.trim().split('\n').map(Number);
    const target = solve(nums, 25);
    const range = findRange(nums, target).sort((a,b)=>a-b);
    console.log(range[0] + range[range.length - 1]);
    
    
}

main(fs.readFileSync('./2020/d9-i.txt', {encoding: 'utf-8'}));

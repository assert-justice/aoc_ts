import * as fs from 'fs';

// type inference

function validate(line: string): boolean{
    // Validates that a line meets certain criteria
    const segments = line.split(' ');
    const char = segments[1][0];
    const max: number = +segments[0].split('-')[1];
    const min: number = +segments[0].split('-')[0];
    const password = segments[2];
    let bob = 0;
    for(let i = 0; i < password.length; i++){
        if(char === password[i]) bob++;
    }
    return bob >= min && bob <= max;
}

function main(text: string): void{
    const lines = text.trim().split('\n');
    let result = 0;
    for(let key of lines){
        if(validate(key)) result++;
    }
    console.log(result);
}

main(fs.readFileSync('./2020/d2-i.txt', {encoding: 'utf-8'}));

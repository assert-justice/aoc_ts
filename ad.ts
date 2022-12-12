import * as fs from 'fs';

function template(path: string): string{
    return `import * as fs from 'fs';
import {splitLines} from '../../common';

function main(text: string): void{
    // Solution here.
    const lines = splitLines(text);
}

main(fs.readFileSync('${path}', {encoding: 'utf-8'}));
`
}

function main(args: string[]): void{
    if(args.length < 2){
        console.log("Not enough arguments!");
    }
    const [year, day] = args;
    const yearPath = `./${year}`;
    if(!fs.existsSync(yearPath)){
        fs.mkdirSync(yearPath);
    }
    const dirPath = `${yearPath}/d${day}`;
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }
    else{
        console.log("Day already created.");
        return;
    }
    const filePaths = [
        `${dirPath}/pt1.ts`,
        `${dirPath}/pt2.ts`,
    ];
    const inputPath = `${dirPath}/input.txt`;
    const text = template(inputPath);
    for (const path of filePaths) {
        fs.writeFileSync(path, text);
    }
    fs.writeFileSync(inputPath, "");
}

main(process.argv.slice(2));
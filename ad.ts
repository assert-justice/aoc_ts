import * as fs from 'fs';

function template(path: string): string{
    return `import * as fs from 'fs';
import {splitLines} from '../common';

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
    const dirPath = `./${year}`;
    const filePaths = [
        `${dirPath}/d${day}-pt1.ts`,
        `${dirPath}/d${day}-pt2.ts`,
    ];
    const inputPath = `${dirPath}/d${day}-i.txt`;
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }
    const text = template(inputPath);
    for (const path of filePaths) {
        fs.writeFileSync(path, text);
    }
    fs.writeFileSync(inputPath, "");
}

main(process.argv.slice(2));
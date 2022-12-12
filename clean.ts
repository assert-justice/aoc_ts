import { readdirSync, writeFileSync } from 'fs';

function main(){
    for (const name of readdirSync('./')) {
        if(!Number(name)) continue;

        for (const fname of readdirSync(`./${name}`)) {
            // console.log(fname);
            if(fname.endsWith('.txt')){
                writeFileSync(`./${name}/${fname}`, '');
            }
        }
    }    
}

main();
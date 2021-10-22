const chalk = require('chalk');
const { errorspt } = require('./src/config/json/console.json');
const fs = require('fs');
const { exit } = require('process');
const args = process.argv;

let user = process.env.USERNAME
let op = args[2];
let help = args[3];

if (op == '--help' || op == '-help') {
    let dirh = './src/config/txt/help.txt';
    let help = fs.readFileSync(dirh, 'utf8')

    console.clear()
    console.log(help)
}
else {
    if (!op) {
        console.clear()
        console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.erroropn} \n`)
        exit()
    }
    else {
        let replacec = op.replace(/-/g, ``);
        let formatoc = '.js';
        let dircmd = './src/commands/';

        fs.lstat(dircmd, (err) => {
            if (err) {
                console.clear()
                console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorfatal} ${chalk.bold(`${errorspt.errorcmdp}`)}\n`)
            }
            else {
                fs.access(`${dircmd}${replacec}${formatoc}`, fs.F_OK, (err) => {
                    if (err) {
                        console.clear()
                        console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorcmdn} \n`)
                    }
                    else {
                        console.clear()
                        if (help == '--help') {
                            let dirh = `./src/config/txt/help_${replacec}.txt`;
                            let help = fs.readFileSync(dirh, 'utf8')

                            console.clear()
                            console.log(help)
                            exit()
                        }
                        else {
                            const func = require(`./src/commands/${replacec}`);
                            func()
                        }
                    }
                })
            }
        })
    }
}
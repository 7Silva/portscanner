const chalk = require('chalk');
const moment = require("moment");
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const { errorspt } = require('../config/json/console.json');
const nodePortScanner = require('node-port-scanner');
const { ports } = require('../config/json/ports.json');
const fs = require('fs');
const { exit } = require('process');
const args = process.argv;

let user = process.env.USERNAME;
let data = moment().format("hh:mm:ss DD/MM/YYYY");
let servidor = args[3];
let portsc = Number(args[4]);

function scanp() {
    fs.access('./src/config/json/ports.json', fs.F_OK, (err) => {
        if (err) {
            console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorfatal} ${errorspt.errorconfig} \n`)
            exit()
        }
        else {
            if (!servidor) {
                console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorservidornull} \n`)
                exit()
            }
            else {
                let port = ports.portsp
                if (!port.toString) {
                    console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorportsnull} ${chalk.bold(`${errorspt.errorportspnull}`)} \n`)
                    exit()
                }
                else {
                    let servidorr = servidor.split('https://');
                    console.log(`[${chalk.blue('-')}] Iniciando scan | Servidor: ${servidor} | Data: ${data}`)
                    if (!servidorr[1]) {
                        if (!portsc) {
                            nodePortScanner(`${servidor}`, [])
                                .then(results => {
                                    if (results.ports.open == '') {
                                        console.log(`\n[${chalk.red('-')}] Nenhuma porta aberta identificada nesse servidor!`);
                                    }
                                    else {
                                        console.log(`\n[${chalk.green('-')}] Portas abertas: ${chalk.bold(`${results.ports.open}`)}`);
                                    }
                                    console.log(`\n[${chalk.blue('-')}] Data Finalização: ${moment().format("hh:mm:ss DD/MM/YYYY")}`)
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                        else {
                            nodePortScanner(`${servidor}`, [ portsc ])
                                .then(results => {
                                    if (results.ports.open == '') {
                                        console.log(`\n[${chalk.red('-')}] Nenhuma porta aberta identificada nesse servidor!`);
                                    }
                                    else {
                                        console.log(`\n[${chalk.green('-')}] Portas abertas: ${chalk.bold(`${results.ports.open}`)}`);
                                    }
                                    console.log(`\n[${chalk.blue('-')}] Data Finalização: ${moment().format("hh:mm:ss DD/MM/YYYY")}`)
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    }
                    else {
                        if (!portsc) {
                            nodePortScanner(`${servidorr[1]}`, [])
                                .then(results => {
                                    console.log(`[${chalk.blue('-')}] Iniciando scan | Servidor: ${servidor} | Data: ${data}`)
                                    sleep(2500).then(() => {
                                        if (results.ports.open == '') {
                                            console.log(`\n[${chalk.red('-')}] Nenhuma porta aberta identificada nesse servidor!`);
                                        }
                                        else {
                                            console.log(`\n[${chalk.green('-')}] Portas abertas: ${chalk.bold(`${results.ports.open}`)}`);
                                        }
                                        console.log(`\n[${chalk.blue('-')}] Data Finalização: ${moment().format("hh:mm:ss DD/MM/YYYY")}`)
                                    })
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                        else {
                            nodePortScanner(`${servidorr[1]}`, [ portsc ])
                                .then(results => {
                                    console.log(`[${chalk.blue('-')}] Iniciando scan | Servidor: ${servidor} | Data: ${data}`)
                                    sleep(2500).then(() => {
                                        if (results.ports.open == '') {
                                            console.log(`\n[${chalk.red('-')}] Nenhuma porta aberta identificada nesse servidor!`);
                                        }
                                        else {
                                            console.log(`\n[${chalk.green('-')}] Portas abertas: ${chalk.bold(`${results.ports.open}`)}`);
                                        }
                                        console.log(`\n[${chalk.blue('-')}] Data Finalização: ${moment().format("hh:mm:ss DD/MM/YYYY")}`)
                                    })
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    }

                }
            }
        }
    })
}

module.exports = scanp;
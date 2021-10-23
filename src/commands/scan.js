const
  { errorspt } = require('../config/json/console.json'),
  moment = require('moment'),
  chalk = require('chalk'),
  path = require('path');
  
const
  nodePortScanner = require('node-port-scanner'),
  { ports } = require('../config/json/ports.json'),
  args = process.argv,
  fs = require('fs');

let
  user = process.env.USERNAME ?? 'Sem nome',
  date = moment().format("hh:mm:ss DD/MM/YYYY"),
  portsc = Number(args[4])
  servidor = args[3];

module.exports = () => {
  if (!servidor) {
    console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorservidornull} \n`);
    return process.exit();
  }
  
  return fs.access('./src/config/json/ports.json', fs.F_OK, (err) => {
    if (err) {
      console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorfatal} ${errorspt.errorconfig}\n`);
      return process.exit();
    }
    
    console.log(`[${chalk.blue('-')}] Iniciando scan | Servidor: ${servidor} | data: ${date}`);
    
    if (!portsc) {
      return nodePortScanner(servidor, []).then(results => {
        if (!results?.ports?.open)
          return console.log(`\n[${chalk.red('-')}] Nenhuma porta aberta identificada nesse servidor!`);
        else
          return console.log(`\n[${chalk.green('-')}] Portas abertas: ${chalk.bold(`${results.ports.open}`)}`);
        return console.log(`\n[${chalk.blue('-')}] data Finalização: ${moment().format("hh:mm:ss DD/MM/YYYY")}`);
      }).catch(console.log);
    } else {
      return nodePortScanner(servidor, [ portsc ]).then(results => {
        if (!results?.ports?.open)
          return console.log(`\n[${chalk.red('-')}] Nenhuma porta aberta identificada nesse servidor!`);
        else
          return console.log(`\n[${chalk.green('-')}] Portas abertas: ${chalk.bold(`${results.ports.open}`)}`);
        return console.log(`\n[${chalk.blue('-')}] data Finalização: ${moment().format("hh:mm:ss DD/MM/YYYY")}`);
      }).catch(console.log);
    }
  });
};
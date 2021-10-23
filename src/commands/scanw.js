const
  { errorspt } = require('../config/json/console.json'),
  chalk = require('chalk'),
  moment = require("moment");
  
const
  { ports } = require('../config/json/ports.json'),
  nodePortScanner = require('node-port-scanner'),
  fs = require('fs'), args = process.argv;
  
let
  user = process.env.USERNAME,
  data = moment().format("hh:mm:ss DD/MM/YYYY"),
  servidor = args[3];
  
 module.exports = () => {
  if (!servidor) {
    console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorservidornull}\n`);
    return process.exit();
  }
  
  return fs.access('./src/config/json/ports.json', fs.F_OK, (err) => {
    if (err) {
      console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorfatal} ${errorspt.errorconfig}\n`);
      return process.exit();
    }
     
    let port = ports.portsw;
     if (!port.length) {
      console.log(`[${chalk.red('-')}] Olá ${user},`, errorspt.errorportsnull, chalk.bold(errorspt.errorportspnull), '\n');
      return process.exit();
    }
    
    console.log(`[${chalk.blue('-')}] Iniciando scan | Servidor: ${servidor} | Data: ${data}`);
    
    return nodePortScanner(servidor, port).then(results => {
      if (results?.ports?.open)
        console.log(`\n[${chalk.green('-')}] Portas abertas: ${chalk.bold(results.ports.open)}`);
      if (results?.ports?.closed)
        console.log(`\n[${chalk.red('-')}] Portas fechadas: ${chalk.bold(results.ports.closed)}`);
      console.log(`\n[${chalk.blue('-')}] Data Finalização: ${moment().format("hh:mm:ss DD/MM/YYYY")}`);
    }).catch(console.log);
  });
};
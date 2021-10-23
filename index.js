const
  { errorspt } = require('./src/config/json/console.json'),
  chalk = require('chalk'), fs = require('fs'),
  args = process.argv;
  
let
  user = process.env.USERNAME ?? 'Sem nome',
  op = args[2],
  help = args[3];
  
switch(op) {
  case '--help': case '-help':
    let
      dirh = './src/config/txt/help.txt',
      help = fs.readFileSync(dirh, 'utf8');
    console.clear();
    console.log(help);
    break;
    
  default:
    if (!op) {
      console.clear();
      console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.erroropn} \n`);
      return process.exit();
    }
    
    let
      replacec = op.replace(/-/g, ``),
      formatoc = '.js',
      dircmd = './src/commands/';
      
    return fs.lstat(dircmd, (err) => {
      if (err) {
        console.clear();
        return console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorfatal} ${chalk.bold(`${errorspt.errorcmdp}`)}\n`);
      }
      
      fs.access(`${dircmd}${replacec}${formatoc}`, fs.F_OK, (err) => {
        if (err) {
          console.clear();
          return console.log(`[${chalk.red('-')}] Olá ${user}, ${errorspt.errorcmdn} \n`);
        }
        
        console.clear();
        if (help == '--help') {
          let
            dirh = `./src/config/txt/help_${replacec}.txt`,
            help = fs.readFileSync(dirh, 'utf8');
          console.clear(); console.log(help);
          process.exit();
          } else return require(`./src/commands/${replacec}`)();
      })
    });
    break;
}
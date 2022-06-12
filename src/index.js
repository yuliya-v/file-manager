import { userName } from './modules/userName.mjs';
import { stdin, stdout } from 'process';
import { homeDir } from './modules/navigation.mjs';
import { EOL } from 'os';
import { listen } from './modules/app.mjs';

stdout.write(`Welcome to the File Manager, ${userName}!
You are currently in ${homeDir}
`);

process.on('SIGINT', exitApp);

stdin.on('data', (data) => {
  const [command, arg, arg2, arg3] = data
    .toString()
    .trim()
    .split(' ')
    .map(el => el.trim())
    .filter(el => el);

  if (command === '.exit') exitApp();

  listen(command, arg, arg2, arg3);
});

function exitApp() {
  console.log(EOL + `Thank you for using File Manager, ${userName}!`);
  process.exit();
}

import { EOL, cpus, homedir, arch, userInfo  } from "os"

export const getOSData = (arg) => {
  switch (arg) {
    case '--EOL':
      if (EOL === '\n') return '\\n';
      return '\\r\n';

    case '--cpus': {
      const data = cpus().map(({ model, speed }) => ({
        model,
        speed: `${(+speed / 1000).toFixed(2)}GHz`
      }))
      data.unshift({ model: `amount of CPUS: ${cpus().length}` });
      return data;
    }

    case '--homedir':
      return homedir();

    case '--architecture':
      return arch();

    case '--username':
      return userInfo().username;

    default:
      return 'Invalid input';
  }
}
import { EOL } from "os";
import { calculateHash } from "./calcHash.mjs";
import { add, cat, changeName, copyFile, removeFile } from "./fileOperations.mjs";
import { moveFile } from "./moveFile.mjs";
import { cd, list, state, up } from "./navigation.mjs";
import { getOSData } from "./os.mjs";
import { zip } from "./zip.mjs";

export const listen = (command, arg, arg2, arg3) => {
  switch (command) {
    case 'cat': {
      if (arg2) argError();
      else cat(arg);
      break;
    }
    case 'add': {
      if (arg2) argError();
      else add(arg);
      break;
    }
    case 'rm': {
      if (arg2) argError();
      else removeFile(arg);
      break;
    }
    case 'rn': {
      if (arg3) argError();
      else changeName(arg, arg2);
      break;
    }
    case 'cp': {
      if (arg3) argError();
      else copyFile(arg, arg2);
      break;
    }
    case 'mv': {
      if (arg3) argError();
      else moveFile(arg, arg2);
      break;
    }
    case 'os': {
      if (arg2) argError();
      else if (arg === '--cpus') console.table(getOSData(arg));
      else console.log(getOSData(arg));
      break;
    }
    case 'cd': {
      if (arg2) argError();
      else cd(arg)
      break;
    }
    case 'ls': {
      if (arg) argError();
      else list(state.currentDir);
      break;
    }
    case 'up': {
      if (arg) argError();
      else up();
      break;
    }
    case 'hash': {
      if (arg2) argError();
      else calculateHash(arg);
      break;
    }
    case 'compress': {
      if (arg3) argError();
      else zip(arg, arg2, 'compress');
      break;
    }
    case 'decompress': {
      if (arg3) argError();
      else zip(arg, arg2, 'decompress');
      break;
    }
    default:
      console.log('Invalid input'); 
  }
}

function argError() {
  console.log('Invalid input: unexpected argument');
}
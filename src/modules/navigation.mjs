import { stat, readdir } from 'fs/promises';
import path from 'path';
import { EOL } from 'os';
import os from 'os';
import { stdout } from 'process';

const homeDir = os.homedir();

const state = {
  currentDir: homeDir,
}

const list = async (pathToDir) => {
  try {
    const data = await readdir(pathToDir);
    stdout.write(data.join(EOL) + EOL);
  } catch(er) {
    console.log(er);
  }
};

const getAbsolutePath = (input) => path.isAbsolute(input)
  ? input 
  : path.join(state.currentDir, input);

const cd = async (arg) => {
  if (!arg) {
    state.currentDir = homeDir;
    stdout.write(`You are currently in ${homeDir}` + EOL);
    return;
  }

  const absPath = getAbsolutePath(arg);
  if (absPath.length < homeDir.length) {
    stdout.write(`You are currently in ${state.currentDir}` + EOL);
    return
  }

  try {
    await stat(absPath)
    state.currentDir = absPath;
    stdout.write(`You are currently in ${absPath}` + EOL);
  } catch {
    stdout.write(`Operation failed` + EOL);
  }
}

const up = async () => {
  const newPath = state.currentDir === homeDir ? homeDir : path.join(state.currentDir, '..');
  state.currentDir = newPath;
  stdout.write(`You are currently in ${newPath}` + EOL);
}

export {
  cd, 
  up,
  getAbsolutePath,
  list,
  state,
  homeDir,
}
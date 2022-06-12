import { createReadStream, createWriteStream } from "fs";
import { rename, rm, stat } from "fs/promises";
import path from "path";
import { pipeline } from "stream";
import { getAbsolutePath, state } from "./navigation.mjs";

export const cat = (input) => {
  const inputFile = getAbsolutePath(input);
  const readStream = createReadStream(inputFile, 'utf8');

  readStream.on('data', (chunk) => console.log(chunk));
  readStream.on('end', () => console.log('End!'));
  readStream.on('error', () => {
    console.log('Operation failed: non-existent file');
  });
}

export const add = (input) => {
  const newFile = getAbsolutePath(input);
  const writeStream = createWriteStream(newFile);
  writeStream.on('error', () => console.log('Operation failed'));
}

export const changeName = async (input, output) => {
  if (!input || !output) {
    console.log('Invalid input: missing arguments');
    return;
  }

  const oldFile = getAbsolutePath(input);
  const newFile = getAbsolutePath(output);

  try {
    await rename(oldFile, newFile);
  } catch {
    console.log('Operation failed');
  }
};

export const removeFile = async (input) => {
  const inputFile = getAbsolutePath(input);

  try {
    await rm(inputFile);
  } catch {
    console.log('Operation failed: non-existent file');
  }
}

export const copyFile = async (input, output) => {
  if (!input || !output) {
    console.log('Invalid input: missing arguments');
    return;
  }

  const inputFile = getAbsolutePath(input);
  const outputDir = getAbsolutePath(output);
  let outputFile = '';
  const inputFileInfo = path.parse(inputFile);
  
  try {
    await stat(path.join(outputDir, inputFileInfo.base));
    outputFile = path.join(outputDir, `${inputFileInfo.name}-copy${inputFileInfo.ext}`)
  } catch {
    outputFile = path.join(outputDir, inputFileInfo.base);
  }
  
  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);

  pipeline(
    readStream,
    writeStream,
    async (err) => {
      if (err) {
        console.log('Operation failed');
        try { 
          await rm(outputFile);
        } catch (er) {} 
      }
    }
  )
};

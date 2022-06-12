import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import path from 'path';
import { getAbsolutePath, state } from './navigation.mjs';
import { rm } from 'fs/promises';

export const zip = async (input, output, operation) => {

  if (!input && !output) {
    console.log('Invalid input: missing arguments');
    return;
  }

  const inputFile = getAbsolutePath(input);
  const outputDir = output === undefined ? state.currentDir : getAbsolutePath(output);

  const outputFile = path.join(
    outputDir, 
    operation === 'compress'
      ? path.parse(inputFile).base + '.br'
      : path.parse(inputFile).name
  );
  
  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const brotli = operation === 'compress'
    ? createBrotliCompress()
    : createBrotliDecompress();

  readStream.on('error', (err) => {
    console.log(err.code, 'Operation failed: non-existent file');
    writeStream.destroy();
    rm(outputFile);
  });

  writeStream.on('error', (err) => {
    console.log(err.code, 'Operation failed: non-existent path');
    readStream.destroy();
  });
  
  pipeline(
    readStream,
    brotli,
    writeStream
  );
}
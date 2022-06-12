import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";
import path from "path";
import { pipeline } from "stream";
import { getAbsolutePath } from "./navigation.mjs";

export const moveFile = async (input, output) => {
  if (!input || !output) {
    console.log('Invalid input: missing arguments');
    return;
  }

  const inputFile = getAbsolutePath(input);
  const outputDir = getAbsolutePath(output);
  const outputFile = path.join(outputDir, path.parse(inputFile).base);
  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);

  readStream.on('error', async () => {
    writeStream.close();
    try { 
      await rm(outputFile);
    } catch {} 
  });

  writeStream.on('finish', async () => {
    try { 
      await rm(inputFile) 
    }
    catch {}
  });

  writeStream.on('error', () => {
    readStream.close();
  });

  pipeline(
    readStream,
    writeStream,
    (err) => {
      if (err) console.log('Operation failed');
    }
  )
};

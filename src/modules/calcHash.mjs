import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { getAbsolutePath } from './navigation.mjs';

export const calculateHash = async (input) => {
  const inputFile = getAbsolutePath(input);
  const readStream = createReadStream(inputFile);
  const hashStream = createHash('sha256');

  readStream.on('data', (chunk) => hashStream.update(chunk));
  readStream.on('end', () => console.log(hashStream.digest('hex')));
  readStream.on('error', (err) => {
    console.log('Operation failed: non-existent file');
    hashStream.destroy();
  });
};

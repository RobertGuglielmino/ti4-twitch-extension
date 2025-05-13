import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

// Install archiver first:
// npm install archiver --save-dev

const output = fs.createWriteStream(path.resolve('dist.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

archive.pipe(output);

// Set the directory to zip
const distDir = path.resolve('dist');

// Add index.html with proper MIME type
archive.file(path.join(distDir, 'index.html'), { 
  name: 'index.html',
  comment: 'text/html' // This helps with MIME type
});

// Add CSS with proper MIME type
archive.file(path.join(distDir, 'style.css'), { 
  name: 'style.css',
  comment: 'text/css' // This helps with MIME type
});

// Add JS with proper MIME type
archive.file(path.join(distDir, 'viewer.js'), { 
  name: 'viewer.js',
  comment: 'application/javascript' // This helps with MIME type
});

// Add assets folder
archive.directory(path.join(distDir, 'assets'), 'assets');

// Add the Twitch config file
archive.file(path.join(distDir, 'twitch-config.json'), {
  name: 'twitch-config.json',
  comment: 'application/json'
});

output.on('close', () => {
  console.log(`ZIP created: ${archive.pointer()} total bytes`);
});

archive.finalize();
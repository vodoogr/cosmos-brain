const fs = require('fs');
const https = require('https');
const path = require('path');

const texturesUrl = 'https://www.solarsystemscope.com/textures/download/';
const targetDir = path.join(__dirname, '../public/textures');

const filesToDownload = [
  '2k_sun.jpg',
  '2k_mercury.jpg',
  '2k_venus_surface.jpg',
  '2k_earth_daymap.jpg',
  '2k_moon.jpg',
  '2k_mars.jpg',
  '2k_jupiter.jpg',
  '2k_saturn.jpg',
  '2k_saturn_ring_alpha.png',
  '2k_uranus.jpg',
  '2k_neptune.jpg'
];

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, filename);
    if (fs.existsSync(dest)) {
      console.log(`Skipping ${filename}, already exists.`);
      return resolve();
    }
    
    const file = fs.createWriteStream(dest);
    https.get(texturesUrl + filename, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${filename}`);
          resolve();
        });
      } else {
        console.error(`Failed to download ${filename}: ${response.statusCode}`);
        reject();
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading 2K planetary textures...');
  for (const file of filesToDownload) {
    await downloadFile(file);
  }
  console.log('Done!');
}

main();

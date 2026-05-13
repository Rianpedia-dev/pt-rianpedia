const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const dirPath = path.join(dir, f);
    if (!fs.existsSync(dirPath)) continue;
    const stat = fs.statSync(dirPath);
    if (stat.isDirectory()) {
      if (f === 'node_modules' || f === '.git' || f === '.next' || f === 'public' || f === 'artifacts') continue;
      walk(dirPath, callback);
    } else {
      callback(dirPath);
    }
  }
}

let count = 0;

walk('.', function(filePath) {
  const exts = ['.ts', '.tsx', '.js', '.jsx', '.md', '.css'];
  const ext = path.extname(filePath);
  if (!exts.includes(ext) && path.basename(filePath) !== 'package.json') return;
  // Skip package-lock.json just in case
  if (path.basename(filePath) === 'package-lock.json') return;
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    content = content.replace(/Rianpedia/g, 'Rianpedia');
    content = content.replace(/rianpedia/g, 'rianpedia');
    content = content.replace(/RIANPEDIA/g, 'RIANPEDIA');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
      count++;
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
});

console.log(`Total files updated: ${count}`);

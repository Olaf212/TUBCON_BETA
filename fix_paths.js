import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.html') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./');
let changedFiles = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/(src|href)="public\//g, '$1="/');
  newContent = newContent.replace(/'public\//g, "'/");
  newContent = newContent.replace(/"public\//g, '"/');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedFiles++;
    console.log(`Updated ${file}`);
  }
});
console.log(`Total files changed: ${changedFiles}`);

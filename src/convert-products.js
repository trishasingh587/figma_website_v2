// This script converts all products from imageUrl format to images[] format
// Run this once to migrate the data

const fs = require('fs');

const filePath = './data/products.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of imageUrl with images array (single image)
content = content.replace(/imageUrl: ('https[^']+'),\n/g, 'images: [$1],\n');

fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Conversion complete! All products now use images[] format.');

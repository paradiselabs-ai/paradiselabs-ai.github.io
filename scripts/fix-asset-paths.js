import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the dist directory
const distDir = path.resolve(__dirname, '..', 'dist');

// Get the base URL from environment or default to '/'
const baseUrl = process.env.BASE_URL || '/';

console.log('Starting asset path correction...');

// List of HTML files to process
const htmlFiles = ['index.html', '200.html', '404.html'];

// Process each HTML file
htmlFiles.forEach(htmlFile => {
  const htmlPath = path.join(distDir, htmlFile);
  
  if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Replace /GLUE/ paths with the correct base path
    if (htmlContent.includes('/GLUE/')) {
      const correctedContent = htmlContent.replace(/\/GLUE\//g, baseUrl);
      fs.writeFileSync(htmlPath, correctedContent);
      console.log(`✅ Fixed asset paths in ${htmlFile}`);
    } else {
      console.log(`ℹ️ No /GLUE/ paths found in ${htmlFile}, skipping`);
    }
  } else {
    console.warn(`⚠️ ${htmlFile} not found, skipping`);
  }
});

// Also fix sw.js file references if it exists
const swJsPath = path.join(distDir, 'sw.js');
if (fs.existsSync(swJsPath)) {
  let swContent = fs.readFileSync(swJsPath, 'utf8');
  
  // Replace /GLUE/ paths with the correct base path
  if (swContent.includes('/GLUE/')) {
    const correctedContent = swContent.replace(/\/GLUE\//g, baseUrl);
    fs.writeFileSync(swJsPath, correctedContent);
    console.log('✅ Fixed asset paths in sw.js');
  } else {
    console.log('ℹ️ No /GLUE/ paths found in sw.js, skipping');
  }
} else {
  console.warn('⚠️ sw.js not found, skipping');
}

console.log('✅ Asset path correction complete'); 
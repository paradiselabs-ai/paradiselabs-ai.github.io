/**
 * Image Optimization Script for GLUE Website
 * 
 * This script creates optimized versions of images and WebP alternatives
 * without requiring heavy dependencies in the project itself.
 * 
 * It uses sharp if available (npm install sharp --no-save) or falls back
 * to informing the user about alternative optimization methods.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SOURCE_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');
const FORMATS = ['.png', '.jpg', '.jpeg', '.gif'];
const QUALITY = 85;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Check if we should try to use sharp
let useSharp = false;
try {
  // Try to dynamically import sharp only when needed
  // This way it's not a dependency of the project
  require.resolve('sharp');
  useSharp = true;
  console.log('✅ Using sharp for image optimization');
} catch (err) {
  console.log('⚠️ Sharp not found - using alternative optimization instructions');
}

/**
 * Process a single image file
 */
async function processImage(filePath) {
  const filename = path.basename(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath, extension);
  const outputPath = path.join(OUTPUT_DIR, filename);
  const webpOutputPath = path.join(OUTPUT_DIR, `${basename}.webp`);
  
  console.log(`Processing: ${filename}`);
  
  try {
    if (useSharp) {
      // Use sharp for high-quality compression
      const sharp = require('sharp');
      
      // Create WebP version
      await sharp(filePath)
        .webp({ quality: QUALITY })
        .toFile(webpOutputPath);
        
      console.log(`  ✓ Created WebP: ${basename}.webp`);
      
      // Create optimized original format (skip if already webp)
      if (extension !== '.webp') {
        const sharpInstance = sharp(filePath).withMetadata();
        
        if (extension === '.png') {
          await sharpInstance.png({ quality: QUALITY }).toFile(outputPath);
        } else if (extension === '.jpg' || extension === '.jpeg') {
          await sharpInstance.jpeg({ quality: QUALITY }).toFile(outputPath);
        } else {
          // For other formats, just copy
          fs.copyFileSync(filePath, outputPath);
        }
        
        console.log(`  ✓ Created optimized: ${filename}`);
      }
    } else {
      // Just provide instructions for manual optimization
      console.log(`  ℹ To optimize ${filename}, install these tools:`);
      console.log('    - For WebP: cwebp (https://developers.google.com/speed/webp/download)');
      console.log('    - For PNG: pngquant (https://pngquant.org/)');
      console.log('    - For JPG: mozjpeg (https://github.com/mozilla/mozjpeg)');
      console.log('  ');
      console.log('  Example commands:');
      console.log(`    cwebp -q 85 "${filePath}" -o "${webpOutputPath}"`);
      
      if (extension === '.png') {
        console.log(`    pngquant --quality=80-90 --strip --output "${outputPath}" "${filePath}"`);
      } else if (extension === '.jpg' || extension === '.jpeg') {
        console.log(`    convert "${filePath}" -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG "${outputPath}"`);
      }
    }
  } catch (error) {
    console.error(`  ❌ Error processing ${filename}: ${error.message}`);
  }
}

/**
 * Find all images recursively in a directory
 */
function findImages(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory() && item !== 'optimized') {
      // Recursively process subdirectories
      results = results.concat(findImages(itemPath));
    } else if (stat.isFile() && FORMATS.includes(path.extname(itemPath).toLowerCase())) {
      // This is an image file
      results.push(itemPath);
    }
  }
  
  return results;
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️ GLUE Image Optimizer');
  console.log('------------------------');
  
  try {
    // Find all image files
    const imageFiles = findImages(SOURCE_DIR);
    console.log(`Found ${imageFiles.length} images to process`);
    
    // Process each image
    for (const filePath of imageFiles) {
      await processImage(filePath);
    }
    
    console.log('------------------------');
    console.log(`✅ Processing complete! Optimized ${imageFiles.length} images.`);
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
    
    if (!useSharp) {
      console.log('\n📌 Tip: For better compression, run:');
      console.log('  npm install sharp --no-save && npm run optimize-images');
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error); 
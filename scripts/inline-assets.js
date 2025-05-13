import fs from 'fs';
import path from 'path';

// Function to run the inlining process
async function inlineAssets() {
  const distDir = path.resolve('dist');
  const htmlFile = path.join(distDir, 'index.html');
  const cssFile = path.join(distDir, 'style.css');
  const jsFile = path.join(distDir, 'viewer.js');

  console.log('Reading files...');
  
  // Read the files
  let htmlContent = await fs.promises.readFile(htmlFile, 'utf8');
  
  // Check if CSS file exists and read it
  let cssContent = '';
  try {
    cssContent = await fs.promises.readFile(cssFile, 'utf8');
    console.log('CSS file found and read');
  } catch (err) {
    console.warn('CSS file not found, continuing without CSS inlining');
  }
  
  // Check if JS file exists and read it
  let jsContent = '';
  try {
    jsContent = await fs.promises.readFile(jsFile, 'utf8');
    console.log('JS file found and read');
  } catch (err) {
    console.warn('JS file not found, continuing without JS inlining');
  }

  console.log('Inlining assets...');
  
  // Inline the CSS
  if (cssContent) {
    // Replace existing stylesheet link or add to head if not found
    if (htmlContent.includes('<link') && htmlContent.includes('stylesheet')) {
      htmlContent = htmlContent.replace(
        /<link[^>]*rel=["']stylesheet["'][^>]*>/,
        `<style type="text/css">${cssContent}</style>`
      );
    } else {
      htmlContent = htmlContent.replace(
        '</head>',
        `<style type="text/css">${cssContent}</style>\n</head>`
      );
    }
    
    // Delete the original CSS file
    try {
      await fs.promises.unlink(cssFile);
      console.log('Original CSS file removed');
    } catch (err) {
      console.warn('Could not remove CSS file:', err.message);
    }
  }
  
  // Inline the JS
  if (jsContent) {
    // Check if we need to replace the main script or the module script
    if (htmlContent.includes('src="./viewer.js"')) {
      htmlContent = htmlContent.replace(
        /<script[^>]*src=["']\.\/viewer\.js["'][^>]*><\/script>/,
        `<script type="text/javascript">${jsContent}</script>`
      );
    } else if (htmlContent.includes('src="/src/main.tsx"')) {
      htmlContent = htmlContent.replace(
        /<script[^>]*src=["']\/src\/main\.tsx["'][^>]*><\/script>/,
        `<script type="text/javascript">${jsContent}</script>`
      );
    } else {
      // Add before closing body if no matching script found
      htmlContent = htmlContent.replace(
        '</body>',
        `<script type="text/javascript">${jsContent}</script>\n</body>`
      );
    }
    
    // Delete the original JS file
    try {
      await fs.promises.unlink(jsFile);
      console.log('Original JS file removed');
    } catch (err) {
      console.warn('Could not remove JS file:', err.message);
    }
  }
  
  // Write the updated HTML
  await fs.promises.writeFile(htmlFile, htmlContent);
  console.log('Assets successfully inlined into HTML!');
}

// Run the function
inlineAssets().catch(err => {
  console.error('Error inlining assets:', err);
  process.exit(1);
});
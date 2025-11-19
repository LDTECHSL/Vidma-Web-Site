import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = ['/', '/marketplace'];
const distPath = path.join(__dirname, 'dist');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startPreviewServer() {
  return new Promise((resolve) => {
    const server = spawn('npm', ['run', 'preview'], { 
      shell: true,
      stdio: 'pipe'
    });
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(output);
      if (output.includes('localhost:')) {
        setTimeout(() => resolve(server), 2000);
      }
    });
  });
}

async function prerender() {
  console.log('🚀 Starting prerender...');
  console.log('📡 Starting preview server...');
  
  const server = await startPreviewServer();
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  for (const route of routes) {
    console.log(`📄 Prerendering: ${route}`);
    
    try {
      const page = await browser.newPage();
      
      // Increase timeout and ignore API errors
      page.setDefaultNavigationTimeout(60000);
      page.on('response', response => {
        if (!response.ok()) {
          console.log(`⚠️  API error ignored: ${response.url()}`);
        }
      });
      
      const url = `http://localhost:4173${route}`;
      
      await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });
      
      // Wait for React to render
      console.log('⏳ Waiting for content to load...');
      await wait(8000);
      
      const html = await page.content();
      
      // Save the rendered HTML
      let outputPath;
      if (route === '/') {
        outputPath = path.join(distPath, 'index.html');
      } else {
        const routePath = path.join(distPath, route.substring(1));
        if (!fs.existsSync(routePath)) {
          fs.mkdirSync(routePath, { recursive: true });
        }
        outputPath = path.join(routePath, 'index.html');
      }
      
      fs.writeFileSync(outputPath, html);
      console.log(`✅ Saved: ${outputPath}`);
      
      await page.close();
    } catch (error) {
      console.error(`❌ Error prerendering ${route}:`, error.message);
    }
  }
  
  await browser.close();
  
  // Kill preview server
  server.kill();
  
  console.log('🎉 Prerendering complete!');
}

prerender().catch(console.error);
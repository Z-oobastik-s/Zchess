import { chromium } from 'playwright';

const url = process.argv[2] || 'http://127.0.0.1:4173/Zchess/';
let pageError = '';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
page.on('pageerror', (err) => { pageError = err.message; });

await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);

const text = await page.textContent('body');
console.log('PAGEERROR:', pageError || 'none');
console.log('HAS_ZCHESS:', text.includes('ZCHESS'));
console.log('HAS_HERO:', text.includes('Шахматы нового поколения'));
console.log('HAS_FAIL:', text.includes('Ошибка загрузки'));

await browser.close();

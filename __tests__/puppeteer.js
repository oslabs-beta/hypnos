const puppeteer = require('puppeteer');

const APP = `http://localhost:${process.env.PORT || 3000}/`;

describe('front end renders', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  describe('Initial display', () => {
    xit('queries container loads successfully', async () => {
      // We navigate to the page at the beginning of each case so we have a
      // fresh start
      await page.goto(APP);
      await page.waitForSelector('#queries-container');
      const queriesContainer = await page.$eval('#queries-container', el => !!el);
      expect(queriesContainer).toBe(true);
    });

    xit('query input loads successfully', async () => {
      await page.goto(APP);
      await page.waitForSelector('#query-input');
      const queriesInput = await page.$eval('#query-input', el => !!el);
      expect(queriesInput).toBe(true);
    });

    xit('query output loads successfully', async () => {
      await page.goto(APP);
      await page.waitForSelector('#query-output');
      const queriesOutput = await page.$eval('#query-output', el => !!el);
      expect(queriesOutput).toBe(true);
    });
  });
});

const puppeteer = require('puppeteer');

const APP = `http://localhost:${process.env.PORT || 3000}/`;


describe('front end renders', () => {

    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        page = await browser.newPage();
    });

    afterAll(() => {
        browser.close();
    });

    describe('Initial display', () => {
        it('queries container loads successfully', async () => {
            // We navigate to the page at the beginning of each case so we have a
            // fresh start
            await page.goto(APP);
            await page.waitForSelector('#queries-container');
            const queriesContainer = await page.$eval('#queries-container', el => el ? true : false);
            expect(queriesContainer).toBe(true);
        })

        it('query input loads successfully', async () => {
            await page.goto(APP);
            await page.waitForSelector('#query-input');
            const queriesInput = await page.$eval('#query-input', el => el ? true : false);
            expect(queriesInput).toBe(true);
        })

        it('query output loads successfully', async() => {
            await page.goto(APP);
            await page.waitForSelector('#query-output');
            const queriesOutput = await page.$eval('#query-output', el => el ? true : false);
            expect(queriesOutput).toBe(true);
        })
    });

})
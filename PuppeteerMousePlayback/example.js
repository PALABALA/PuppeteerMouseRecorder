'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require("path");

const { playAllMouseActivities } = require('./src/mouse-player');

const mouseFile = fs.readFileSync(path.join(__dirname, './testfile.json'), 'utf8');
const mouseActivities = JSON.parse(mouseFile);

const width = 1280;
const height = 960;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            `--window-size=${width},${height}`
        ]
    });
    try {
        const page = await browser.newPage();
        await page.setViewport({width: width, height: height});
        await page.goto('https://threejs.org/examples/misc_controls_map.html');

        await playAllMouseActivities(page, mouseActivities, width, height);
    } catch (error) {
        console.error(error);
    }

    await browser.close();
})();

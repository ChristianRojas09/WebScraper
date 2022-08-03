const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const readline = require('readline')
const Wappalyzer = require('wappalyzer')

let website;
let contentManagementSystem;
let headlineArr = [];

//use readline to get the website URL from the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//ask user for site via terminal
const siteInput = () => {
    return (
        rl.question("Please provide the URL: ", function(site) {
            website = site;
            getCMS(site)
        })
    )
}

siteInput();

// Get CMS
const options = {
    debug: false,
    delay: 0,
    headers: {},
    maxDepth: 1,
    maxUrls: 1,
    maxWait: 10000,
    recursive: true,
    probe: true,
    userAgent: 'Wappalyzer',
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
    noScripts: true,
    noRedirect: true,
};

const wappalyzer = new Wappalyzer(options)

//async functions to intialize scraping
async function scraper(siteURL) { //init function
    const browser = await puppeteer.launch() //launch browser
    const page = await browser.newPage() //launch new page
    await page.goto('${siteURL}');

    //extract blog title

    //init array
    const title = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".entry-title")).map(x => x.textContent)
    })
    await fs.writeFile("title.txt", title.join("\r\n")) 

    await browser.close() //close browser
}

scraper();
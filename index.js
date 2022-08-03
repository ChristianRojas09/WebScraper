const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const Wappalyzer = require('wappalyzer')
const readline = require('readline');
const { stdin } = require('process');

let website;
let contentManagementSystem;
let headlineArr = [];

//get user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Ask user for website url
const askForURL = () => {
    return(
        rl.question("Please add URL: ", function(site) {
            website = site;
            getCMS(site)
        })
    )
}

//async functions 
async function crawl(siteName) { //init function
    const browser = await puppeteer.launch() //launch browser
    const page = await browser.newPage() //launch new page
    await page.goto(siteName)

    //extract blog title

    //init array
    const title = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".entry-title")).map(x => x.textContent)
    })
    await fs.writeFile("title.txt", title.join("\r\n")) 

    await browser.close() //close browser
}

start()
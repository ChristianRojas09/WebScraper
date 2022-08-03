const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const readline = require('readline')
const wappalyzer = require('wappalyzer')

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

//async functions 
async function start() { //init function
    const browser = await puppeteer.launch() //launch browser
    const page = await browser.newPage() //launch new page
    await page.goto("https://www.jcchouinard.com/")

    //extract blog title

    //init array
    const title = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".entry-title")).map(x => x.textContent)
    })
    await fs.writeFile("title.txt", title.join("\r\n")) 

    await browser.close() //close browser
}

start();
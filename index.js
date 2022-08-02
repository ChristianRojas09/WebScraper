const puppeteer = require('puppeteer')
const fs = require('fs/promises')

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

start()
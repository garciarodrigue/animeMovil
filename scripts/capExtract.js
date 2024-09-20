import puppeteer from 'puppeteer';

async function openNavigator(){
    try{
        const browser = await puppeteer.launch({
            headless: 'shell',
            defaultViewport: null,
        })
        const page = await browser.newPage()
        await page.goto('https://www3.animeflv.net/ver/sword-art-online-2');
        await page.waitForSelector('.CpCnA')
        const data = await page.evaluate(() => {
            return document.querySelector('.CpCnA iframe').src
        });
        console.log(data)
       browser.close()

    }
    catch (err){
        console.log({"error in openNavigator": err})
    }

}

openNavigator()
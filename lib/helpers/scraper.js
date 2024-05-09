const puppeteer = require('puppeteer')

// Use puppeteer to fetch client rendered html
async function getDynamicHtml(url) {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle0' })
    // eslint-disable-next-line no-undef
    const html = await page.evaluate(() => document.querySelector('*').outerHTML)

    await browser.close()
    return html
  } catch (err) {
    console.error(err)
    return null
  }
}

module.exports = {
  getDynamicHtml,
}

const { SlashCommandBuilder } = require('discord.js')
const cheerio = require('cheerio')
require('dotenv').config()
const { getDynamicHtml } = require('../../lib/helpers/scraper')

async function scrapeWoodsideData() {
  const html = await getDynamicHtml(process.env.ZAKOMETER_URL)
  const $ = cheerio.load(html)

  let wind = {
    average: $('tbody > tr:nth-child(2) > td').first().text() ?? '',
    gusts: $('tbody > tr:nth-child(3) > td').first().text() ?? '',
    direction: $('tbody > tr:nth-child(4) > td').first().text() ?? '',
  }
  return wind
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('zako')
    .setDescription('Replies with the latest wind data from the Zakometer at Woodside.'),
  async execute(interaction) {
    await interaction.deferReply()
    const wind = await scrapeWoodsideData()
    await interaction.editReply(
      `The current wind at Woodside is **${wind.average} ${wind.direction}**, gusting to **${wind.gusts}**.`
    )
  },
}

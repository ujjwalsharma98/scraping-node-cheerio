const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

writeStream.write(`Title,Item,Author \n`)

request('http://quotes.toscrape.com/', (error, response, html) => {
    if(!error && response.statusCode === 200){
        const $ = cheerio.load(html)

        const title = $('.header-box .col-md-8 a').html()
        // console.log(title.html())

        $('.quote').each((i, el) => {
            const item = $(el).find('.text').text();
            // const link = $(el).find('.a').attr('href');
            const author = $(el).find('.author').text();
            // console.log(item, author)

            writeStream.write(`${title} ${item}, ${author} \n`)
        })

        console.log('Scraping done!')
    }
})
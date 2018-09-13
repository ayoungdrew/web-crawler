const webCrawl = require('./lib/web-crawler.js').webCrawl
const internetData = require('./lib/internet-data.js')

const internetOne = internetData.internetOne
const internetTwo = internetData.internetTwo
const internetThree = internetData.internetThree

webCrawl(internetOne)
webCrawl(internetTwo)

// new comment

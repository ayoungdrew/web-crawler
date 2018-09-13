'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const webCrawl = require('../lib/web-crawler.js').webCrawl
const webCrawler = require('../lib/web-crawler.js')
const internetData = require('../lib/internet-data.js')
const internetOne = internetData.internetOne
const internetTwo = internetData.internetTwo


describe('Web crawler', function() {
  it('app should return an object', function () {
    let result = webCrawl(internetOne)
    assert.typeOf(result, 'object')
  })
  it('app should return same result even if page objects after index 0 are swapped around', function () {
    let result = webCrawl(internetTwo)
    console.log('Original page array, index 1:', internetTwo.pages[1])
    console.log('Original page array, index 2:', internetTwo.pages[2])
    let b = internetTwo.pages[1]
    internetTwo.pages[1] = internetTwo.pages[2]
    internetTwo.pages[2] = b
    console.log('Now swapping page array indices 1 and 2')
    console.log('New page array, index 1:', internetTwo.pages[1])
    console.log('New page array, index 2:', internetTwo.pages[2])
    console.log('result is', result)
    assert.deepEqual(result,
      { success:
         [ 'http://foo.bar.com/p1',
           'http://foo.bar.com/p3',
           'http://foo.bar.com/p2',
           'http://foo.bar.com/p4',
           'http://foo.bar.com/p5' ],
        skipped: [ 'http://foo.bar.com/p1' ],
        error: [] }
      )
  })
})

const internetData = require('./internet-data.js')

function webCrawl(internet) {
  const pages = internet.pages
  const listToExplore = [pages[0]]
  const listVisited = [pages[0].address]
  const skipped = []
  const error = []

  while ( listToExplore.length > 0 ) {
    // Removes page from to-visit list, prep for page crawl
    let nodeIndex = listToExplore.shift()
    nodeIndex.links.forEach( function (childIndex) {
      // Creates variable for the link's page object if one exists in internet
      let childIndexPage = pages.find(function (page) {
        return page.address === childIndex
      })
      // Tests if link goes to a real page. If so, it's added to to-visit list
      if (!listVisited.includes(childIndex) && childIndexPage) {
        listVisited.push(childIndex)
        listToExplore.push(childIndexPage)
      }
      // Tests if we've been to the link URL before
      else if (listVisited.includes(childIndex) && !skipped.includes(childIndex)) {
        skipped.push(childIndex)
      }
      // Records broken links
      else if (!childIndexPage) {
        error.push(childIndex)
      }
    })
  }

  const results = {
    success: listVisited,
    skipped,
    error
  }

  console.log(results)
  return results
}

module.exports = {
  webCrawl
}

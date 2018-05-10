const internetOne = {
  "pages": [
    {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5", "http://foo.bar.com/p1", "http://foo.bar.com/p6"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": []
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p7", "http://foo.bar.com/p4", "http://foo.bar.com/p5"]
    }
  ]
}

const internetTwo = {
  "pages": [
      {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p3"]
    },
    {
      "address":"http://foo.bar.com/p3",
      "links": ["http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": ["http://foo.bar.com/p1"]
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p1"]
    }
  ]
}

const internetThree = {
  "pages": [
    {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p1"]
    },
    {
      "address":"http://foo.bar.com/p3",
      "links": ["http://foo.bar.com/p2"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p3"]
    },
  ]
}

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

webCrawl(internetOne)
webCrawl(internetTwo)
// webCrawl(internetThree)

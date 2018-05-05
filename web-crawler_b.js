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
      "address":"http://foo.bar.com/p3",
      "links": ["http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p3"]
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

function webCrawl(internet) {
  // Record container for every page available on the internet
  const everyAddress = []
  const everyLink = []
  const pages = internet.pages
  // Populating everyLink container to record every available page on internet
  pages.forEach(p => everyAddress.push(p.address))
  pages.forEach(p => p.links.forEach(link => everyLink.push(link)))
  // Record of all pages visited, starting with just page 1
  const success = [pages[0].address]
  const skipped = []
  const error = []
  // On to page 1 links and the rest of the pages
  for (let i = 0; i < pages.length; i++) {
    if (success.includes(pages[i].address)) {
      pages[i].links.forEach(link => {
        if (everyAddress.includes(link) && success.includes(link) && !skipped.includes(link)) {
          skipped.push(link)
        } else if (everyLink.includes(link) && !success.includes(link)) {
          success.push(link)
        } else if (!everyLink.includes(link)) {
          error.push(link)
        }
      })
    }
  }

  const results = {}
  results.success = success
  results.skipped = skipped
  results.error = error
  console.log(results)
  return results
}

webCrawl(internetOne)
webCrawl(internetTwo)

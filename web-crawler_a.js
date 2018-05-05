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

function webCrawl(internet) {
  // Record container for every page available on the internet
  const everyLink = []
  const pages = internet.pages
  // Record of all pages visited, starting with page 1
  const success = [pages[0].address]
  const skipped = []
  const error = []
  // Populating everyLink container to record every available page on internet
  pages.forEach(p => everyLink.push(p.address))
  // Page 1 crawl
  pages[0].links.forEach(link => {
    if (everyLink.includes(link) && !success.includes(link)) {
      success.push(link)
    } else {
      error.push(link)
    }
  })
  // On to the rest of the pages
  for (let i=1; i < pages.length; i++) {
    // Checking if it was possible to arrive at this page to begin with
    if (success.includes(pages[i].address)) {
      // Now checking each link on the page
      pages[i].links.forEach(link => {
        // Checks if link is valid and if it's already been visited
        if (everyLink.includes(link) && success.includes(link) && !skipped.includes(link)) {
          skipped.push(link)
          // Checks if link is valid and it hasn't yet been visited
        } else if (everyLink.includes(link) && !success.includes(link)) {
          success.push(link)
          // Checks if link is invalid
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
// webCrawl(internetTwo)

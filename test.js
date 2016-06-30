var Crawler = require('phantom-crawler');

// Can be initialized with optional options object
var crawler = new Crawler();
// queue is an array of URLs to be crawled
crawler.queue.push('http://google.com/', 'http://npmjs.com/');
// Can also do `crawler.fetch(url)` instead of pushing it and crawling it
// Extract plainText out of each phantomjs page
Promise.all(crawler.crawl())
    .then(function(pages) {
        var texts = [];
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            // suffix Promise to return promises instead of callbacks
            var text = page.getPromise('plainText');
            texts.push(text);
            text.then(function(p) {
                return function() {
                    // Pages are like tabs, they should be closed
                    p.close()
                }
            }(page));
        }
        return Promise.all(texts);
    })
    .then(function(texts) {
        // texts = array of plaintext from the website bodies
        // also supports ajax requests
        console.log(texts);
    })
    .then(function () {
        // kill that phantomjs bridge
        crawler.phantom.then(function (p) {
            p.exit();
        });
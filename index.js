var colors      = require('colors');
var webpage     = require('webpage');
var baseUrl     = "http://samexhibitdev.com";
var toLoad      = ["/login", '/asdsaasd', "/sign_up", "/users/password/new", "/users/confirmation/new"];
var pagesLoaded = 0;

!function loadPages() {
  for(var i = 0; i < toLoad.length; ++i) {
    (function(i) {
      var page = webpage.create();
      page.open(baseUrl + toLoad[i], function() {
        pageDidError(page) && logPageError(i);
        pageLoaded();
      });
    }(i));
  }
}();

function logPageError(index) {
  console.log("   -- Error Loading "+toLoad[index].red+" --");
}

// async tracker for pages loaded
function pageLoaded() {
  ++pagesLoaded == toLoad.length && (function() {
    console.log("-- DONE --".green);
    phantom.exit();
  }())
}

// checks to see if the page 404 | 500 | 400
function pageDidError(page) {
  return evalPage(page, function() {
    return document.title.match(/400|500|404/) !== null;
  });
}

// helper function to clean up evaluating pages
function evalPage(page, evalFunc, cb) {
  if (typeof cb == "function")
    cb(page.evaluate(evalFunc));
  else
    return page.evaluate(evalFunc);
}
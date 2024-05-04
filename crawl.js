const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObject = new URL(baseURL);
  const currentURLObject = new URL(currentURL);
  if (baseURLObject.hostname !== currentURLObject.hostname) {
    return pages;
  }

  const normalisedURL = normaliseUrl(currentURL);
  if (pages[normalisedURL] > 0) {
    pages[normalisedURL] += 1;
    return pages;
  }

  pages[normalisedURL] = 1;
  console.log(`actively crawling: ${currentURL}`);

  try {
    const response = await fetch(currentURL);
    if (response.status >= 400) {
      console.log(`error in fetch with status code: ${response.status} on page: ${currentURL}`);
      return pages;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`non html response: ${contentType} on page: ${currentURL}`);
      return pages;
    }
    const htmlBody = await response.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
      console.log(nextURL);
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
  }
  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative url
      try {
        const urlObject = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObject.href);
      } catch (err) {
        console.log(`error with relative url: ${err.message}`);
      }
    } else {
      //absolute url
      try {
        const urlObject = new URL(linkElement.href);
        urls.push(urlObject.href);
      } catch (err) {
        console.log(`error with relative url: ${err.message}`);
      }
    }
  }
  return urls;
}

function normaliseUrl(urlString) {
  const urlObject = new URL(urlString);
  const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  crawlPage,
  normaliseUrl,
  getURLsFromHTML,
};

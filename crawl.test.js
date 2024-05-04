const { normaliseUrl, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normaliseUrl, strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actualOutput = normaliseUrl(input);
  const expectedOutput = "blog.boot.dev/path";
  expect(actualOutput).toEqual(expectedOutput);
});

test("normaliseUrl, remove trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actualOutput = normaliseUrl(input);
  const expectedOutput = "blog.boot.dev/path";
  expect(actualOutput).toEqual(expectedOutput);
});

test("normaliseUrl, handle capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actualOutput = normaliseUrl(input);
  const expectedOutput = "blog.boot.dev/path";
  expect(actualOutput).toEqual(expectedOutput);
});

test("getURLsFromHTML, absolute", () => {
  const inputHTMLbody = `
    <html>
      <body>
        <a href="https://blog.boot.dev/">Boot.dev Blog</a>
      </body>
    </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
  const exepcted = ["https://blog.boot.dev/"];
  expect(actual).toEqual(exepcted);
});

test("getURLsFromHTML, relative", () => {
  const inputHTMLbody = `
    <html>
      <body>
        <a href="/path/">Boot.dev Blog</a>
      </body>
    </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
  const exepcted = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(exepcted);
});

test("getURLsFromHTML, both absolute and relative", () => {
  const inputHTMLbody = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path1">Boot.dev Blog Path One</a>
        <a href="/path2/">Boot.dev Blog Two</a>
      </body>
    </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
  const exepcted = ["https://blog.boot.dev/path1", "https://blog.boot.dev/path2/"];
  expect(actual).toEqual(exepcted);
});

test("getURLsFromHTML, invalid", () => {
  const inputHTMLbody = `
    <html>
      <body>
        <a href="invalid">Boot.dev Blog</a>
      </body>
    </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
  const exepcted = [];
  expect(actual).toEqual(exepcted);
});

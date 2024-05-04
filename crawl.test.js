const { normaliseUrl } = require("./crawl.js");
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

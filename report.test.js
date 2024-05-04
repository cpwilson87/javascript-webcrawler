const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sort pages", () => {
  const input = {
    "https://wagslane.dev/path": 1,
    "https://wagslane.dev": 3,
  };
  const actualOutput = sortPages(input);
  const expectedOutput = [
    ["https://wagslane.dev", 3],
    ["https://wagslane.dev/path", 1],
  ];
  expect(actualOutput).toEqual(expectedOutput);
});

test("sort pages", () => {
  const input = {
    "https://wagslane.dev/path": 1,
    "https://wagslane.dev": 3,
    "https://wagslane.dev/cheese": 69,
    "https://wagslane.dev/monkey": 420,
  };
  const actualOutput = sortPages(input);
  const expectedOutput = [
    ["https://wagslane.dev/monkey", 420],
    ["https://wagslane.dev/cheese", 69],
    ["https://wagslane.dev", 3],
    ["https://wagslane.dev/path", 1],
  ];
  expect(actualOutput).toEqual(expectedOutput);
});

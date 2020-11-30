import {
  isValidArray,
  isValidObject,
  isObject,
  parseJson,
} from "../utils/common";

describe("Testing Util Common Methods", () => {
  it(`Testing parseJson`, () => {
    expect(parseJson("")).toStrictEqual({});
    expect(
      parseJson('{ "name":"John", "age":30, "city":"New York"}')
    ).toStrictEqual({ name: "John", age: 30, city: "New York" });
  });
  it(`Testing isObject`, () => {
    expect(isObject(null)).toBe(null);
    expect(isObject({ name: "John", age: 30, city: "New York" })).toBe(true);
  });
  it(`Testing isValidObject`, () => {
    expect(isValidObject({})).toBe(false);
    expect(isValidObject({ name: "John", age: 30, city: "New York" })).toBe(
      true
    );
  });
  it(`Testing isObject`, () => {
    expect(isValidArray([])).toBe(false);
    expect(isValidArray([1, 2])).toBe(true);
  });
});

import {
  toBeDefined,
  toBeEmpty,
  toBeNaN,
  toBeNotNull,
  toBeNull,
  toBeUndefined,
} from "../Expect";

describe("toBeUndefined()", () => {
  it("should return true", () => {
    const result = toBeUndefined(undefined);
    expect(result).toBe(true);
  });

  it("should return false", () => {
    const result = toBeUndefined("critical hit");
    expect(result).toBe(false);
  });
});

describe("toBeDefined()", () => {
  it("should return true", () => {
    const result = toBeDefined("critical hit");
    expect(result).toBe(true);
  });

  it("should return false", () => {
    const result = toBeDefined(undefined);
    expect(result).toBe(false);
  });
});

describe("toBeNull()", () => {
  it("should return true", () => {
    const result = toBeNull(null);
    expect(result).toBe(true);
  });

  it("should return false", () => {
    const result = toBeNull(12);
    expect(result).toBe(false);
  });
});

describe("toBeNotNull()", () => {
  it("should return true", () => {
    const result = toBeNotNull("world");
    expect(result).toBe(true);
  });

  it("should return false", () => {
    const result = toBeNotNull(null);
    expect(result).toBe(false);
  });
});

describe("toBeNaN()", () => {
  it("should return true", () => {
    const result = toBeNaN(NaN);
    expect(result).toBe(true);
  });

  it("should return false", () => {
    const result = toBeNaN(7749);
    expect(result).toBe(false);
  });
});

describe("toBeEmpty()", () => {
  it("should return true", () => {
    const result = toBeEmpty("");
    expect(result).toBe(true);
  });

  it("should return false", () => {
    const result = toBeEmpty("hello");
    expect(result).toBe(false);
  });
});

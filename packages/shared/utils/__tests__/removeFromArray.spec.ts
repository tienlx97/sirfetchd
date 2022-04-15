import { removeFromArray } from "../RemoveFromArray";

describe("removeFromArray()", () => {
  it("should return array value if found", () => {
    const result = removeFromArray([1, 2, 3, 4], 2);
    expect(result).toEqual([2]);
  });

  it("should return only array of 1 value if found many values", () => {
    const result = removeFromArray(["fire", "fly", "water", "fly"], "fly");
    expect(result).toEqual(["fly"]);
  });

  it("should return undefined if not found value", () => {
    const result = removeFromArray([1, 2, 3, 4], 5);
    expect(result).toEqual(undefined);
  });
});

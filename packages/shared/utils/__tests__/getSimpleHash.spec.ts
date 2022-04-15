import { getSimpleHash } from "../GetSimpleHash";

describe("getSimpleHash()", () => {
  it("should return right value", () => {
    const result = getSimpleHash("farfetch", "evolve", "sirfetch");
    const rightValue = "5xche4";
    expect(result).toEqual(rightValue);
  });

  it("should return wrong value", () => {
    const result = getSimpleHash("farfetch", "evolve", "sirfetch");
    const wrongValue = "tienlx";
    expect(result).not.toEqual(wrongValue);
  });
});

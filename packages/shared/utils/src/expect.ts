const toBeDefined = (received: unknown) => received != undefined;

const toBeUndefined = (received: unknown) => received == undefined;

const toBeNull = (received: unknown) => received == null;

const toBeNotNull = (received: unknown) => received != null;

const toBeEmpty = (received: string | number) =>
  received === "" || received === 0;

const toBeNaN = (received: any) => Number.isNaN(received);

const toBeTruthy = (received: unknown) => !!received;

const toBeDefinedAndNotNull = (received: unknown) => received != null;

const toBeUndefinedOrNull = (received: unknown) =>
  received === null || received === undefined;

const toBeFalsy = (received: unknown) => !received;

const toBeInstanceOf = (received: any, expected: Function) =>
  received instanceof expected;

const toBeLessThan = (received: number | bigint, expected: number | bigint) =>
  received < expected;

const toBeLessThanOrEqual = (
  received: number | bigint,
  expected: number | bigint
) => received <= expected;

const expect = {
  toBeDefined,
  toBeUndefined,
  toBeNull,
  toBeNaN,
  toBeTruthy,
  toBeFalsy,
  toBeInstanceOf,
  toBeLessThan,
  toBeLessThanOrEqual,
  toBeNotNull,
  toBeEmpty,
  toBeDefinedAndNotNull,
  toBeUndefinedOrNull,
};

export default expect;
export {
  toBeDefined,
  toBeUndefined,
  toBeNull,
  toBeNaN,
  toBeTruthy,
  toBeFalsy,
  toBeInstanceOf,
  toBeLessThan,
  toBeLessThanOrEqual,
  toBeNotNull,
  toBeEmpty,
  toBeDefinedAndNotNull,
  toBeUndefinedOrNull,
};

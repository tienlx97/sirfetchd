import { toBeEmpty, toBeNotNull } from "@farfetch/utils/Expect";

let globalMetaData: string[][] = [];

class ErrorMetadata {
  private metadata: string[][];
  constructor() {
    this.metadata = ([] as string[][]).concat(globalMetaData);
  }

  addEntries(...args: string[][]) {
    this.metadata.push(...args);
    return this;
  }

  addEntry(entry: string, key: string, value: string) {
    this.metadata.push([entry, key, value]);
    return this;
  }

  isEmpty() {
    return toBeEmpty(this.metadata.length);
  }

  clearEntries() {
    this.metadata = [];
  }

  format() {
    let fm: string[] = [];
    this.metadata.forEach((arr) => {
      if (arr && arr.length) {
        const filter = arr
          .map((value) => {
            return toBeNotNull(value) ? String(value).replace(/:/g, "_") : "";
          })
          .join(":");
        fm.push(filter);
      }
    });
    return fm;
  }

  getAll() {
    return this.metadata;
  }

  addGlobalMetadata(name: string, key: string, value: string) {
    globalMetaData.push([name, key, value]);
  }

  getGlobalMetadata() {
    return globalMetaData;
  }

  unsetGlobalMetadata(name: string, key: string) {
    globalMetaData = globalMetaData.filter(
      (arr) => !(Array.isArray(arr) && arr[0] === name) && arr[1] === key
    );
  }
}

export { ErrorMetadata };

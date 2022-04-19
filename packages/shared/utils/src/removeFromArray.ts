function removeFromArray<T>(arr: T[], value: T) {
  const index = arr.indexOf(value);
  if (index !== -1) return arr.splice(index, 1);
}

export default removeFromArray;
export { removeFromArray };

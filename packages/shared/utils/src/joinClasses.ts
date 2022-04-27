function joinClasses(classNames, ...args) {
  let appendClasses = classNames || "";
  const argsLength = args.length <= 1 ? 0 : args.length - 1;
  for (let i = 0; i < argsLength; i++) {
    const classes = i + 1 < 1 || args.length <= i + 1 ? undefined : args[i + 1];
    if (classes != null && classes !== "") {
      appendClasses = (appendClasses ? appendClasses + " " : "") + classes;
    }
  }
  return appendClasses;
}

export default joinClasses;
export { joinClasses };

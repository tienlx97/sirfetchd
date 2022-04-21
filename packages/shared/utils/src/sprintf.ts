function sprintf(msg: string, ...args: any) {
  let index = 0;
  return msg.replace(/%s/g, () => String(args[index++]));
}
export default sprintf;
export { sprintf };

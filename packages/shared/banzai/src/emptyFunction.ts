const emptyFunction = {
  thatReturns: a,
  thatReturnsFalse: a,
  thatReturnsTrue: a,
  thatReturnsNull: a,
  thatReturnsThis: function () {
    return this;
  },
  thatReturnsArgument: function (a) {
    return a;
  },
};

function a(a) {
  return function () {
    return a;
  };
}

export default emptyFunction;

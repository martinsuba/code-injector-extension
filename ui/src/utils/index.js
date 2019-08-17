export function sortCodes(codes) {
  return codes
    .sort((a, b) => {
      const timeA = a.createdAt;
      const timeB = b.createdAt;
      return timeB - timeA;
    });
}

export function setFirstActive(codes) {
  return codes
    .map((code, index) => {
      if (index === 0) {
        code.active = true;
      } else {
        code.active = false;
      }
      return code;
    });
}

export function debounce(func, delay) {
  let inDebounce;
  return function abc() {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}

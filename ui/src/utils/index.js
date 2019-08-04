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

export function loadState() {
  try {
    const serializedState = localStorage.getItem('se_state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('se_state', serializedState);
  } catch (err) {
    console.error(err);
  }
}

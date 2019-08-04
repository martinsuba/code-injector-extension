export function sortNotes(notes) {
  return notes
    .sort((a, b) => {
      const timeA = a.createdAt;
      const timeB = b.createdAt;
      return timeB - timeA;
    })
    .map((note, index) => {
      if (index === 0) {
        note.active = true;
      } else {
        note.active = false;
      }
      return note;
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

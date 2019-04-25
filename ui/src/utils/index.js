export function sortNotes(notes) {
  return notes
    .sort((a, b) => {
      const timeA = a.updatedAt || a.createdAt;
      const timeB = b.updatedAt || b.createdAt;
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

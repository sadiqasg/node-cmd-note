console.log('starting notes..');
const fs = require('fs');

const fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('note-data.js');
    return JSON.parse(notesString);
  }

  catch (e) {}
};

const saveNotes = (notes) => {
  fs.writeFileSync('note-data.js', JSON.stringify(notes));  
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  }
  let duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}

const getAll = () => {
  return fetchNotes();
}

const getNote = (title) => {
  let notes = fetchNotes();
  let note = notes.filter((note) => note.title === title);
  return note[0];
}

const removeNote = (title) => {
  let notes = fetchNotes();
  let newNotes = notes.filter((note) => note.title !== title);
  saveNotes(newNotes);

  return notes.length !== newNotes.length;
}

const logNote = (note) => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {addNote, getAll, getNote, removeNote, logNote};
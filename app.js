const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b' 
}

let argv = yargs
.command('add', 'add a new note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'list all notes')
.command('read', 'read a note', {
  title: titleOptions,
})
.command('remove', 'remove a note', {
  title: titleOptions,
})
 .help()
 .argv;
let command = process.argv[2];

if (command === 'add') {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken')
  }
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)..`)
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  let note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found!');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  let removedNote = notes.removeNote(argv.title);
  removedNote ? console.log('Note deleted') : console.log('Note not found');
} else {
  console.log('command not recognized')
}

const { json } = require('express');
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// get /api/notes route to read db.json and return all saved notes as json

router.get('/notes', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  console.log('My Notes...' + JSON.stringify(notes));
  res.json(notes);
});

/* post /api/notes to receive a new note to save on the request body
add to db.json and return new note to the client - Need npm package to give each note a unique id */

router.post('/notes', (req, res) => {
  const myNote = req.body;
  console.log('adding note...' + JSON.stringify(myNote));
  myNote.id = uuidv4();
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  notes.push(myNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
});

module.exports = router;

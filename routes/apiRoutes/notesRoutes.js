const router = require("express").Router();
const { findById, createNewNote, validateNote } = require("../../lib/notes");
const { notesArray } = require("../../db/db");

router.get("/notes", (req, res) => {
  let results = notesArray;
  res.json(results);
});

router.post("/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notesArray.length.toString();
  console.log("router.post:", req.body);
  console.log(typeof(req));

  if (!validateNote(req.body)) {
    res.status(400).send("Note is not properly formatted.");
  } else {
    const note = createNewNote(req.body, notesArray);
    res.json(note);
  }
});

module.exports = router;

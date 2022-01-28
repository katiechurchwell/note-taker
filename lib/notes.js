const e = require("express");
const fs = require("fs");
const path = require("path");

function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notesArray }, null, 2)
  );
  return note;
}

function validateNote(note) {
  console.log("validateNote", typeof(note));
  if (!note.title || typeof note.title !== "string") {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  findById,
  createNewNote,
  validateNote,
};

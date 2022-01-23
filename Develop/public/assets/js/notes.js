const $noteForm = document.querySelector("#form");
const $displayArea = document.querySelector("#display-area");

noteTitle = document.querySelector(".note-title");
noteText = document.querySelector(".note-textarea");
saveNoteBtn = document.querySelector(".save-note");
newNoteBtn = document.querySelector(".new-note");
noteList = document.querySelectorAll(".list-container .list-group");

//generate note list
const printResults = (resultArr) => {
  const noteHTML = resultArr.map(({ title, text }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3">
      <h4 class="text-primary">${title}</h4>
      <p>${text}</p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = noteHTML.join("");
};

//retrieve note database
const fetchNotes = (formData = {}) => {
  let queryUrl = "/api/notes";

  fetch(queryUrl)
    .then((response) => {
      if (!response.ok) {
        return alert("Error: " + response.statusText);
      }
      return response.json();
    })
    .then((noteData) => {
      printResults(noteData);
    });
};

//show/hide save button
const show = (elem) => {
  elem.style.display = "inline";
};

const hide = (elem) => {
  elem.style.display = "none";
};

//not running
const handleRenderSaveBtn = () => {
  if (noteTitle.value != "") {
    show(saveNoteBtn);
  } else {
    hide(saveNoteBtn);
  }
};

//saving notes
const handleGetNotesSubmit = (event) => {
  event.preventDefault();
  const noteObject = { id, title };
  fetchNotes(noteObject);
};

//NOTE VIEW STUFF??
const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute("readonly", true);
    noteText.setAttribute("readonly", true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute("readonly");
    noteText.removeAttribute("readonly");
    noteTitle.value = "";
    noteText.value = "";
  }
};

//sets the activeNote and displays it?
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

//event listeners
saveNoteBtn.addEventListener("submit", handleGetNotesSubmit);
// saveNoteBtn.addEventListener("click", handleNoteSave); //write function
newNoteBtn.addEventListener("click", handleNewNoteView);
noteTitle.addEventListener("input", handleRenderSaveBtn); //not working
noteText.addEventListener("input", handleRenderSaveBtn); //working

//deleting notes
// const handleNoteDelete = (e) => {
//   // Prevents the click listener for the list from being called when the button inside of it is clicked
//   e.stopPropagation();

//   const note = e.target;
//   const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

//   if (activeNote.id === noteId) {
//     activeNote = {};
//   }

//   deleteNote(noteId).then(() => {
//     // getAndRenderNotes();
//     renderActiveNote();
//   });
// };

//generate note list
fetchNotes();

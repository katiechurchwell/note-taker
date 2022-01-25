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
    <li class="d-flex align-items-center list-group-item"><h4>${title}</h4>
    <div class="ml-auto p-2"><i class="fas fa-trash delete-note"></i></li>
    </div>
      </hr>
      `;
  });

  $displayArea.innerHTML = noteHTML.join("");
};

//retrieve note database and print
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

const handleRenderSaveBtn = () => {
  if (noteTitle.value != "") {
    show(saveNoteBtn);
  } else {
    hide(saveNoteBtn);
  }
};

//saving notes (error)
const handleNoteSubmit = (event) => {
  event.preventDefault();

  const title = noteTitle.value;
  const text = noteText.value;
  const noteObject = { title, text }; //object

  var noteString = JSON.stringify(noteObject); //still an object, causing error
  console.log("noteString in fetch:", typeof noteString);

  fetch("/api/notes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: noteString,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      alert("Error: " + response.statusText);
    })
    .then((postResponse) => {
      alert("Thanks for posting a note!");
    });

  fetchNotes();
};

// Viewing database notes
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
saveNoteBtn.addEventListener("click", handleNoteSubmit); //working on saveNote part; bad request and both fail/success alerts.
newNoteBtn.addEventListener("click", handleNewNoteView);
noteTitle.addEventListener("input", handleRenderSaveBtn); //not working
noteText.addEventListener("input", handleRenderSaveBtn); //working

//generate note list
fetchNotes();

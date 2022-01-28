const $noteForm = document.querySelector("#form");
const $displayArea = document.querySelector("#display-area");

noteTitle = document.querySelector(".note-title");
noteText = document.querySelector(".note-textarea");
saveNoteBtn = document.querySelector(".save-note");
newNoteBtn = document.querySelector(".new-note");
noteList = document.querySelectorAll(".list-container .list-group");

// Generate note list
const printResults = (resultArr) => {
  const noteHTML = resultArr.map(({ title, text }) => {
    return `
    <li class="list-group-item"><h4>${title}</h4></li>
      <li class="list-group-item">${text}</p></li>
      </hr>
      `;
  });

  $displayArea.innerHTML = noteHTML.join("");
};

// Retrieve note database and print
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

// Show/hide save button
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

// Saving notes
const handleNoteSubmit = (event) => {
  event.preventDefault();

  const title = noteTitle.value;
  const text = noteText.value;
  const noteObject = { title, text };

  var noteString = JSON.stringify(noteObject);
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

// Sets the activeNote and displays it
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

// Event listeners
saveNoteBtn.addEventListener("click", handleNoteSubmit);
newNoteBtn.addEventListener("click", handleNewNoteView);
noteTitle.addEventListener("input", handleRenderSaveBtn);
noteText.addEventListener("input", handleRenderSaveBtn);

// Generate note list
fetchNotes();

document.querySelector("body").addEventListener("click", (event) => {
  if (event.target.classList.includes("save-note")) {
    console.log("note saved");
  }
});

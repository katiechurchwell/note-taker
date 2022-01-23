// // activeNote is used to keep track of the note in the textarea
// let activeNote = {};

// const getNotes = () =>
//   fetch("/api/notes", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((response) => {
//     if (!response.ok) {
//       return alert("Error: " + response.statusText);
//     }
//     return response.json();
//   });

// const saveNote = (note) =>
//   fetch("/api/notes", {
//     //not working
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(note),
//   });

// // const deleteNote = (id) =>
// //   fetch(`/api/notes/${id}`, {
// //     method: 'DELETE',
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //   });

// const renderActiveNote = () => {
//   hide(saveNoteBtn);

//   if (activeNote.id) {
//     noteTitle.setAttribute("readonly", true);
//     noteText.setAttribute("readonly", true);
//     noteTitle.value = activeNote.title;
//     noteText.value = activeNote.text;
//   } else {
//     noteTitle.removeAttribute("readonly");
//     noteText.removeAttribute("readonly");
//     noteTitle.value = "";
//     noteText.value = "";
//   }
// };



// // Sets the activeNote and displays it
// const handleNoteView = (e) => {
//   e.preventDefault();
//   activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
//   renderActiveNote();
// };

// // Sets the activeNote to and empty object and allows the user to enter a new note
// const handleNewNoteView = (e) => {
//   activeNote = {};
//   renderActiveNote();
// };



// if (window.location.pathname === "/notes.html") {
//   saveNoteBtn.addEventListener("click", handleNoteSave);
//   newNoteBtn.addEventListener("click", handleNewNoteView);
//   noteTitle.addEventListener("input", console.log("title!")); //not working
//   noteText.addEventListener("input", handleRenderSaveBtn); //working
// }

// // getAndRenderNotes();

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
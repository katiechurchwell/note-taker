const $noteForm = document.querySelector("#form");
const $displayArea = document.querySelector("#display-area");

const printResults = (resultArr) => {
  console.log(resultArr);

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

const getNotes = (formData = {}) => {
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

const handleGetNotesSubmit = (event) => {
  event.preventDefault();
  const noteObject = { id, title };
  getNotes(noteObject);
};

$noteForm.addEventListener("submit", handleGetNotesSubmit);

getNotes();

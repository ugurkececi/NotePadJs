
function addNoteFromForm(e) {
    
    e.preventDefault();
  
   
    const noteText = document.getElementById("new-note-input").value.trim();
  

   

    if (!noteText) {
        return;
      }
  

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.push(noteText);

    localStorage.setItem("notes", JSON.stringify(notes));
  

    const notesList = document.getElementById("notes-list");
    const newNote = document.createElement("li");
    newNote.innerText = noteText;
    notesList.appendChild(newNote);
  

    document.getElementById("new-note-input").value = "";
  }
  

  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const notesList = document.getElementById("notes-list");
  

    notesList.innerHTML = "";
  
    notes.forEach((noteText) => {
      const newNote = document.createElement("li");
      newNote.innerText = noteText;
      notesList.appendChild(newNote);
    });
  }

function deleteNote() {

    const noteIndex = this.getAttribute("data-index");

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
  
    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
  
   
    loadNotes();
  }
  
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";
  
    notes.forEach((noteText, index) => {
      const newNote = document.createElement("li");
      const span = document.createElement("span");
      const deleteBtn = document.createElement("button");
  
      span.innerText = noteText;
      deleteBtn.innerText = "Sil";
      deleteBtn.setAttribute("data-index", index);
  
      deleteBtn.addEventListener("click", () => {
        const noteIndex = deleteBtn.getAttribute("data-index");
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(noteIndex, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
      });
  
      newNote.appendChild(span);
      newNote.appendChild(deleteBtn);
      notesList.appendChild(newNote);
    });
  }
  
  

  window.addEventListener("load", loadNotes);

  const noteForm = document.getElementById("note-form");
  noteForm.addEventListener("submit", e => {
    e.preventDefault();
    const noteInput = document.getElementById("new-note-input");
    const noteText = noteInput.value.trim();
  
    if (noteText !== "") {

      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(noteText);
      localStorage.setItem("notes", JSON.stringify(notes));
  
 
      loadNotes();
  
      noteInput.value = "";
    }
  });
  
  

  window.addEventListener("load", loadNotes);
  

  document.getElementById("note-form").addEventListener("submit", addNoteFromForm);
  

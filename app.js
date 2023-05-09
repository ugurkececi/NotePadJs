// Forma göre not ekleme fonksiyonu
function addNoteFromForm(e) {
    // Formun normal davranışını engelle
    e.preventDefault();
  
    // Input alanındaki değeri al
    const noteText = document.getElementById("new-note-input").value.trim();
  
    // Eğer input alanı boş ise, uyarı mesajı göster ve fonksiyondan çık
   

    if (!noteText) {
        return;
      }
  
    // Local Storage'da kaydedilmiş notları al
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
  
    // Yeni notu notlar listesine ekle
    notes.push(noteText);
  
    // Güncellenmiş notlar listesini Local Storage'a kaydet
    localStorage.setItem("notes", JSON.stringify(notes));
  
    // Yeni notu sayfaya ekle
    const notesList = document.getElementById("notes-list");
    const newNote = document.createElement("li");
    newNote.innerText = noteText;
    notesList.appendChild(newNote);
  
    // Input alanını temizle
    document.getElementById("new-note-input").value = "";
  }
  
  // Kaydedilmiş notları yükleme fonksiyonu
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const notesList = document.getElementById("notes-list");
  
    // Notları yüklemeden önce not listesini temizle
    notesList.innerHTML = "";
  
    notes.forEach((noteText) => {
      const newNote = document.createElement("li");
      newNote.innerText = noteText;
      notesList.appendChild(newNote);
    });
  }
  // Not silme fonksiyonu
function deleteNote() {
    // Tıklanan notun index değerini al
    const noteIndex = this.getAttribute("data-index");
  
    // Local Storage'dan notları al
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
  
    // Notu listeden ve Local Storage'dan sil
    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
  
    // Yeniden yükleme işlemi
    loadNotes();
  }
  
  // Notları yükleme fonksiyonu
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
  
  
  // Sayfa yüklendiğinde notları yükle
  window.addEventListener("load", loadNotes);
  
  // Form submit olduğunda yeni not ekle
  const noteForm = document.getElementById("note-form");
  noteForm.addEventListener("submit", e => {
    e.preventDefault();
    const noteInput = document.getElementById("new-note-input");
    const noteText = noteInput.value.trim();
  
    if (noteText !== "") {
      // Notları Local Storage'a kaydet
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(noteText);
      localStorage.setItem("notes", JSON.stringify(notes));
  
      // Notları yeniden yükle
      loadNotes();
  
      // Input alanını temizle
      noteInput.value = "";
    }
  });
  
  
  
  // Sayfa yüklendiğinde kaydedilmiş notları yükle
  window.addEventListener("load", loadNotes);
  
  // Form submit olduğunda addNoteFromForm fonksiyonunu çağır
  document.getElementById("note-form").addEventListener("submit", addNoteFromForm);
  
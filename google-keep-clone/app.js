class App {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    this.title = ``;
    this.text = ``;
    this.id = ``;

    this.$placeholder = document.querySelector('#placeholder');
    this.$form = document.querySelector('#form');
    this.$formButtons = document.querySelector('#form-buttons');
    this.$formCloseButton = document.querySelector('#form-close-button');
    this.$noteTitle = document.querySelector('#note-title');
    this.$noteText = document.querySelector('#note-text');
    this.$notes = document.querySelector('#notes');
    this.$modal = document.querySelector('.modal');
    this.$modalTitle = document.querySelector('.modal-title');
    this.$modalText = document.querySelector('.modal-text');
    this.$modalCloseButton = document.querySelector('.modal-close-button');
    this.$colorToolTip = document.querySelector('#color-tooltip');

    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('click', (e) => {
      this.handleFormClick(e);
      this.selectNote(e);
      this.openModal(e);
      this.deleteNote(e);
    });

    document.body.addEventListener('click', (e) => {
      this.openToolTip(e);
    });

    document.body.addEventListener('mouseout', (e) => {
      this.closeToolTip(e);
    });

    this.$colorToolTip.addEventListener('mouseover', function () {
      this.style.display = 'flex';
    });

    this.$colorToolTip.addEventListener('mouseout', function () {
      this.style.display = 'none';
    });

    this.$colorToolTip.addEventListener('click', (e) => {
      const color = e.target.dataset.color;
      if (color) {
        this.editNoteColor(color);
      }
    });

    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
      let title = this.$noteTitle.value;
      let text = this.$noteText.value;
      const hasNote = title || text;

      if (hasNote) {
        this.addNote({ title, text });
      }
    });

    this.$formCloseButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeForm();
    });

    this.$modalCloseButton.addEventListener('click', (e) => {
      this.closeModel(e);
    });
  }

  handleFormClick(e) {
    const isFormClicked = this.$form.contains(e.target);
    let title = this.$noteTitle.value;
    let text = this.$noteText.value;
    const hasNote = title || text;

    if (isFormClicked) {
      //open the forms
      this.openForm();
    } else if (hasNote) {
      this.addNote({ title, text });
    } else {
      this.closeForm();
    }
  }

  openForm() {
    this.$form.classList.add('form-open');
    this.$noteTitle.style.display = 'block';
    this.$formButtons.style.display = 'block';
  }

  closeForm() {
    this.$form.classList.remove('form-open');
    this.$noteTitle.style.display = 'none';
    this.$formButtons.style.display = 'none';
    this.$noteText.value = '';
    this.$noteTitle.value = '';
  }

  openModal(e) {
    if (e.target.matches('.toolbar-delete')) return;
    if (e.target.matches('.toolbar-color')) return;

    if (e.target.closest('.note')) {
      this.$modal.classList.toggle('open-modal');
    }
  }

  closeModel(e) {
    this.editNote(e);
    this.$modal.classList.toggle('open-modal');
  }

  openToolTip(e) {
    if (!e.target.matches('.toolbar-color')) return;
    this.id = e.target.dataset.id;
    const noteCoords = e.target.getBoundingClientRect();
    const horizontal = noteCoords.left;
    const vertical = window.scrollY - 25;
    this.$colorToolTip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
    this.$colorToolTip.style.display = 'flex';
  }

  closeToolTip(e) {
    if (!e.target.matches('.toolbar-color')) return;
    this.$colorToolTip.style.display = 'none';
  }

  addNote({ title, text }) {
    const newNote = {
      title,
      text,
      color: 'white',
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
    };
    this.notes = [...this.notes, newNote];
    this.render();
    this.closeForm();
  }

  editNote() {
    const title = this.$modalTitle.value;
    const text = this.$modalText.value;

    this.notes = this.notes.map((note) => {
      return note.id === Number(this.id)
        ? { ...note, title, text }
        : { ...note };
    });
    this.render();
  }

  editNoteColor(color) {
    console.log(color);
    this.notes = this.notes.map((note) => {
      return note.id === Number(this.id) ? { ...note, color } : { ...note };
    });
    console.log(this.notes);
    this.render();
  }

  selectNote(e) {
    const $selectedNote = e.target.closest('.note');
    if (!$selectedNote) return;
    const [$noteTitle, $noteText] = $selectedNote.children;
    this.title = $noteTitle.innerText;
    this.text = $noteText.innerText;
    this.id = $selectedNote.dataset.id;

    this.$modalTitle.value = this.title;
    this.$modalText.value = this.text;
  }

  deleteNote(e) {
    e.stopPropagation();
    if (!e.target.matches('.toolbar-delete')) return;
    const id = e.target.dataset.id;

    this.notes = this.notes.filter((note) => {
      return note.id !== Number(id);
    });
    this.render();
  }

  render() {
    this.saveNotes();
    this.displayNotes();
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  displayNotes() {
    const hasNotes = this.notes.length > 0;
    this.$placeholder.style.display = hasNotes ? 'none' : 'flex';
    this.$notes.innerHTML = this.notes
      .map((note) => {
        return `
        <div style="background: ${note.color};" class="note" data-id="${
          note.id
        }">
          <div class="${note.title && 'note-title'}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
              <i data-id=${note.id} class='bx bx-palette toolbar-color'></i>
              <i data-id=${note.id} class='bx bx-trash toolbar-delete'></i>
            </div>
          </div>
        </div>
      `;
      })
      .join('');
  }
}

new App();

const elf = document.getElementById('elf');
const addBtn = document.getElementById('add-btn');
const removeBtn = document.getElementById('remove-btn');
const elfCountEl = document.getElementById('elf-count');

addBtn.addEventListener('click', duplicateElf);
removeBtn.addEventListener('click', removeElf);

let elfCount = 1;

elfCountEl.textContent = elfCount;

function duplicateElf() {
  elfCount += 1;
  elfCountEl.textContent = elfCount;
  elf.textContent += '🧝';

  if (elfCount >= 100) {
    elfCountEl.style.color = 'red';
    addBtn.disabled = true;
  } else {
    removeBtn.disabled = false;
    elfCountEl.style.color = '#f0f4f7';
    addBtn.disabled = false;
  }
}

function removeElf() {
  elfCount -= 1;
  elf.textContent = elf.textContent.slice(0, -2);
  elfCountEl.textContent = elfCount;

  if (elfCount <= 0) {
    elfCountEl.style.color = 'red';
    removeBtn.disabled = true;
  } else {
    addBtn.disabled = false;
    elfCountEl.style.color = '#f0f4f7';
    removeBtn.disabled = false;
  }
}

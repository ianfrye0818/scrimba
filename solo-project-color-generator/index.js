
//event listners
document.getElementById('color-form').addEventListener('submit', (e) => {
  e.preventDefault();
  fetchColorPallet();
});
document.addEventListener('click', (e) => {
  if (e.target.dataset.color) {
    copyColor(e.target.dataset.color);
    createMousePopup(e);
  }
});

//fetch colors and render on page functions
function fetchColorPallet() {
  const colorPicker = document.getElementById('color-picker');
  const palletType = document.getElementById('pallet-type');
  const url = `https://www.thecolorapi.com/scheme?hex=${colorPicker.value.slice(
    1
  )}&mode=${palletType.value}&count=6`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response.status || ''}: ${
            response.message || ''
          }`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      render(data);
    })
    .catch((error) => console.log(error));
}
function render(data) {
  document.querySelector('.color-grid').innerHTML = data.colors
    .map((color) => {
      return `
    <div class="color" style="background-color: ${color.hex.value}" data-color="${color.hex.value}"></div>
    <div class="hex" data-color="${color.hex.value}">${color.hex.value}</div>
    `;
    })
    .join('');
}

//copy to clipboard functions
function copyColor(targetID) {
  const textArea = document.createElement('textarea');
  textArea.value = targetID;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function createMousePopup(e) {
  const popup = document.createElement('div');
  popup.textContent = 'Copied';
  popup.style.position = 'fixed';
  popup.style.backgroundColor = '#333';
  popup.style.color = '#fff';
  popup.style.padding = '8px';
  popup.style.borderRadius = '4px';
  popup.style.opacity = '0';
  popup.style.transition = 'opacity 0.5s';
  document.body.appendChild(popup);

  const mouseX = e.clientX;
  const mouseY = e.clientY;
  popup.style.left = `${mouseX}px`;
  popup.style.top = `${mouseY}px`;

  popup.style.opacity = '1';

  setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 500);
  }, 500);
}

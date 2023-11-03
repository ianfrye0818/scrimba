import { catsData } from './data.js';

const emotionRadios = document.getElementById('emotion-radios');
emotionRadios.addEventListener('change', highlightCheckedOption);
const getImageBtn = document.querySelector('#get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const closeBtn = document.getElementById('meme-modal-close-btn');

getImageBtn.addEventListener('click', renderCat);
closeBtn.addEventListener('click', () => {
  memeModal.style.setProperty('display', 'none');
  memeModalInner.innerHTML = '';
});

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName('radio');
  for (let radio of radios) {
    radio.classList.remove('highlight');
  }
  e.target.classList.add('highlight');
  document.getElementById(e.target.id).parentElement.classList.add('highlight');
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter((cat) => {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  } else {
    alert('An emotion must be selected');
  }
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    return catsArray[Math.floor(Math.random() * catsArray.length)];
  }
}

function renderCat() {
  const catObject = getSingleCatObject();
  console.log(catObject);

  memeModalInner.innerHTML = `
  <img class="cat-img" src="./images/${catObject.image}" alt="${catObject.alt}">
  `;

  memeModal.style.display = 'flex';
}

function getEmotionsArray(catsData) {
  const emotionsArray = [];
  for (let cat of catsData) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `
    <div class="radio">
      <label for="${emotion}">
      ${emotion}
      </label>
      <input 
      type="radio" 
      id="${emotion}" 
      name="emotion-group" 
      value="${emotion}" />  
    </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);

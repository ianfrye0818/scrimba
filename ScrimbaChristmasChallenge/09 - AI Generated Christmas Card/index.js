import { OpenAI } from 'openai';
const form = document.querySelector('form');
const modalCloseButton = document.getElementById('modal-close');
const spinner = document.getElementById('spinner');

const apikey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apikey, dangerouslyAllowBrowser: true });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getPhoto();
});

const dialogModal = document.getElementById('dialog-modal');
const imageContainer = document.getElementById('image-container');

/** show dialog on load **/
dialogModal.show();
async function getPhoto() {
  const userInput = document.getElementById('user-input');
  dialogModal.classList.add('hidden');
  imageContainer.innerHTML = `<img src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif">`;
  const image = await openai.images.generate({
    model: 'dall-e-3',
    prompt: userInput.value,
  });
  imageContainer.innerHTML = `<img src="${image.data[0].url}" alt="${userInput.value}"/>`;
  userInput.value = '';
}

imageContainer.addEventListener('click', () => {
  dialogModal.classList.remove('hidden');
});
modalCloseButton.addEventListener('click', () => {
  dialogModal.classList.add('hidden');
});

//  * 🎄 Challenge:
//  * 1. When a user hits submit, dialogModal
//  *    should be hidden.
//  * 2. Use the inputted text to generate an image
//  *    for the e-card using an AI model.
//  *    ⚠️ Make sure the image is square.
//  * 3. Render the image to imageContainer.
//  *
//  * 🎁 hint.md for help!

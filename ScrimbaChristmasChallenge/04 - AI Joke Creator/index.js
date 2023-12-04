// import { OpenAIAPI } from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// const apikey = process.env.OPEN_AI_API_KEY;
// const openai = new OpenAIAPI({ apiKey: apikey });

// document.getElementById('window-container').addEventListener('click', getJoke);

// async function getJoke() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: 'system', content: 'Tell me a Christmas Joke' }],
//     model: 'gpt-3.5-turbo',
//   });
//   document.querySelector('#joke-display').textContent =
//     completion.choices[0].message.content;

//   document.querySelector('.left-door').style =
//     'animation: left-open 0.3s forwards';
//   document.querySelector('.right-door').style =
//     'animation: right-open 0.3s forwards';
//   document.querySelector('.joke-display').style =
//     'animation: display-joke 0.3s forwards';
// }

const countdownDisplay = document.getElementById('countdown-display');

function renderCountdown() {
  const dateString = document.getElementById('datepicker').value.split('/');
  const futureDate = new Date(
    `${dateString[2]}-${dateString[0]}-${dateString[1]}T00:00:00`
  );

  const currentDate = new Date();
  const timeStamp = futureDate - currentDate;

  const milliseconds = Math.floor(timeStamp / 1000);

  const seconds = Math.floor(milliseconds % 60);
  const minutes = Math.floor((milliseconds / 60) % 60);
  const hours = Math.floor((milliseconds / 3600) % 24);
  const days = Math.floor((milliseconds / (24 * 3600)) % 30.44);
  const months = Math.floor(milliseconds / (24 * 3600) / 30.44);

  const addLeadingZero = (number) =>
    number < 10 && number >= 0 ? `0${number}` : `${number}`;

  countdownDisplay.innerHTML = `
    ${months > 0 ? `<p>${months} months</p>` : ''}
    <p>${days} Days</p>
    <p>
      <span class="date">${addLeadingZero(hours)}</span>:
      <span class="date">${addLeadingZero(minutes)}</span>:
      <span class="date">${addLeadingZero(seconds)}</span>
    </p>
  `;
}

function animateCountdown() {
  renderCountdown();
  requestAnimationFrame(animateCountdown);
}

animateCountdown();

// Stretch goals:
// - Display hours, minutes, seconds.
// - Add a countdown for another festival, your birthday, or Christmas 2022.

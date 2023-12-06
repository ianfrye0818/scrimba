const subscribeBtn = document.getElementById('subscribe-btn');
const dismissBtn = document.getElementById('dismiss-btn');
const submitForm = document.getElementById('submit-form');
const emailInput = document.getElementById('email');

subscribeBtn.addEventListener('click', () => {
  const email = emailInput.value;
  if (isValidEmail(email)) {
    setTimeout(() => {
      document.getElementById('signup-container').classList.add('hidden');
      document.getElementById('thank-you-container').classList.remove('hidden');
      document.getElementById('emailEl').textContent = email;
    }, 1500);
  } else {
    alert('Invalid Email Address');
  }
});

dismissBtn.addEventListener('click', () => {
  emailInput.value = '';
  setTimeout(() => {
    document.getElementById('thank-you-container').classList.add('hidden');
    document.getElementById('signup-container').classList.remove('hidden');
  }, 100);
});

emailInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const email = emailInput.value;
    if (isValidEmail(email)) {
      setTimeout(() => {
        document.getElementById('signup-container').classList.add('hidden');
        document
          .getElementById('thank-you-container')
          .classList.remove('hidden');
        document.getElementById('emailEl').textContent = email;
      }, 1500);
    } else {
      alert('Invalid Email Address');
    }
  }
});

function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

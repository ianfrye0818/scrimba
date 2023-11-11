const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const dayErr = document.getElementById('error-day');
const monthErr = document.getElementById('error-month');
const yearErr = document.getElementById('error-year');
const submitBtn = document.getElementById('submit-btn');
const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');

function checkMonth() {
  const monthValue = month.value;
  if (!monthValue) {
    month.classList.add('error');
    monthErr.innerHTML = `This field is required`;
    return null;
  }

  if (isNaN(monthValue) || monthValue > 12 || monthValue < 1) {
    month.classList.add('error');
    monthErr.innerHTML = `Must be a vaild month`;
    return null;
  } else {
    month.classList.remove('error');
    monthErr.innerHTML = ``;
    return monthValue;
  }
}

function checkDay() {
  const monthValue = Number(checkMonth()) || null;
  const yearValue = Number(checkYear());
  const dayValue = Number(day.value);
  console.log(monthValue);
  if (!dayValue || isNaN(dayValue)) {
    day.classList.add('error');
    dayErr.innerHTML = `This field is required`;
    return null;
  }

  if (!monthValue && dayValue > 31) {
    day.classList.add('error');
    dayErr.innerHTML = `Must be a vaild day`;
    return null;
  }
  if (monthValue === 2) {
    if (
      (yearValue % 4 === 0 && dayValue > 29) ||
      (yearValue % 4 !== 0 && dayValue > 28)
    ) {
      day.classList.add('error');
      dayErr.innerHTML = `Must be a vaild day`;
      return null;
    }
  } else if ([4, 6, 9, 11].includes(monthValue)) {
    if (dayValue > 30) {
      day.classList.add('error');
      dayErr.innerHTML = `Must be a vaild day`;
      return null;
    }
  }
  day.classList.remove('error');
  dayErr.innerHTML = ``;
  return dayValue;
}

function checkYear() {
  const yearValue = year.value;
  const currentYear = new Date().getFullYear();
  if (!yearValue) {
    year.classList.add('error');
    yearErr.innerHTML = `This field is required`;
    return null;
  }

  if (isNaN(yearValue)) {
    year.classList.add('error');
    yearErr.innerHTML = `Must be a vaild year`;
    return null;
  }

  if (yearValue > currentYear) {
    year.classList.add('error');
    yearErr.innerHTML = `Must be in the past`;
    return null;
  } else {
    year.classList.remove('error');
    yearErr.innerHTML = ``;
    return yearValue;
  }
}

function calculateDateDifference() {
  const dayValue = checkDay();
  const monthValue = checkMonth();
  const yearValue = checkYear();

  if (!dayValue || !monthValue || !yearValue) return;

  const inputDateStr = `${yearValue}-${monthValue}-${dayValue}`;
  const inputDate = new Date(inputDateStr);
  const currentDate = new Date();
  const timeDifference = currentDate - inputDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
  const daysRemaining = daysDifference - years * 365;
  const months = Math.floor(daysRemaining / 30);
  const days = daysRemaining % 30;
  return {
    years,
    months,
    days,
  };
}
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const yearResult = document.getElementById('years');
  const monthResult = document.getElementById('months');
  const dayResult = document.getElementById('days');

  const result = calculateDateDifference();

  if (typeof result === 'object') {
    const { years, months, days } = calculateDateDifference();
    labels.forEach((label) => label.classList.remove('error'));
    yearResult.textContent = years;
    monthResult.textContent = months;
    dayResult.textContent = days;
  } else {
    labels.forEach((label) => label.classList.add('error'));
    yearResult.textContent = '- -';
    monthResult.textContent = '- -';
    dayResult.textContent = '- -';
  }
});

const resultsEl = document.getElementById('result');
const guestsInputEl = document.getElementById('num-input');
const vegetarianInputEl = document.getElementById('vegetarian-input');

document.getElementById('btn').addEventListener('click', () => {
  resultsEl.innerHTML = `<ul>${getDinnerList()
    .map((dinnerItem) => `<li>${dinnerItem}</li>`)
    .join('')}</ul>`;
  console.log(getDinnerList().join(', '));
});

const dinnerOptions = {
  small: {
    regular: ['Turkey', 'Asparagus', 'Salad', 'Chocolate Cake'],
    vegetarian: ['Squash', 'Mushroom Risotto', 'Quiche', 'Fruit Salad'],
  },
  medium: {
    regular: [
      'Turkey',
      'Ham',
      'Potatoes',
      'Asparagus',
      'Salad',
      'Chocolate Cake',
      'Apple Pie',
    ],
    vegetarian: [
      'Squash',
      'Vegetarian Wellington',
      'Eggplant Parmesan',
      'Mushroom Risotto',
      'Quiche',
      'Fruit Salad',
    ],
  },
  large: {
    regular: [
      'Turkey',
      'Ham',
      'Potatoes',
      'Asparagus',
      'Salad',
      'Deviled Eggs',
      'Corn on the Cob',
      'Chocolate Cake',
      'Apple Pie',
      'Cheese Cake',
    ],
    vegetarian: [
      'Squash',
      'Vegetarian Wellington',
      'Eggplant Parmesan',
      'Mushroom Risotto',
      'Quiche',
      'Fruit Salad',
      'Pumpkin Pie',
      'Apple Crisp',
    ],
  },
};

function getDinnerList() {
  let dinnersize = '';
  let vegetarian = vegetarianInputEl.checked;

  if (guestsInputEl.value < 1) {
    return [];
  } else if (guestsInputEl.value <= 5) {
    dinnersize = 'small';
  } else if (guestsInputEl.value <= 10) {
    dinnersize = 'medium';
  } else {
    dinnersize = 'large';
  }

  const dinnerOption = vegetarian
    ? dinnerOptions[dinnersize].vegetarian
    : dinnerOptions[dinnersize].regular;

  return dinnerOption;
}

import menuArray from './data.js';
let itemsOrdered = JSON.parse(localStorage.getItem('itemsOrdered')) || [];

const modal = document.getElementById('modal');
const payBtn = document.getElementById('pay-btn');
let discount = false;

//event listeners

document.addEventListener('click', (e) => {
  if (e.target.dataset.add) {
    handleAddItemToCart(e.target.dataset.add);
  }
  if (e.target.dataset.remove) {
    handleRemoveItemFromCart(e.target.dataset.remove);
  }
  if (e.target.closest('#starContainer')) {
    handleStarRating(e);
  }
  if (e.target.id === 'complete-order-button') {
    handleCompleteOrder();
  }
  if (e.target.id === 'close-modal-button') {
    handleCloseModal();
  }
  if (e.target == modal) {
    handleCloseModal();
  }
  if (e.target.id === 'pay-btn') {
    e.preventDefault();
    const inputs = document.querySelectorAll('.modal-card input');
    const allInputsFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== ''
    );

    if (allInputsFilled) {
      handlePayment();
    } else {
      window.alert('Invalid Inputs');
    }
  }
  if (e.target.id === 'discount-btn') {
    if (
      document.getElementById('discount-input').value.toUpperCase() ===
      'FRYEDYE10'
    ) {
      discount = true;
      render();
    }
  }
});

//handling event listeners
function handleAddItemToCart(itemId) {
  document.querySelector('.order-complete').classList.add('hidden');
  const existingItemIndex = itemsOrdered.findIndex(
    (item) => item.id === Number(itemId)
  );

  if (existingItemIndex !== -1) {
    itemsOrdered[existingItemIndex].quantity += 1;
  } else {
    const itemObj = menuArray.find(
      (menuItem) => menuItem.id === Number(itemId)
    );
    itemObj.quantity = 1;
    itemsOrdered = [...itemsOrdered, itemObj];
  }
  render();
}

function handleRemoveItemFromCart(itemId) {
  const itemIndex = itemsOrdered.findIndex(
    (item) => item.id === Number(itemId)
  );

  if (itemIndex !== -1) {
    if (itemsOrdered[itemIndex].quantity > 0) {
      itemsOrdered[itemIndex].quantity -= 1;
    }
  }

  if (itemsOrdered[itemIndex].quantity === 0) {
    itemsOrdered = itemsOrdered.filter((item) => item.id !== Number(itemId));
  }
  render();
}

function handleStarRating(e) {
  if (e.target.classList.contains('star')) {
    const clickedRating = parseInt(e.target.getAttribute('data-rating'));
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.classList.toggle('filled', index < clickedRating);
    });
  }
}

function handleCompleteOrder() {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function handleCloseModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function handlePayment() {
  payBtn.innerHTML = `<img src="./images/Spinner-1s-200px.gif" width="50px" height="50px" />`;
  setTimeout(() => {
    payBtn.innerHTML = 'Pay';
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.querySelector('.order-complete').classList.remove('hidden');
    document.querySelector('#order').classList.add('hidden');
    localStorage.clear();
    itemsOrdered = [];
    document
      .querySelectorAll('.modal-card input')
      .forEach((input) => (input.value = ''));
    const stars = document.querySelectorAll('.star');
    stars.forEach((star) => {
      star.classList.remove('filled');
    });
  }, 1500);
}

//render functions
function getItemHTML() {
  return menuArray.map((item) => {
    return `
		<div class="product-card" data-id="${item.id}">
			<img
				src="${item.imgURL}"
				alt="${item.name} icon"
				width="100px"
				height="100px"
			/>
			<div class="product-info">
				<h3 class="item-title">${item.name}</h3>
				<p class="item-ingredients">${item.ingredients}</p>
				<p class="item-price">$ ${item.price}</p>
			</div>
			<button id="add-to-cart-btn-${item.id}" class="add-to-cart-btn" data-add="${item.id}">+</button>
		</div>
		`;
  });
}

function getOrderHTML() {
  if (itemsOrdered.length > 0) {
    document.getElementById('order').classList.remove('hidden');
    return itemsOrdered
      .map((item) => {
        return `
				<div class="order-card">
					<h4>${item.name}</h4>
          <span class="quantity">${
            item.quantity > 0 && 'x' + item.quantity
          }</span>
					<button class="remove-button" data-remove=${item.id}>remove</button>
					<p class="order-item-price">$ ${item.price * item.quantity}</p>
				</div>
			`;
      })
      .join('');
  } else {
    document.getElementById('order').classList.add('hidden');
  }
}

function totalPriceHTML() {
  let totalPrice = itemsOrdered.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (discount) {
    return (totalPrice * 0.9).toFixed(2);
  } else {
    return totalPrice;
  }
}

function render() {
  document.getElementById('product-menu').innerHTML = getItemHTML();
  document.getElementById('order-card-container').innerHTML = getOrderHTML();
  document.getElementById('total-price').innerHTML = `$${totalPriceHTML()}`;
  localStorage.setItem('itemsOrdered', JSON.stringify(itemsOrdered));
}
render();

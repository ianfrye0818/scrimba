import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const wishListTitleInput = document.getElementById('wishListTitle');
const wishListLinkInput = document.getElementById('wishListLink');
const wishListTextInput = document.getElementById('wishListText');

let wishList = JSON.parse(localStorage.getItem('wishList')) || [];
//event listeners
document.getElementById('addBtn').addEventListener('click', addItemToList);
document.addEventListener('click', (e) => {
  if (e.target.dataset.id) {
    deleteItemFromList(e.target.dataset.id);
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addItemToList();
  }
});

//add an item to list
function addItemToList() {
  const wishListTitle = wishListTitleInput.value;
  const wishListText = wishListTextInput.value;
  let wishListLink = wishListLinkInput.value;
  if (!wishListTitle || !wishListLink || !wishListText) {
    return;
  } else {
    wishListLink = wishListLink.startsWith('https://')
      ? wishListLink
      : 'https://' + wishListLink;
    wishList.push({
      id: uuidv4(),
      title: wishListTitle,
      link: wishListLink,
      text: wishListText,
    });
    localStorage.setItem('wishList', JSON.stringify(wishList));
    wishListTitleInput.value = '';
    wishListLinkInput.value = '';
    wishListTextInput.value = '';
    renderWishList();
  }
}
//delete an item from list
function deleteItemFromList(id) {
  console.log(id);
  wishList = wishList.filter((listItem) => {
    return listItem.id !== id;
  });
  localStorage.setItem('wishList', JSON.stringify(wishList));
  renderWishList();
}

//render list to webapge
function renderWishList() {
  document.getElementById('wishListDiv').innerHTML =
    wishList.length <= 0
      ? '<h2 class="text-success w-100 text-center">Add some items to your list...</h2>'
      : wishList
          .map((listItem) => {
            return `
    <div class="card" style="width: 18rem">
        <img
          src="./images/ekaterina-shevchenko-ZLTlHeKbh04-unsplash.jpg"
          class="card-img-top"
          alt="photo present"
        />
        <div class="card-body">
          <h5 class="card-title">${listItem.title}</h5>
          <p class="card-text">${listItem.text}</p>
          <a
            href="${listItem.link}"
            target="_blank"
            class="btn btn-primary"
            >Link to my product</a
          >
          <button data-id=${listItem.id} class="btn btn-danger d-block mt-2">Delete</button>
          </div>
      </div>
    
    `;
          })
          .join('');
}

renderWishList();

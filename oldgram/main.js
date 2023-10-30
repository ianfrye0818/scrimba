import posts from './posts.js';
let liked = false;
let counter = 0;
const postsEl = document.getElementById('main-feed');

posts.forEach((post, indx) => {
  let likes = post.likes;
  const userPost = document.createElement('div');
  userPost.className = 'user-post';

  const likeCounter = document.createElement('p');
  likeCounter.className = 'like-counter';
  likeCounter.textContent = `${likes} likes`;

  userPost.append(
    renderPostHeader(post.avatar, post.name, post.location),
    renderPostImage(post.post, indx, post.likes, likeCounter),
    renderIcons(indx, post.likes, likeCounter),
    likeCounter,
    renderCommentSection(post.username, post.comment)
  );
  postsEl.append(userPost);
});

function renderPostHeader(avitar, name, location) {
  const userPostInfo = document.createElement('div');
  userPostInfo.className = 'post-user-info';

  const postUserAvitar = document.createElement('img');
  postUserAvitar.src = avitar;
  postUserAvitar.className = 'avitar';

  const nameLocationSection = document.createElement('div');
  nameLocationSection.className = 'name-location';

  const postUserName = document.createElement('p');
  postUserName.className = 'user-name';
  postUserName.textContent = name;

  const postUserLocation = document.createElement('p');
  postUserLocation.textContent = location;

  nameLocationSection.append(postUserName, postUserLocation);
  userPostInfo.append(postUserAvitar, nameLocationSection);

  return userPostInfo;
}

function renderPostImage(image, index, likes, likeCounter) {
  const mainImgWrapper = document.createElement('div');
  mainImgWrapper.className = 'main-image-wrapper';
  mainImgWrapper.id = 'main-img';

  const userPostImg = document.createElement('img');
  userPostImg.src = image;
  userPostImg.alt = 'user post';

  mainImgWrapper.appendChild(userPostImg);

  return mainImgWrapper;
}

function renderIcons(index, likes, likeCounter) {
  const iconBox = document.createElement('div');
  iconBox.className = 'icon-box';
  const heartIcon = document.createElement('img');
  heartIcon.src = '/images/icon-heart.png';
  heartIcon.alt = 'heart icon';
  heartIcon.className = 'icon';

  const isLiked = localStorage.getItem(index) === 'true';

  if (isLiked) {
    heartIcon.setAttribute('data', 'liked');
    heartIcon.src = '/images/heart-full.svg';
  } else {
    heartIcon.removeAttribute('data');
    heartIcon.src = 'images/icon-heart.png';
  }

  heartIcon.addEventListener('click', () => {
    if (heartIcon.hasAttribute('data')) {
      heartIcon.removeAttribute('data');
      heartIcon.src = '/images/icon-heart.png';
      likes--;
      likeCounter.textContent = `${likes} likes`;
    } else {
      heartIcon.setAttribute('data', 'liked');
      heartIcon.src = '/images/heart-full.svg';
      likes++;
      likeCounter.textContent = `${likes} likes`;
    }
    for (let i = 0; i <= index; i++) {
      if (heartIcon.hasAttribute('data')) {
        localStorage.setItem(index, true);
      } else {
        localStorage.setItem(index, false);
      }
    }
  });

  const commentIcon = document.createElement('img');
  commentIcon.src = 'images/icon-comment.png';
  commentIcon.alt = 'comment icon';
  commentIcon.className = 'icon';

  const dmIcon = document.createElement('img');
  dmIcon.src = 'images/icon-dm.png';
  dmIcon.alt = 'dm icon';
  dmIcon.className = 'icon';

  iconBox.append(heartIcon, commentIcon, dmIcon);
  return iconBox;
}

function renderCommentSection(username, userComment) {
  const commentSection = document.createElement('div');
  commentSection.className = 'comment-section';

  const comment = document.createElement('p');
  comment.className = 'comment';

  const commenterUserName = document.createElement('span');
  commenterUserName.classList.add('user-name', 'comment-span');
  commenterUserName.textContent = username;

  const textContent = document.createTextNode(userComment);

  comment.append(commenterUserName, textContent);
  return comment;
}

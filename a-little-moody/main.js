/* === Imports === */
import { initializeApp } from '/firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from '/firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from './node_modules/firebase/firestore';

/* === Firebase Setup === */
const firebaseConfig = {
  apiKey: 'AIzaSyC4s-smRUV33F0Cd2nrWGQmaoxZkL5A0FY',
  authDomain: 'moody-53078.firebaseapp.com',
  projectId: 'moody-53078',
  storageBucket: 'moody-53078.appspot.com',
  messagingSenderId: '620313810867',
  appId: '1:620313810867:web:979d016b734817a2341dc6',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById('logged-out-view');
const viewLoggedIn = document.getElementById('logged-in-view');

const signInWithGoogleButtonEl = document.getElementById(
  'sign-in-with-google-btn'
);

const emailInputEl = document.getElementById('email-input');
const passwordInputEl = document.getElementById('password-input');

const signInButtonEl = document.getElementById('sign-in-btn');
const createAccountButtonEl = document.getElementById('create-account-btn');

const signOutButtonEl = document.getElementById('sign-out-btn');

const userProfilePictureEl = document.getElementById('user-profile-picture');
const userGreetingEl = document.getElementById('user-greeting');

const allFilterButtonEl = document.getElementById('all-filter-btn');

const filterButtonEls = document.getElementsByClassName('filter-btn');

const moodEmojiEls = document.getElementsByClassName('mood-emoji-btn');
const textareaEl = document.getElementById('post-input');
const postButtonEl = document.getElementById('post-btn');
const fetchPostsButtonEl = document.getElementById('fetch-posts-btn');

const postsEl = document.getElementById('posts');

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener('click', authSignInWithGoogle);

signInButtonEl.addEventListener('click', authSignInWithEmail);
createAccountButtonEl.addEventListener('click', authCreateAccountWithEmail);

signOutButtonEl.addEventListener('click', authSignOut);

for (let moodEmojiEl of moodEmojiEls) {
  moodEmojiEl.addEventListener('click', selectMood);
}

for (let filterButtonEl of filterButtonEls) {
  filterButtonEl.addEventListener('click', selectFilter);
}

postButtonEl.addEventListener('click', postButtonPressed);

// === Global Constants ===
const collectionName = 'posts';

// === State ===

let moodState = 0;

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView();
    showProfilePicture(userProfilePictureEl, user);
    showUserGreeting(userGreetingEl, user);
    updateFilterButtonStyle(allFilterButtonEl);
    fetchAllPosts(user);
  } else {
    showLoggedOutView();
    clearAll(postsEl);
  }
});

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Signed in with Google');
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function authSignInWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      clearAuthFields();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function authCreateAccountWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      clearAuthFields();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function authSignOut() {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.error(error.message);
    });
}

// == functions - Firebase - Cloud Firestore ==

async function addPostToDB(postBody, user) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      body: postBody,
      uuid: user.uid,
      userFirstName: user.displayName.split(' ')[0],
      createdAt: Timestamp.fromDate(new Date()),
      mood: moodState,
    });
  } catch (e) {
    console.error('Error adding document ', e);
  }
}

async function updatePostInDB(docId, newBody) {
  const postref = doc(db, 'posts', docId);
  await updateDoc(postref, { body: newBody });
}

async function deletePostFromDB(docId) {
  await deleteDoc(doc(db, 'posts', docId));
}

async function fetchInRealtimeAndRenderPostsFromDB(query, user) {
  onSnapshot(query, (querySnapshot) => {
    clearAll(postsEl);
    querySnapshot.forEach((doc) => {
      renderPosts(postsEl, doc);
    });
  });
}

function fetchTodayPosts(user) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const postsRef = collection(db, collectionName);

  const q = query(
    postsRef,
    where('uuid', '==', user.uid),
    where('createdAt', '>=', startOfDay),
    where('createdAt', '<=', endOfDay),
    orderBy('createdAt', 'desc')
  );
  fetchInRealtimeAndRenderPostsFromDB(q, user);
}

function fetchWeekPosts(user) {
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);

  if (startOfWeek.getDay() === 0) {
    startOfWeek.setDate(startOfWeek.getDate() - 6);
  } else {
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  }

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const postsRef = collection(db, collectionName);

  const q = query(
    postsRef,
    where('uuid', '==', user.uid),
    where('createdAt', '>=', startOfWeek),
    where('createdAt', '<=', endOfDay),
    orderBy('createdAt', 'desc')
  );
  fetchInRealtimeAndRenderPostsFromDB(q, user);
}

function fetchMonthPosts(user) {
  const startOfMonth = new Date();
  startOfMonth.setHours(0, 0, 0, 0);
  startOfMonth.setDate(1);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const postsRef = collection(db, collectionName);

  const q = query(
    collection(db, 'posts'),
    where('uuid', '==', user.uid),
    where('createdAt', '>=', startOfMonth),
    where('createdAt', '<=', endOfDay),
    orderBy('createdAt', 'desc')
  );

  fetchInRealtimeAndRenderPostsFromDB(q, user);
}

function fetchAllPosts(user) {
  const postsRef = collection(db, collectionName);
  const q = query(
    postsRef,
    where('uuid', '==', user.uid),
    orderBy('createdAt', 'desc')
  );
  fetchInRealtimeAndRenderPostsFromDB(q, user);
}

/* == Functions - UI Functions == */

function createPostHeader(postData) {
  const headerDiv = document.createElement('div');
  headerDiv.className = 'header';

  const headerDate = document.createElement('h3');
  headerDate.textContent = displayDate(postData.createdAt);
  headerDiv.appendChild(headerDate);

  const moodImage = document.createElement('img');
  moodImage.src = `assets/emojis/${postData.mood}.png`;
  headerDiv.appendChild(moodImage);

  return headerDiv;
}

function createPostBody(postData) {
  const postBody = document.createElement('p');
  postBody.innerHTML = replaceNewlinesWithBrTags(postData.body);
  return postBody;
}

function createPostUpdateButton(wholeDoc) {
  const postId = wholeDoc.id;
  const postData = wholeDoc.data();
  const button = document.createElement('button');
  button.textContent = 'Edit';
  button.classList.add('edit-color');
  button.addEventListener('click', function () {
    const newBody = prompt('Edit the post', postData.body);

    if (newBody) {
      updatePostInDB(postId, newBody);
    }
  });
  return button;
}

function createPostDeleteButton(wholeDoc) {
  const postId = wholeDoc.id;

  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.classList.add('delete-color');
  button.addEventListener('click', function () {
    deletePostFromDB(postId);
  });
  return button;
}

function createPostFooter(wholeDoc) {
  const footerDiv = document.createElement('div');
  footerDiv.className = 'footer';
  footerDiv.appendChild(createPostUpdateButton(wholeDoc));
  footerDiv.appendChild(createPostDeleteButton(wholeDoc));
  return footerDiv;
}

function renderPosts(postsEl, wholeDoc) {
  const postData = wholeDoc.data();
  const postsDiv = document.createElement('div');
  postsDiv.className = 'post';
  postsDiv.appendChild(createPostHeader(postData));
  postsDiv.appendChild(createPostBody(postData));
  postsDiv.appendChild(createPostFooter(wholeDoc));
  postsEl.appendChild(postsDiv);
}

function replaceNewlinesWithBrTags(inputString) {
  return inputString.replace(/\n/g, '<br>');
}

function postButtonPressed() {
  const postBody = textareaEl.value;
  const user = auth.currentUser;

  if (postBody && moodState) {
    addPostToDB(postBody, user);
    clearInputField(textareaEl);
    resetAllMoodElements(moodEmojiEls);
  }
}

function showLoggedOutView() {
  hideView(viewLoggedIn);
  showView(viewLoggedOut);
}

function showLoggedInView() {
  hideView(viewLoggedOut);
  showView(viewLoggedIn);
}

function showView(view) {
  view.style.display = 'flex';
}

function hideView(view) {
  view.style.display = 'none';
}

function clearInputField(field) {
  field.value = '';
}

function clearAuthFields() {
  clearInputField(emailInputEl);
  clearInputField(passwordInputEl);
}

function showProfilePicture(imgElement, user) {
  const photoURL = user.photoURL;

  if (photoURL) {
    imgElement.src = photoURL;
  } else {
    imgElement.src = 'assets/images/default-profile-picture.jpeg';
  }
}

function showUserGreeting(element, user) {
  const displayName = user.displayName;

  if (displayName) {
    const userFirstName = displayName.split(' ')[0];
    element.textContent = `Hey ${userFirstName}, how are you?`;
  } else {
    element.textContent = `Hey friend, how are you?`;
  }
}

function displayDate(firebaseDate) {
  if (!firebaseDate) {
    return 'Date processing...';
  }
  const date = firebaseDate.toDate();
  const day = date.getDate();
  const year = date.getFullYear();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  hours = hours > 12 ? (hours -= 12) : hours;
  minutes = hours > 12 ? minutes + ' PM' : minutes + ' AM';
  return `${day} ${month} ${year} - ${hours}:${minutes}`;
}

/* = Functions - UI Functions - Mood = */

function selectMood(event) {
  const selectedMoodEmojiElementId = event.currentTarget.id;
  changeMoodsStyleAfterSelection(selectedMoodEmojiElementId, moodEmojiEls);
  const chosenMoodValue = returnMoodValueFromElementId(
    selectedMoodEmojiElementId
  );

  moodState = chosenMoodValue;
  console.log(moodState);
}

function changeMoodsStyleAfterSelection(
  selectedMoodElementId,
  allMoodElements
) {
  for (let moodEmojiEl of moodEmojiEls) {
    if (selectedMoodElementId === moodEmojiEl.id) {
      moodEmojiEl.classList.remove('unselected-emoji');
      moodEmojiEl.classList.add('selected-emoji');
    } else {
      moodEmojiEl.classList.remove('selected-emoji');
      moodEmojiEl.classList.add('unselected-emoji');
    }
  }
}

function resetAllMoodElements(allMoodElements) {
  for (let moodEmojiEl of allMoodElements) {
    moodEmojiEl.classList.remove('selected-emoji');
    moodEmojiEl.classList.remove('unselected-emoji');
  }
  moodState = 0;
}

function returnMoodValueFromElementId(elementId) {
  return Number(elementId.slice(5));
}

/* == Functions - UI Functions - Date Filters == */

function clearAll(element) {
  element.innerHTML = '';
}

function resetAllFilterButtons(allFilterButtons) {
  for (let filterButtonEl of allFilterButtons) {
    filterButtonEl.classList.remove('selected-filter');
  }
}

function updateFilterButtonStyle(element) {
  element.classList.add('selected-filter');
}

function fetchPostsFromPeriod(period, user) {
  if (period === 'today') {
    fetchTodayPosts(user);
  } else if (period === 'week') {
    fetchWeekPosts(user);
  } else if (period === 'months') {
    fetchMonthPosts(user);
  } else {
    fetchAllPosts(user);
  }
}

function selectFilter(event) {
  const user = auth.currentUser;
  const selectedFilterElementId = event.target.id;
  const selectedFilterPeriod = selectedFilterElementId.split('-')[0];
  const selectedFilterElement = document.getElementById(
    selectedFilterElementId
  );
  resetAllFilterButtons(filterButtonEls);
  updateFilterButtonStyle(selectedFilterElement);
  fetchPostsFromPeriod(selectedFilterPeriod, user);
}

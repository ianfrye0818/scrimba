import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// const tweetsData = JSON.parse(localStorage.getItem('tweetData')) || [];

// event Listeners
document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === 'tweet-btn') {
    handleTweetButtonClick();
  }
});

document.getElementById('tweet-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    handleTweetButtonClick();
  }
});

//Handling events
function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.find(function (tweet) {
    return tweet.uuid === tweetId;
  });
  targetTweetObj.isLiked ? targetTweetObj.likes-- : targetTweetObj.likes++;
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();
  localStorage.setItem('tweetData', JSON.stringify(tweetsData));
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.find(function (tweet) {
    return tweet.uuid === tweetId;
  });
  targetTweetObj.isRetweeted
    ? targetTweetObj.retweets--
    : targetTweetObj.retweets++;
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
  localStorage.setItem('tweetData', JSON.stringify(tweetsData));
}

function handleReplyClick(tweetId) {
  const targetTweetObj = tweetsData.find(function (tweet) {
    return tweet.uuid === tweetId;
  });
  document.getElementById(targetTweetObj.uuid).classList.toggle('hidden');
}

function handleTweetButtonClick() {
  const tweetInput = document.getElementById('tweet-input');
  if (!tweetInput.value) return;

  tweetsData.unshift({
    handle: `@ianfrye`,
    profilePic: `images/IanSmall.jpeg`,
    likes: 0,
    retweets: 0,
    tweetText: tweetInput.value,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: uuidv4(),
  });
  tweetInput.value = '';
  localStorage.setItem('tweetData', JSON.stringify(tweetsData));
  render();
}

//Rendering Page
function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach(function (tweet) {
    let repliesHTML = ``;
    if (tweet.replies.length > 0) {
      tweet.replies.forEach((reply) => {
        repliesHTML += `
				
				<div class="tweet-reply">
					<div class="tweet-inner">
						<img src="${reply.profilePic}" class="profile-pic">
						<div>
							<p class="handle">${reply.handle}</p>
							<p class="tweet-text">${reply.tweetText}</p>
						</div>
					</div>
				</div>
				`;
      });
    }

    feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart" style="${
                      tweet.isLiked && 'color: red'
                    }"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet"
                    data-retweet="${tweet.uuid}" style="${
      tweet.isRetweeted && 'color: #7edf7e'
    }"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>
        </div>            
    </div>
		<div id="${tweet.uuid}" class="hidden">
			${repliesHTML}

		</div>
</div>
`;
  });
  return feedHtml;
}

function render() {
  document.getElementById('feed').innerHTML = getFeedHtml();
}

render();

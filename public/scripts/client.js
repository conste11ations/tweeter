/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const createTweetElement = function (tweetData) {
// POssible alternate implementation
//     const $articleTweet = `<article class="tweet">
//     <img name src=${tweetData.user.avatars}/>
//      <header>${tweet.user.name}</header>
//       ////.....
//  </article>
    const $articleTweet = $(`<article class="tweet"></article>`);
    const $avatar = $(`<img name="image" alt="No image loaded" src="${tweetData.user.avatars}"></img>`);
    const $headerSection = $(`<header>${$avatar[0].outerHTML} ${tweetData.user.name} ${tweetData.user.handle}</header>`);
    const $tweetString = $(`<textarea name="text" id="tweet-text" disabled="disabled">${tweetData.content.text}</textarea>`);
    const $footerSection = $(`<footer>Created at ${tweetData.created_at}</footer>`);
    // Everything is appending to articleTweet which is why there is only one level of nesting
    // This is also safer because this prevents script injection (appends <script></script> as a string)
    return $articleTweet.append($headerSection).append($tweetString).append($footerSection);
  }

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $.each(tweets, function(index, value) {
      $('section.tweet-list').append(createTweetElement(value));
    });
  }

//  renderTweets(data);

});


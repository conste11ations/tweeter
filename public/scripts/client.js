/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const createTweetElement = function (tweetData) {
    // Possible alternate implementation
    //     const $articleTweet = `<article class="tweet">
    //     <img name src=${tweetData.user.avatars}/>
    //      <header>${tweet.user.name}</header>
    //       ////.....
    //  </article>
    const $dateString = new Date(tweetData.created_at * 1000).toUTCString();

    const $articleTweet = $(`<article class="tweet"></article>`);
    const $avatar = $(`<img name="image" alt="No image loaded" src="${tweetData.user.avatars}"></img>`);
    const $headerSection = $(`<header>${$avatar[0].outerHTML} ${tweetData.user.name} ${tweetData.user.handle}</header>`);
    // text() helps us get rid of XSS
    const $tweetString = $('<textarea name="text" id="tweet-text" disabled="disabled">').text(`${tweetData.content.text}`);
    const $footerSection = $(`<footer>${$dateString}</footer>`);
    // Notes: every other constant is directly appending to articleTweet which is why there is only one level of nesting
    // This is also safer because this prevents script injection (appends <script></script> as a string)
    return $articleTweet.append($headerSection).append($tweetString).append($footerSection);
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $.each(tweets, function (index, value) {
      $('section.tweet-list').prepend(createTweetElement(value));
    });
  };
  // Note this is not wrapped around a constant because 
  // you want this to constantly listen and act upon form submission

  // const postTweetListener = (tweet) => {
  $("form").submit(function (event) {
    let $errorMessage = "";
    event.preventDefault();
    $('div.error-message').remove();

    if ($('textarea#new-tweet-text').val().length > 140) {
      $errorMessage = "Your tweet is too long!";
    }
    if ($('textarea#new-tweet-text').val().length === 0) {
      $errorMessage = "You've submitted an empty tweet!";
    }

    if ($errorMessage) {
      $('main.container').prepend(`<div class="error-message">${$errorMessage}</div>`);
      $('div.error-message').slideDown("slow", function () {
      });
    } else {
      $('div.error-message').slideUp("slow", function () {
      });
      $.ajax({
        url: `/tweets`,
        type: "POST",
        data: $(this).serialize()
      })
        .then((response) => {
          location.reload();
        })
        // Learned that blindly console.wan(error) is a security risk as there's a lot of info in the default error obj
        .catch((error) => console.warn('error occured on posting tweet'));
    }
  });
  // };

  const loadTweets = function () {
    $.ajax({
      url: `/tweets`,
      type: "GET",
      dataType: "JSON",
    })
      .then((response) => {
        renderTweets(response);
      })
      .catch((error) => console.warn('error occured on loading tweets'));
  }

  loadTweets();

});


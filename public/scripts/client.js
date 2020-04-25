/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const createTweetElement = function (tweetData) {

    const $dateString = moment(tweetData.created_at).fromNow();
    const $articleTweet = $(`<article class="tweet"></article>`);
    const $avatar = $(`<img name="main-avatar" alt="No image loaded" src="${tweetData.user.avatars}"></img>`);
    const $headerSection = $(`<header>${$avatar[0].outerHTML} <h4>${tweetData.user.name}</h4> <h3>${tweetData.user.handle}</h3></header>`);

    const $tweetString = $('<textarea name="text" id="tweet-text" disabled="disabled">').text(`${tweetData.content.text}`);
    const $imgFlag = $(`<img name="flag-icon" alt="No flag image" src="/images/flag-icon.png"></img>`);
    const $imgRetweet = $(`<img name="flag-icon" alt="No flag image" src="/images/retweet-icon.png"></img>`);
    const $imgHeart = $(`<img name="flag-icon" alt="No flag image" src="/images/heart-icon.png"></img>`);
    const $footerSection = $(`<footer>${$dateString} <div class="icons">${$imgFlag[0].outerHTML} ${$imgRetweet[0].outerHTML} ${$imgHeart[0].outerHTML}</div></footer>`);

    return $articleTweet.append($headerSection).append($tweetString).append($footerSection);
  };

  const renderTweets = function (tweets) {

    $.each(tweets, function (index, value) {
      $('section.tweet-list').prepend(createTweetElement(value));
    });
  };

  // function to display errors to help user validate tweet 

  $('form').submit(function (event) {
    let $errorMessage = "";
    event.preventDefault();
    $('div.error-message').remove();

    if ($('textarea#new-tweet-text').val().length > 140) {
      $errorMessage = "🚧 Your tweet is too long! 🚧 ";
    }
    if ($('textarea#new-tweet-text').val().length === 0) {
      $errorMessage = "🚧 You've submitted an empty tweet! 🚧 ";
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
        .catch((error) => console.warn('error occured on posting tweet'));
    }
  });

  $('button#new-tweet').click(function () {

    $('section.new-tweet').slideToggle('slow');
    $('section.new-tweet textarea').focus();
  });

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


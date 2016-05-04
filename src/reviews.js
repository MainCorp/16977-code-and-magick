'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var filterReviews = document.querySelector('.reviews-filter');
var elementFilterReviews = filterReviews['reviews'];
var templateElement = document.querySelector('template');
var contentReviews = document.querySelector('.reviews');
var elementToClone = templateElement.content.querySelector('.review');
var reviewRatingClass = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];
var reviews;

var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

var Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};

filterReviews.classList.add('invisible');

/* Выводим элемент на страницу */

var receiveReviewsElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;
  var reviewRating = element.querySelector('.review-rating');
  reviewRating.style.display = 'block';

  reviewRating.classList.add(reviewRatingClass[data.rating - 2]);

  container.appendChild(element);

  var photoUser = new Image();
  var reviewAuthor = element.querySelector('.review-author');

  photoUser.onload = function() {
    photoUser.classList.add('review-author');
    photoUser.height = 124;
    photoUser.width = 124;
    photoUser.alt = 'Аватарка пользователя ' + data.author.name;
    photoUser.title = data.author.name;

    element.replaceChild(photoUser, reviewAuthor);
  };

  photoUser.onerror = function() {
    element.classList.add('review-load-failure');
  };

  photoUser.src = data.author.picture;
};

/* Получаем с помощью XMLHttpRequest'a данные из файла */

var includePreloader = function() {
  contentReviews.classList.add('reviews-load-failure');
  contentReviews.classList.remove('.reviews-list-loading');
};

var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    contentReviews.classList.add('.reviews-list-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.onerror = function() {
    includePreloader();
  };

  xhr.timeout = 5000;
  xhr.ontimeout = function() {
    includePreloader();
  };

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};

var renderReviews = function(reviewsData) {
  reviewsContainer.innerHTML = '';
  reviewsData.forEach(function(review) {
    receiveReviewsElement(review, reviewsContainer);
  });
};

/* Фильтры отзывов */

filterReviews.onchange = function() {
  addActiveFilter(elementFilterReviews.value);
};

var addActiveFilter = function(valueReview) {
  var reviewsToFilter = reviews.slice(0);

  switch (valueReview) {
    case Filter.RECENT:
      var todaysDate = new Date();
      todaysDate = todaysDate.setDate(todaysDate.getDate() - 14);
      reviewsToFilter = reviewsToFilter.filter(function(a) {
        return a.date > todaysDate;
      });
      reviewsToFilter.sort(function(a, b) {
        return b.date - a.date;
      });
      break;
    case Filter.GOOD:
      reviewsToFilter = reviewsToFilter.filter(function(a) {
        return a.rating > 2;
      });
      reviewsToFilter.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case Filter.BAD:
      reviewsToFilter = reviewsToFilter.filter(function(a) {
        return a.rating < 3;
      });
      reviewsToFilter.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case Filter.POPULAR:
      reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

  renderReviews(reviewsToFilter);
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  renderReviews(reviews);
  contentReviews.classList.remove('.reviews-list-loading');
});

filterReviews.classList.remove('invisible');

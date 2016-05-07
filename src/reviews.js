'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var filterReviews = document.querySelector('.reviews-filter');
var elementFilterReviews = filterReviews['reviews'];
var templateElement = document.querySelector('template');
var contentReviews = document.querySelector('.reviews');
var elementToClone = templateElement.content.querySelector('.review');
var reviewRatingClass = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];
var reviews;
var reviewsToFilter = [];
var toShowButton = document.querySelector('.reviews-controls-more');

var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

var PAGE_SIZE = 3;

var pageNumber;

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

/* Кнопка 'Показать ещё' */

var toShowButtonActive = function() {
  toShowButton.addEventListener('click', function() {
    pageNumber++;
    renderReviews(reviewsToFilter, pageNumber);
  });
};

var renderReviews = function(reviewsData, page, replaced) {
  if (replaced) {
    reviewsContainer.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviewsData.slice(from, to).forEach(function(review) {
    receiveReviewsElement(review, reviewsContainer);
  });

  if (to >= reviewsToFilter.length) {
    toShowButton.classList.add('invisible');
  }
};

/* Фильтры отзывов */

filterReviews.addEventListener('change', function() {
  if (elementFilterReviews.value !== elementFilterReviews) {
    addActiveFilter(elementFilterReviews.value);
  }
});

var addActiveFilter = function(valueReview) {
  pageNumber = 0;
  reviewsToFilter = reviews.slice(0);
  toShowButton.classList.remove('invisible');

  switch (valueReview) {
    case Filter.RECENT:
      var todaysDate = new Date();
      todaysDate = todaysDate.setDate(todaysDate.getDate() - 14);
      reviewsToFilter = reviewsToFilter.filter(function(a) {
        return new Date(a.date) > todaysDate;
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

  renderReviews(reviewsToFilter, pageNumber, true);
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  addActiveFilter(Filter.ALL);
  toShowButtonActive();
  contentReviews.classList.remove('.reviews-list-loading');
});

filterReviews.classList.remove('invisible');

'use strict';

var receiveReviewsElement = require('./receive-reviews-element');
var getReviews = require('./get-reviews');
var Filter = require('./filter/filter-type');
var getActiveFilter = require('./filter/get-active-filter');

var reviewsContainer = document.querySelector('.reviews-list');
var filterReviews = document.querySelector('.reviews-filter');
var elementFilterReviews = filterReviews['reviews'];
var contentReviews = document.querySelector('.reviews');
var reviews;
var reviewsToFilter = [];
var toShowButton = document.querySelector('.reviews-controls-more');


var PAGE_SIZE = 3;

var pageNumber;

filterReviews.classList.add('invisible');

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

filterReviews.addEventListener('change', function() {
  if (elementFilterReviews.value !== elementFilterReviews) {
    addActiveFilter(elementFilterReviews.value);
  }
});

var addActiveFilter = function(valueReview) {
  reviewsToFilter = getActiveFilter(reviews, valueReview);
  pageNumber = 0;
  toShowButton.classList.remove('invisible');

  renderReviews(reviewsToFilter, pageNumber, true);
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  addActiveFilter(Filter.ALL);
  toShowButtonActive();
  contentReviews.classList.remove('.reviews-list-loading');
});

filterReviews.classList.remove('invisible');

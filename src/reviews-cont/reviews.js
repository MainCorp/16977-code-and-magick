'use strict';

var Review = require('./review');
var getReviews = require('./get-reviews');
var getActiveFilter = require('./filter/get-active-filter');

var reviewsContainer = document.querySelector('.reviews-list');
var filterReviews = document.querySelector('.reviews-filter');
var elementFilterReviews = filterReviews['reviews'];
var contentReviews = document.querySelector('.reviews');
var reviews;
var reviewsToFilter = [];
var renderedReviews = [];
var toShowButton = document.querySelector('.reviews-controls-more');
var localFilter = 'id';


var PAGE_SIZE = 3;

var pageNumber;

var Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};

var defaultFilter = Filter.ALL;

filterReviews.classList.add('invisible');

var toShowButtonActive = function() {
  toShowButton.addEventListener('click', function() {
    pageNumber++;
    renderReviews(reviewsToFilter, pageNumber);
  });
};

var renderReviews = function(reviewsData, page, replaced) {
  if (replaced) {
    renderedReviews.forEach(function(review) {
      review.remove();
    });
    renderedReviews = [];
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviewsData.slice(from, to).forEach(function(review) {
    renderedReviews.push(new Review(review, reviewsContainer));
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

var addActiveFilter = function(id) {
  reviewsToFilter = getActiveFilter(reviews, id);
  pageNumber = 0;
  toShowButton.classList.remove('invisible');
  localStorage.setItem(localFilter, id);

  renderReviews(reviewsToFilter, pageNumber, true);
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  defaultFilter = localStorage.getItem(localFilter);
  filterReviews.elements['reviews'].value = defaultFilter;
  addActiveFilter(defaultFilter);
  toShowButtonActive();
  contentReviews.classList.remove('.reviews-list-loading');
});

filterReviews.classList.remove('invisible');

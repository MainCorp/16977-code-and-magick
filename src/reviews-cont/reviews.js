'use strict';
function ReviewsFilter() {

  this.getReviews = require('./get-reviews');
  this.getActiveFilter = require('./filter/get-active-filter');

  this.reviewsContainer = document.querySelector('.reviews-list');
  this. filterReviews = document.querySelector('.reviews-filter');
  this.elementFilterReviews = this.filterReviews['reviews'];
  this.contentReviews = document.querySelector('.reviews');
  this.reviews = [];
  this.reviewsToFilter = [];
  this.renderedReviews = [];
  this.toShowButton = document.querySelector('.reviews-controls-more');
  this.localFilter = 'id';
  this.PAGE_SIZE = 3;
  this.pageNumber = 0;
  this.defaultFilter = ReviewsFilter.Filter.ALL;

  this.toShowButtonActive = this.toShowButtonActive.bind(this);
  this.renderReviews = this.renderReviews.bind(this);
  this.eventsClickFilter = this.eventsClickFilter.bind(this);
  this.addActiveFilter = this.addActiveFilter.bind(this);
  this.init = this.init.bind(this);
  this.callback = this.callback.bind(this);

  this.init();
}

ReviewsFilter.Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};

ReviewsFilter.prototype.toShowButtonActive = function() {
  var that = this;

  this.toShowButton.addEventListener('click', function() {
    that.pageNumber++;
    that.renderReviews(that.reviewsToFilter, that.pageNumber);
  });
};

ReviewsFilter.prototype.renderReviews = function(reviewsData, page, replaced) {
  var that = this;
  var Review = require('./review');

  if (replaced) {
    this.renderedReviews.forEach(function(review) {
      review.remove();
    });
    this.renderedReviews = [];
  }

  var from = page * this.PAGE_SIZE;
  var to = from + this.PAGE_SIZE;

  reviewsData.slice(from, to).forEach(function(review) {
    that.renderedReviews.push(new Review(review, that.reviewsContainer));
  });

  if (to >= this.reviewsToFilter.length) {
    this.toShowButton.classList.add('invisible');
  }
};

ReviewsFilter.prototype.eventsClickFilter = function() {
  var that = this;

  this.filterReviews.addEventListener('change', function() {
    if (that.elementFilterReviews.value !== that.elementFilterReviews) {
      that.addActiveFilter(that.elementFilterReviews.value);
    }
  });
};

ReviewsFilter.prototype.addActiveFilter = function(id) {
  this.reviewsToFilter = this.getActiveFilter(this.reviews, id);
  this.pageNumber = 0;
  this.toShowButton.classList.remove('invisible');
  localStorage.setItem(this.localFilter, id);

  this.renderReviews(this.reviewsToFilter, this.pageNumber, true);
};

ReviewsFilter.prototype.init = function() {
  this.filterReviews.classList.add('invisible');
  this.getReviews(this.callback);
  this.eventsClickFilter();
};

ReviewsFilter.prototype.callback = function(loadedReviews) {
  this.reviews = loadedReviews;
  this.defaultFilter = localStorage.getItem(this.localFilter);
  this.filterReviews.elements['reviews'].value = this.defaultFilter;
  this.addActiveFilter(this.defaultFilter);
  this.toShowButtonActive();
  this.contentReviews.classList.remove('.reviews-list-loading');
  this.filterReviews.classList.remove('invisible');
};

module.exports = new ReviewsFilter();

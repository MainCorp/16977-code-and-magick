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
  var that = this;

  this.PAGE_SIZE = 3;

  this.pageNumber = 0;

  this.Filter = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };

  this.defaultFilter = this.Filter.ALL;

  this.filterReviews.classList.add('invisible');

  this.toShowButtonActive = this.toShowButtonActive.bind(this);
  this.renderReviews = this.renderReviews.bind(this);
  this.eventsClickFilter = this.eventsClickFilter.bind(this);
  this.addActiveFilter = this.addActiveFilter.bind(this);

  this.getReviews(function(loadedReviews) {
    that.reviews = loadedReviews;
    that.defaultFilter = localStorage.getItem(that.localFilter);
    that.filterReviews.elements['reviews'].value = that.defaultFilter;
    that.addActiveFilter(that.defaultFilter);
    that.toShowButtonActive();
    that.contentReviews.classList.remove('.reviews-list-loading');
  });
  this.eventsClickFilter();

  this.filterReviews.classList.remove('invisible');

}

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
    that.renderedReviews = [];
  }

  var from = page * this.PAGE_SIZE;
  var to = from + this.PAGE_SIZE;

  reviewsData.slice(from, to).forEach(function(review) {
    that.renderedReviews.push(new Review(review, that.reviewsContainer));
  });

  if (to >= that.reviewsToFilter.length) {
    that.toShowButton.classList.add('invisible');
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
  var that = this;

  that.reviewsToFilter = this.getActiveFilter(that.reviews, id);
  that.pageNumber = 0;
  that.toShowButton.classList.remove('invisible');
  localStorage.setItem(that.localFilter, id);

  that.renderReviews(that.reviewsToFilter, that.pageNumber, true);
};

module.exports = new ReviewsFilter();

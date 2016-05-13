'use strict';

var Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};

var getActiveFilter = function(reviews, valueReview) {
  var reviewsToFilter = reviews.slice(0);

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

  return reviewsToFilter;
};

module.exports = getActiveFilter;

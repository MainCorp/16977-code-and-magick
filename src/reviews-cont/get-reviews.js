'use strict';

var contentReviews = document.querySelector('.reviews');

var includePreloader = function() {
  contentReviews.classList.add('reviews-load-failure');
  contentReviews.classList.remove('.reviews-list-loading');
};

var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

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

module.exports = getReviews;

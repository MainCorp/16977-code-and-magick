'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var filterReviews = document.querySelector('.reviews-filter');
var templateElement = document.querySelector('template');
var elementToClone = templateElement.content.querySelector('.review');
var reviewRatingClass = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];

filterReviews.classList.add('invisible');

var receiveReviewsElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;
  var reviewRating = element.querySelector('.review-rating');

  reviewRating.classList.add(reviewRatingClass[data.rating - 2]);

  container.appendChild(element);

  var photoUser = new Image();
  var reviewAuthor = element.querySelector('.review-author');

  photoUser.onload = function() {
    photoUser.classList.add('review-author');
    photoUser.height = 124;
    photoUser.width = 124;

    element.replaceChild(photoUser, reviewAuthor);
  };

  photoUser.onerror = function() {
    element.classList.add('review-load-failure');
  };

  reviewAuthor.src = data.author.picture;
  reviewAuthor.alt = 'Аватарка юзера ' + data.author.name;
  reviewAuthor.title = data.author.name;
};

window.reviews.forEach(function(review) {
  receiveReviewsElement(review, reviewsContainer);
});

filterReviews.classList.remove('invisible');

'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone = templateElement.content.querySelector('.review');


var receiveReviewsElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;
  var reviewRating = element.querySelector('.review-rating');
  var reviewRatingClass = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];

  reviewRating.classList.add(reviewRatingClass[data.rating - 2]);

  container.appendChild(element);

  var photoUser = new Image();
  var reviewAuthor = element.querySelector('.review-author');

  photoUser.onload = function(evt) {
    reviewAuthor.style.backgroundImage = 'url(\'' + evt.target.src + '\')';
    reviewAuthor.style.height = '124px';
    reviewAuthor.style.width = '124px';

    reviewAuthor.replaceChild(data.author.picture, reviewAuthor.style.backgroundImage);
  };

  photoUser.onerror = function() {
    reviewAuthor.classList.add('review-load-failure');
  };

  reviewAuthor.src = data.author.picture;


  return element;
};

window.reviews.forEach(function(review) {
  receiveReviewsElement(review, reviewsContainer);
});

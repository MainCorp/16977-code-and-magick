'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone = templateElement.content.querySelector('.review');


var receiveReviewsElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;
  var reviewRating = element.querySelector('.review-rating');
  reviewRating.style.display = 'inline-block';

  for (var i = 1; i < data.rating; i++) {
    var reviewRatingDoble = reviewRating.cloneNode(true);
    element.insertBefore(reviewRatingDoble, reviewRating);
  }

  container.appendChild(element);

  var photoUser = new Image();
  var reviewAuthor = element.querySelector('.review-author');
  reviewAuthor.src = data.author.picture;

  photoUser.onload = function(evt) {
    reviewAuthor.style.backgroundImage = 'url(\'' + evt.target.src + '\')';
    reviewAuthor.style.height = '124px';
    reviewAuthor.style.width = '124px';
  };

  photoUser.onerror = function() {
    element.classList.add('review-load-failure');
  };


  return element;
};

window.reviews.forEach(function(review) {
  receiveReviewsElement(review, reviewsContainer);
});

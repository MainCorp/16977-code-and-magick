'use strict';

var templateElement = document.querySelector('template');
var elementToClone = templateElement.content.querySelector('.review');
var reviewRatingClass = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];

function Review(data, container) {
  this.data = data;

  this.elementReviews = function() {
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

  this.element = this.elementReviews();
  this.element.addEventListener('click', this.onClickRQuizAnswer);
  this.onClickRQuizAnswer = function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      evt.preventDefault();
      evt.target.classList.add('review-quiz-answer-active');
    }
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onClickRQuizAnswer());
    this.element.parentNode.removeChild(this.element);
  };
}

module.exports = Review;

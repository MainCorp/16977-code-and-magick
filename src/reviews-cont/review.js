'use strict';

var templateElement = document.querySelector('template');
var elementToClone = templateElement.content.querySelector('.review');
var reviewRatingClass = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];

function Review(data, container) {
  this.data = data;
  this.container = container;
  this.element = elementToClone.cloneNode(true);
  var that = this;

  this.createReview = function() {
    this.element.querySelector('.review-text').textContent = data.description;
    var reviewRating = this.element.querySelector('.review-rating');
    reviewRating.style.display = 'block';

    reviewRating.classList.add(reviewRatingClass[data.rating - 2]);

    container.appendChild(this.element);

    var photoUser = new Image();
    var reviewAuthor = this.element.querySelector('.review-author');

    photoUser.onload = function() {
      photoUser.classList.add('review-author');
      photoUser.height = 124;
      photoUser.width = 124;
      photoUser.alt = 'Аватарка пользователя ' + data.author.name;
      photoUser.title = data.author.name;

      this.element.replaceChild(photoUser, reviewAuthor);
    };

    photoUser.onerror = function() {
      this.element.classList.add('review-load-failure');
    };

    photoUser.src = data.author.picture;
    return this.element;
  };

  this.element = this.createReview();

  this.onClickRQuizAnswer = function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      evt.preventDefault();
      evt.target.classList.add('review-quiz-answer-active');
    }
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onClickRQuizAnswer());
    container.removeChild(this.element);
  };

  this.element.addEventListener('click', function(evt) {
    that.onClickRQuizAnswer(evt);
  });
}

module.exports = Review;

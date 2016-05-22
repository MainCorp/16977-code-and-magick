'use strict';

var templateElement = document.querySelector('template');
var elementToClone = templateElement.content.querySelector('.review');
var reviewRatingClass = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];

function Review(data, container) {
  this.data = data;
  this.container = container;
  this.element = elementToClone.cloneNode(true);

  this.createReview = this.createReview.bind(this);
  this.onClickRQuizAnswer = this.onClickRQuizAnswer.bind(this);
  this.eventsClickAnswer = this.eventsClickAnswer.bind(this);
  this.remove = this.remove.bind(this);

  this.element = this.createReview();
}

Review.prototype.createReview = function() {
  var that = this;

  this.element.querySelector('.review-text').textContent = this.data.description;
  var reviewRating = this.element.querySelector('.review-rating');
  reviewRating.style.display = 'block';

  reviewRating.classList.add(reviewRatingClass[this.data.rating - 2]);

  this.container.appendChild(this.element);

  var photoUser = new Image();
  var reviewAuthor = this.element.querySelector('.review-author');

  photoUser.onload = function() {
    photoUser.classList.add('review-author');
    photoUser.height = 124;
    photoUser.width = 124;
    photoUser.alt = 'Аватарка пользователя ' + that.data.author.name;
    photoUser.title = that.data.author.name;

    that.element.replaceChild(photoUser, reviewAuthor);
  };

  photoUser.onerror = function() {
    that.element.classList.add('review-load-failure');
  };

  photoUser.src = this.data.author.picture;
  return this.element;
};

Review.prototype.onClickRQuizAnswer = function(evt) {
  if (evt.target.classList.contains('review-quiz-answer')) {
    evt.preventDefault();
    evt.target.classList.add('review-quiz-answer-active');
  }
};

Review.prototype.eventsClickAnswer = function() {
  var that = this;

  this.element.addEventListener('click', function(evt) {
    that.onClickRQuizAnswer(evt);
  });
};

Review.prototype.remove = function() {
  var that = this;

  this.element.removeEventListener('click', that.container.removeChild(that.element));
};

module.exports = Review;

'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var reviewName = document.querySelector('#review-name');
  var reviewText = document.querySelector('#review-text');
  var reviewRating = document.querySelectorAll('input[name="review-mark"]');
  var toolReviewName = document.querySelector('.review-fields-name');
  var toolReviewText = document.querySelector('.review-fields-text');
  var reviewSubmit = document.querySelector('.review-submit');
  var reviewFields = document.querySelector('.review-fields');
  var reviewForm = document.querySelector('.review-form');
  var rating = reviewForm['review-mark'];
  reviewSubmit.disabled = true;
  reviewName.required = true;

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var validationSendingResponse = function() {
    var validationToolName = reviewName.value.length > 0;
    var validationToolText = reviewText.value.length > 0;
    var validationRating = rating.value > 2;

    toolReviewName.classList.toggle('invisible', validationToolName);
    toolReviewText.classList.toggle('invisible', validationRating || validationToolText);
    reviewFields.classList.toggle('invisible', validationToolName && (validationToolText || validationRating));
    if (validationToolName && (validationRating || validationToolText)) {
      reviewSubmit.disabled = false;
    } else if (!validationToolText || !validationToolName) {
      reviewSubmit.disabled = true;
    }
  };

  for (var i = 0; i < reviewRating.length; i++) {
    reviewRating[i].onclick = function() {
      reviewText.required = this.value < 3;
      validationSendingResponse();
    };
  }

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    validationSendingResponse();
  };

  reviewName.oninput = validationSendingResponse;

  reviewText.oninput = validationSendingResponse;

})();

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
  var reviewFields = toolReviewName.parentNode;
  var reviewForm = document.querySelector('.review-form');
  reviewName.required = true;
  reviewText.required = true;
  reviewSubmit.disabled = true;


  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

/* Проверка формы на валидность */

  var validationSendingResponse = function() {
    var nameValid = reviewName.validity.valid;
    var textValid = reviewText.validity.valid;

    if (nameValid && textValid) {
      reviewFields.classList.add('invisible');
      reviewSubmit.disabled = false;
    } else if (!nameValid && textValid) {
      toolReviewName.hidden = false;
      toolReviewText.hidden = true;
      reviewSubmit.disabled = true;
    } else if (nameValid && !textValid) {
      toolReviewName.hidden = true;
      toolReviewText.hidden = false;
      reviewSubmit.disabled = true;
    } else if (!nameValid && !textValid) {
      toolReviewName.hidden = false;
      toolReviewText.hidden = false;
      reviewSubmit.disabled = true;
      reviewFields.classList.remove('invisible');
    }

  };

/* Если оценка формы меньше 3, то поле описания будет required */

  for (var i = 0; i < reviewRating.length; i++) {
    reviewRating[i].onclick = function() {
      if (this.value < 3) {
        reviewText.required = true;
        reviewSubmit.disabled = true;
        validationSendingResponse();
      } else {
        reviewText.required = false;
        reviewSubmit.disabled = false;
        validationSendingResponse();
      }
    };
  }

  reviewName.oninput = validationSendingResponse;

  reviewText.oninput = validationSendingResponse;

  /* Срок жизни куки */

  reviewForm.onsubmit = function(evt) {
    evt.preventDefault();
    var today = new Date();
    var lastBirthday = new Date(today.getFullYear(), 6, 4);
    var cookiesLife = new Date((+today - +lastBirthday) + +today);

  };

})();

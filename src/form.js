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

  /* Функция проверки на валидность */

  var validationSendingResponse = function() {
    var nameValid = reviewName.validity.valid;
    var textValid = reviewText.validity.valid;

    if (nameValid && textValid) {
      reviewFields.classList.add('invisible');
      reviewSubmit.disabled = false;
    } else if (!nameValid && textValid) {
      toolReviewName.classList.remove('invisible');
      toolReviewText.classList.add('invisible');
      reviewSubmit.disabled = true;
    } else if (nameValid && !textValid) {
      toolReviewName.classList.add('invisible');
      toolReviewText.classList.remove('invisible');
      reviewSubmit.disabled = true;
    } else if (!nameValid && !textValid) {
      toolReviewName.classList.remove('invisible');
      toolReviewText.classList.remove('invisible');
      reviewSubmit.disabled = true;
      reviewFields.classList.remove('invisible');
    }

  };

  /* Если выбрали оценку < 3 , то добавит required к отзыву */

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

  /* При нажатии на попап 'Добавить свой' */

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    reviewText.required = false;
    reviewSubmit.disabled = false;
    validationSendingResponse();
  };

  /* Проверка полей на валидность */

  reviewName.oninput = validationSendingResponse;

  reviewText.oninput = validationSendingResponse;

  /* Срок жизни куки */

  reviewSubmit.onsubmit = function(evt) {
    evt.preventDefault();
    var today = new Date();
    var lastBirthday = new Date(today.getFullYear(), 6, 4);
    var cookiesLife;
    if (lastBirthday < today) {
      cookiesLife = Math.floor((today - lastBirthday) / 24 / 60 / 60 / 1000);
    } else {
      lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
      cookiesLife = Math.floor((today - lastBirthday) / 24 / 60 / 60 / 1000);
    }
  };

})();

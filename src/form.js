'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formUserName = document.querySelector('.review-form-field-name');
  var formFieldsName = document.querySelector('.review-fields-name');
  var formUserText = document.querySelector('.review-form-field-text');
  var formFieldsText = document.querySelector('.review-fields-text');
  var formReviewMarkFirst = document.querySelector('.review-mark-label-1');
  var formReviewMarkSecond = document.querySelector('.review-mark-label-2');
  var formButton = document.querySelector('.review-submit');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  formUserName.oninput = function(evt) {
    evt.preventDefault();
    formFieldsName.classList.add('invisible');
  };

  formUserName.oninvalid = function(evt) {
    evt.preventDefault();
    formButton.setAttribute('disabled', '');
  };

  formUserText.oninput = function(evt) {
    evt.preventDefault();
    formFieldsText.classList.add('invisible');
  };

  formReviewMarkFirst.onclick = function() {
    formUserText.setAttribute('required', '');
  };

  formReviewMarkSecond.onclick = function() {
    formUserText.setAttribute('required', '');
  };

  formButton.onsubmit = function(evt) {
    evt.preventDefault();

    formButton.submit();
  };


})();

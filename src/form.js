'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formUserName = document.querySelector('#review-name');
  var formFieldsName = document.querySelector('.review-fields-name');
  var formUserText = document.querySelector('#review-text');
  var formFieldsText = document.querySelector('.review-fields-text');
  var formReviewMark_1 = document.querySelector('#review-mark-1');
  var formReviewMark_2 = document.querySelector('#review-mark-2');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  formUserName.oninput = function(event) {
    event.preventDefault();
    formFieldsName.classList.add('invisible');
  };
  formUserText.oninput = function(event) {
    event.preventDefault();
    formFieldsText.classList.add('invisible');
  };

  formReviewMark_1.onclick = function() {
    formUserText.setAttribute('required', '');
  };
  formReviewMark_2.onclick = function() {
    formUserText.setAttribute('required', '');
  };
})();

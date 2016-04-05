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

  formReviewMark_1.onclick = function(evt) {
    formUserText.setAttribute('required', '');
  };

  formReviewMark_2.onclick = function(evt) {
    formUserText.setAttribute('required', '');
  };

  formButton.onsubmit = function(evt) {
    evt.preventDefault();
    var dateToExpire = Date.now + 26092800000;
    document.cookie = 'name=' + 'test';

    formButton.submit();
  };


})();


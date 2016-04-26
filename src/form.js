'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var validationSendingResponse = function() {
    var formResponse = document.forms[1];
    var formResponseMarkCollection = formResponse.elements['review-mark'];
    var formResponseName = document.querySelector('.review-form-field-name');
    var formResponseText = document.querySelector('.review-form-field-text');
    var firstElMarkCollection = formResponseMarkCollection[0];
    var secondElMarkCollection = formResponseMarkCollection[1];
    var reviewName = document.querySelector('.review-fields-name');
    var reviewText = document.querySelector('.review-fields-text');

    formResponseName.setAttribute('required', '');

    firstElMarkCollection.onclick = function() {
      formResponseText.setAttribute('required', '');
    };

    secondElMarkCollection.onclick = function() {
      formResponseText.setAttribute('required', '');
    };

    formResponseName.oninput = function(evt) {
      evt.preventDefault();
      reviewName.classList.add('invisible');
    };

    formResponseText.oninput = function(evt) {
      evt.preventDefault();
      reviewText.classList.add('invisible');
    };
  };

  validationSendingResponse();

})();

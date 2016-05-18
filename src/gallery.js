'use strict';

function Gallery() {
  var galleryContainer = document.querySelector('.overlay-gallery');
  var galleryPreview = document.querySelector('.overlay-gallery-preview');
  var totalPreviews = galleryContainer.querySelector('.preview-number-total');
  var imgCollection = document.querySelectorAll('.photogallery-image > img');
  var previewNumber = galleryContainer.querySelector('.preview-number-current');
  var imgPrev = galleryContainer.querySelector('.overlay-gallery-control-left');
  var imgNext = galleryContainer.querySelector('.overlay-gallery-control-right');
  var btnCloseGallery = galleryContainer.querySelector('.overlay-gallery-close');
  var photoGallery = document.querySelector('.photogallery');
  var photos = [];
  var lengthArrayPhotos = photos.length;
  imgPrev.classList.toggle('invisible', true);

  var KEY_CODE_ESC = 27;

  var currentPhoto;
  var numberPhoto;

  var that = this;


  this._onCloseClick = function() {
    that._hideGallery();
  };

  this._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      that._hideGallery();
    }
  };

  this._showNextImage = function() {
    if (numberPhoto < lengthArrayPhotos - 1) {

      that._changePhoto(numberPhoto++ );
    }
  };

  this._showPrevImage = function() {
    if (numberPhoto > 0) {

      that._changePhoto(numberPhoto-- );
    }
  };

  this._changePhoto = function() {
    currentPhoto.src = photos[numberPhoto];

    imgPrev.classList.toggle('invisible', numberPhoto === 0);
    imgNext.classList.toggle('invisible', numberPhoto === lengthArrayPhotos - 1);

    previewNumber.textContent = numberPhoto + 1;
  };

  this._hideGallery = function() {
    galleryContainer.classList.add('invisible');
    btnCloseGallery.removeEventListener('click', that._onCloseClick);

    window.removeEventListener('keydown', that._onDocumentKeyDown);
  };

  this.getActivePhoto = function(param) {
    for (var i = 0; i < photos.length; i++) {
      if(photos[i] === param) {
        break;
      }
    }
    return i;
  };

  this.getPhotos = function(pct) {
    for (var i = 0; i < pct.length; i++) {
      photos[i] = pct[i].src;
    }
    lengthArrayPhotos = photos.length;

    totalPreviews.textContent = lengthArrayPhotos;
    currentPhoto = galleryPreview.appendChild(new Image());
  };
  this.getPhotos(imgCollection);

  this.showGallery = function() {
    galleryContainer.classList.remove('invisible');

    imgPrev.addEventListener('click', that._showPrevImage);
    imgNext.addEventListener('click', that._showNextImage);
    btnCloseGallery.addEventListener('click', that._onCloseClick);

    window.addEventListener('keydown', that._onDocumentKeyDown);

    that._changePhoto();
  };

  photoGallery.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
      numberPhoto = that.getActivePhoto(evt.target.src);
      that.showGallery();
    }
  });
}

module.exports = new Gallery();

'use strict';

function Gallery() {

  var galleryContainer = document.querySelector('.overlay-gallery');
  var galleryPreview = document.querySelector('.overlay-gallery-preview');
  var totalPreviews = galleryContainer.querySelector('.preview-number-total');
  var imgCollection = document.querySelectorAll('.photogallery-image > img');
  var previewNumber = galleryContainer.querySelector('.preview-number-current');
  var imgPrev = galleryContainer.querySelector('.overlay-gallery-control-left');
  var imgNext = galleryContainer.querySelector('.overlay-gallery-control-right');
  var photogallery = document.querySelector('.photogallery');
  var btnCloseGallery = galleryContainer.querySelector('.overlay-gallery-close');
  var photos = [];
  var lengthArrayPhotos = photos.length;

  var KEY_CODE_ESC = 27;

  var that = this;
  this.photos = [];

  this.getPhotos = function() {
    that.photos = Array.prototype.map.call(imgCollection, function(image, i) {
      image.dataset.id = i;
      return image.getAttribute('src');
    });

    lengthArrayPhotos = that.photos.length;

    totalPreviews.textContent = lengthArrayPhotos;
    that.currentPhoto = galleryPreview.appendChild(new Image());
  };

  this.showGallery = function(idPhoto) {
    that.numberPhoto = idPhoto;
    that.currentPhoto.src = that.photos[that.numberPhoto];
    previewNumber.textContent = that.numberPhoto + 1;
    galleryContainer.classList.remove('invisible');

    imgPrev.addEventListener('click', that.showPrevImage);
    imgNext.addEventListener('click', that.showNextImage);
    btnCloseGallery.addEventListener('click', that.onCloseClick);

    window.addEventListener('keydown', that.onDocumentKeyDown);

    this.changePhoto();
  };

  this.showPrevImage = function() {
    if (that.numberPhoto > 0) {

      that.changePhoto(that.numberPhoto-- );
    }
  };

  this.showNextImage = function() {
    if (that.numberPhoto < lengthArrayPhotos - 1) {

      that.changePhoto(that.numberPhoto++ );
    }
  };

  this.hideGallery = function() {
    galleryContainer.classList.add('invisible');

    imgPrev.removeEventListener('click', that.showPrevImage);
    imgNext.removeEventListener('click', that.showNextImage);
    btnCloseGallery.removeEventListener('click', that.onCloseClick);

    window.removeEventListener('keydown', that.onDocumentKeyDown);
  };

  this.onCloseClick = function() {
    that.hideGallery();
  };

  this.onDocumentKeyDown = function(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      that.hideGallery();
    }
  };

  this.changePhoto = function() {
    that.currentPhoto.src = that.photos[that.numberPhoto];
    previewNumber.textContent = that.numberPhoto + 1;

    imgPrev.classList.toggle('invisible', that.numberPhoto === 0);
    imgNext.classList.toggle('invisible', that.numberPhoto === lengthArrayPhotos - 1);
  };

  this.addClickHandler = function() {
    photogallery.addEventListener('click', function(evt) {
      if (evt.target.dataset.id) {
        evt.preventDefault();
        that.showGallery(parseInt(evt.target.dataset.id, 10));
      }
    });
  };


  this.getPhotos();

}

module.exports = new Gallery();

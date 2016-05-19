'use strict';

function Gallery() {
  this.galleryContainer = document.querySelector('.overlay-gallery');
  this.galleryPreview = document.querySelector('.overlay-gallery-preview');
  this.totalPreviews = this.galleryContainer.querySelector('.preview-number-total');
  this.imgCollection = document.querySelectorAll('.photogallery-image > img');
  this.previewNumber = this.galleryContainer.querySelector('.preview-number-current');
  this.imgPrev = this.galleryContainer.querySelector('.overlay-gallery-control-left');
  this.imgNext = this.galleryContainer.querySelector('.overlay-gallery-control-right');
  this.btnCloseGallery = this.galleryContainer.querySelector('.overlay-gallery-close');
  this.photoGallery = document.querySelector('.photogallery');
  this.photos = [];
  this.lengthArrayPhotos = this.photos.length;
  this.imgPrev.classList.toggle('invisible', true);

  this.KEY_CODE_ESC = 27;

  this.currentPhoto = 0;
  this.numberPhoto = 0;

  var that = this;


  this._onCloseClick = function() {
    this._hideGallery();
  };

  this._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === this.KEY_CODE_ESC) {
      this._hideGallery();
    }
  };

  this._showNextImage = function() {
    if (this.numberPhoto < this.lengthArrayPhotos - 1) {

      this._changePhoto(this.numberPhoto++ );
    }
  };

  this._showPrevImage = function() {
    if (this.numberPhoto > 0) {

      this._changePhoto(this.numberPhoto-- );
    }
  };

  this._changePhoto = function() {
    this.currentPhoto.src = this.photos[this.numberPhoto];

    this.imgPrev.classList.toggle('invisible', this.numberPhoto === 0);
    this.imgNext.classList.toggle('invisible', this.numberPhoto === this.lengthArrayPhotos - 1);

    this.previewNumber.textContent = this.numberPhoto + 1;
  };

  this._hideGallery = function() {
    this.galleryContainer.classList.add('invisible');

    window.removeEventListener('keydown', null);
  };

  this.getActivePhoto = function(param) {
    for (var i = 0; i < this.photos.length; i++) {
      if(this.photos[i] === param) {
        break;
      }
    }
    return i;
  };

  this.getPhotos = function(pct) {
    for (var i = 0; i < pct.length; i++) {
      this.photos[i] = pct[i].src;
    }
    this.lengthArrayPhotos = this.photos.length;

    this.totalPreviews.textContent = this.lengthArrayPhotos;
    this.currentPhoto = this.galleryPreview.appendChild(new Image());
  };
  this.getPhotos(this.imgCollection);

  this.showGallery = function() {
    this.galleryContainer.classList.remove('invisible');

    window.addEventListener('keydown', function(evt) {
      that._onDocumentKeyDown(evt);
    });

    this._changePhoto();
  };

  this.photoGallery.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
      that.numberPhoto = that.getActivePhoto(evt.target.src);
      that.showGallery();
    }
  });

  this.imgPrev.addEventListener('click', function() {
    that._showPrevImage();
  });
  this.imgNext.addEventListener('click', function() {
    that._showNextImage();
  });
  this.btnCloseGallery.addEventListener('click', function() {
    that._onCloseClick();
  });
}

module.exports = new Gallery();

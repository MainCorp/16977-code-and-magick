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
    that._hideGallery();
  };

  this._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === that.KEY_CODE_ESC) {
      that._hideGallery();
    }
  };

  this._showNextImage = function() {
    if (that.numberPhoto < that.lengthArrayPhotos - 1) {

      that._changePhoto(that.numberPhoto++ );
    }
  };

  this._showPrevImage = function() {
    if (that.numberPhoto > 0) {

      that._changePhoto(that.numberPhoto-- );
    }
  };

  this._changePhoto = function() {
    that.currentPhoto.src = that.photos[that.numberPhoto];

    that.imgPrev.classList.toggle('invisible', that.numberPhoto === 0);
    that.imgNext.classList.toggle('invisible', that.numberPhoto === that.lengthArrayPhotos - 1);

    that.previewNumber.textContent = that.numberPhoto + 1;
  };

  this._hideGallery = function() {
    that.galleryContainer.classList.add('invisible');

    window.removeEventListener('keydown', null);
  };

  this.getActivePhoto = function(param) {
    for (var i = 0; i < that.photos.length; i++) {
      if(that.photos[i] === param) {
        break;
      }
    }
    return i;
  };

  this.getPhotos = function(pct) {
    for (var i = 0; i < pct.length; i++) {
      that.photos[i] = pct[i].src;
    }
    that.lengthArrayPhotos = that.photos.length;

    that.totalPreviews.textContent = that.lengthArrayPhotos;
    that.currentPhoto = this.galleryPreview.appendChild(new Image());
  };
  this.getPhotos(this.imgCollection);

  this.showGallery = function() {
    that.galleryContainer.classList.remove('invisible');

    that.imgPrev.addEventListener('click', function() {
      that._showPrevImage();
    });
    that.imgNext.addEventListener('click', function() {
      that._showNextImage();
    });
    that.btnCloseGallery.addEventListener('click', function() {
      that._onCloseClick();
    });

    window.addEventListener('keydown', function(evt) {
      that._onDocumentKeyDown(evt);
    });

    that._changePhoto();
  };

  this.photoGallery.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
      that.numberPhoto = that.getActivePhoto(evt.target.src);
      that.showGallery();
    }
  });
}

module.exports = new Gallery();

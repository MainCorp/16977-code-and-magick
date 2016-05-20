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
  this.hashPhotoValidate = /#photo\/(\S+)/;

  this.createPhotoUrl = function(url) {
    return '#photo/' + url;
  };

  this._onCloseClick = function() {
    that._hideGallery();
  };

  this._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === this.KEY_CODE_ESC) {
      that._hideGallery();
    }
  };

  this._showNextImage = function() {
    if (this.numberPhoto < this.lengthArrayPhotos - 1) {
      that.savePhoto(that.photos[that.numberPhoto + 1]);
    }
  };

  this._showPrevImage = function() {
    if (this.numberPhoto > 0) {
      that.savePhoto(that.photos[that.numberPhoto - 1]);
    }
  };

  this._changePhoto = function() {
    this.currentPhoto.src = this.photos[that.numberPhoto];

    this.imgPrev.classList.toggle('invisible', this.numberPhoto === 0);
    this.imgNext.classList.toggle('invisible', this.numberPhoto === this.lengthArrayPhotos - 1);

    this.previewNumber.textContent = this.numberPhoto + 1;
  };

  this._hideGallery = function() {
    this.galleryContainer.classList.add('invisible');

    window.removeEventListener('keydown', null);
  };

  this.savePhoto = function(photoUrl) {
    var newUrl;

    if (photoUrl) {
      newUrl = that.createPhotoUrl(photoUrl);
    } else {
      newUrl = window.location.pathname;
      that._hideGallery();
    }

    history.pushState('', document.title, newUrl);
    window.dispatchEvent(new Event('hashchange'));
  };

  this.getPhotos = function(pct) {
    for (var i = 0; i < pct.length; i++) {
      this.photos[i] = pct[i].getAttribute('src');
    }
    this.lengthArrayPhotos = this.photos.length;

    this.totalPreviews.textContent = this.lengthArrayPhotos;
    this.currentPhoto = this.galleryPreview.appendChild(new Image());
  };
  this.getPhotos(this.imgCollection);

  this.showGallery = function(idPhoto) {
    that.numberPhoto = idPhoto;
    this.galleryContainer.classList.remove('invisible');

    that.imgPrev.addEventListener('click', that.showPrevImage);
    that.imgNext.addEventListener('click', that.showNextImage);

    window.addEventListener('keydown', function(evt) {
      that._onDocumentKeyDown(evt);
    });

    this._changePhoto();
  };

  this.photoGallery.addEventListener('click', function(evt) {
    if (evt.target.tagName === 'IMG') {
      evt.preventDefault();
      that.savePhoto(evt.target.getAttribute('src'));
    }
  });

  this.hashCheck = function() {
    var matches = that.hashPhotoValidate.exec(location.hash);

    if (matches) {
      var photoNumber = that.photos.indexOf(matches[1]);
    }
    if (photoNumber >= 0) {
      that.showGallery(photoNumber);
    } else {
      that._hideGallery();
    }
  };

  this.imgPrev.addEventListener('click', function() {
    that._showPrevImage();
  });
  this.imgNext.addEventListener('click', function() {
    that._showNextImage();
  });
  this.btnCloseGallery.addEventListener('click', function() {
    that._onCloseClick();
  });

  this.hashCheck();
  window.addEventListener('hashchange', this.hashCheck);
}

module.exports = new Gallery();

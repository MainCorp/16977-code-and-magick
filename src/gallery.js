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

  this.showPrevImage = this.showPrevImage.bind(this);
  this.showNextImage = this.showNextImage.bind(this);
  this.onCloseClick = this.onCloseClick.bind(this);
  this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);

  this.getPhotos(this.imgCollection);
  this.hashCheck();
  window.addEventListener('hashchange', this.hashCheck);

  this.photoGallery.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
      this.numberPhoto = this.getActivePhoto(evt.target.src);
      this.showGallery();
    }
  });

  this.imgPrev.addEventListener('click', function() {
    this._showPrevImage();
  });
  this.imgNext.addEventListener('click', function() {
    this._showNextImage();
  });
  this.btnCloseGallery.addEventListener('click', function() {
    this._onCloseClick();
  });
}

Gallery.prototype.hashPhotoValidate = /#photo\/(\S+)/;

Gallery.prototype.createPhotoUrl = function(url) {
  return '#photo/' + url;
};


Gallery.prototype._onCloseClick = function() {
  this._hideGallery();
};

Gallery.prototype._onDocumentKeyDown = function(evt) {
  if (evt.keyCode === this.KEY_CODE_ESC) {
    this._hideGallery();
  }
};

Gallery.prototype._showNextImage = function() {
  if (this.numberPhoto < this.lengthArrayPhotos - 1) {

    this._changePhoto(this.numberPhoto++ );
    this.savePhoto(this.photos[this.numberPhoto + 1]);
  }
};

Gallery.prototype._showPrevImage = function() {
  if (this.numberPhoto > 0) {

    this._changePhoto(this.numberPhoto-- );
    this.savePhoto(this.photos[this.numberPhoto - 1]);
  }
};

Gallery.prototype._changePhoto = function() {
  this.currentPhoto.src = this.photos[this.numberPhoto];

  this.imgPrev.classList.toggle('invisible', this.numberPhoto === 0);
  this.imgNext.classList.toggle('invisible', this.numberPhoto === this.lengthArrayPhotos - 1);

  this.previewNumber.textContent = this.numberPhoto + 1;
};

Gallery.prototype._hideGallery = function() {
  this.galleryContainer.classList.add('invisible');

  window.removeEventListener('keydown', null);
};

Gallery.prototype.savePhoto = function(photoUrl) {
  var newUrl;
  if (photoUrl) {
    newUrl = this.createPhotoUrl(photoUrl);
  } else {
    newUrl = window.location.pathname;
    this.hideGallery();
  }

  history.pushState('', document.title, newUrl);
  window.dispatchEvent(new Event('hashchange'));
};

Gallery.prototype.getActivePhoto = function(param) {
  for (var i = 0; i < this.photos.length; i++) {
    if(this.photos[i] === param) {
      break;
    }
  }
  return i;
};

Gallery.prototype.getPhotos = function(pct) {
  for (var i = 0; i < pct.length; i++) {
    this.photos[i] = pct[i].src;
  }
  this.lengthArrayPhotos = this.photos.length;

  this.totalPreviews.textContent = this.lengthArrayPhotos;
  this.currentPhoto = this.galleryPreview.appendChild(new Image());
};

Gallery.prototype.showGallery = function() {
  this.galleryContainer.classList.remove('invisible');

  window.addEventListener('keydown', function(evt) {
    this._onDocumentKeyDown(evt);
  });

  this._changePhoto();
};

Gallery.prototype.hashCheck = function() {
  var matches = this.hashPhotoValidate.exec(location.hash);

  if (matches) {
    var photoNumber = this.photos.indexOf(matches[1]);
  }
  if (photoNumber >= 0) {
    this.showGallery(photoNumber);
  } else {
    this.hideGallery();
  }
};

module.exports = new Gallery();

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
  this.hashPhotoValidate = /#photo\/(\S+)/;

  this.KEY_CODE_ESC = 27;

  this.currentPhoto = 0;
  this.numberPhoto = 0;

  this.createPhotoUrl = this.createPhotoUrl.bind(this);
  this.changesOnClose = this.changesOnClose.bind(this);
  this.onCloseClick = this.onCloseClick.bind(this);
  this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.changePhoto = this.changePhoto.bind(this);
  this.hideGallery = this.hideGallery.bind(this);
  this.savePhoto = this.savePhoto.bind(this);
  this.getPhotos = this.getPhotos.bind(this);
  this.showGallery = this.showGallery.bind(this);
  this.hashCheck = this.hashCheck.bind(this);
  this.eventsClick = this.eventsClick.bind(this);

  this.getPhotos(this.imgCollection);
  this.eventsClick();
  this.hashCheck();
  window.addEventListener('hashchange', this.hashCheck.bind(this));
}

Gallery.prototype.createPhotoUrl = function(url) {
  return '#photo/' + url;
};

Gallery.prototype.changesOnClose = function() {
  this.hideGallery();
  history.replaceState(null, null, '/');
};

Gallery.prototype.onCloseClick = function() {
  this.changesOnClose();
};

Gallery.prototype.onDocumentKeyDown = function(evt) {
  if (evt.keyCode === this.KEY_CODE_ESC) {
    this.changesOnClose();
  }
};

Gallery.prototype.showNextImage = function() {
  if (this.numberPhoto < this.lengthArrayPhotos - 1) {
    this.savePhoto(this.photos[this.numberPhoto + 1]);
  }
};

Gallery.prototype.showPrevImage = function() {
  if (this.numberPhoto > 0) {
    this.savePhoto(this.photos[this.numberPhoto - 1]);
  }
};

Gallery.prototype.changePhoto = function() {
  this.currentPhoto.src = this.photos[this.numberPhoto];

  this.imgPrev.classList.toggle('invisible', this.numberPhoto === 0);
  this.imgNext.classList.toggle('invisible', this.numberPhoto === this.lengthArrayPhotos - 1);

  this.previewNumber.textContent = this.numberPhoto + 1;
};

Gallery.prototype.hideGallery = function() {
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

Gallery.prototype.getPhotos = function(pct) {
  for (var i = 0; i < pct.length; i++) {
    this.photos[i] = pct[i].getAttribute('src');
  }
  this.lengthArrayPhotos = this.photos.length;

  this.totalPreviews.textContent = this.lengthArrayPhotos;
  this.currentPhoto = this.galleryPreview.appendChild(new Image());
};

Gallery.prototype.showGallery = function(idPhoto) {
  this.numberPhoto = idPhoto;
  this.galleryContainer.classList.remove('invisible');

  this.imgPrev.addEventListener('click', this.showPrevImage);
  this.imgNext.addEventListener('click', this.showNextImage);

  window.addEventListener('keydown', function(evt) {
    this.onDocumentKeyDown(evt);
  });

  this.changePhoto();
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

Gallery.prototype.eventsClick = function() {
  var that = this;

  this.imgPrev.addEventListener('click', function() {
    that.showPrevImage();
  });

  this.imgNext.addEventListener('click', function() {
    that.showNextImage();
  });

  this.btnCloseGallery.addEventListener('click', function() {
    that.onCloseClick();
  });

  this.photoGallery.addEventListener('click', function(evt) {
    if (evt.target.tagName === 'IMG') {
      evt.preventDefault();
      that.savePhoto(evt.target.getAttribute('src'));
    }
  });

};

module.exports = new Gallery();

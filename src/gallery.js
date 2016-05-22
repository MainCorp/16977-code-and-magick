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

  this.showPrevImage = this.hashPhotoValidate.bind(this);
  this.showPrevImage = this.createPhotoUrl.bind(this);
  this.showPrevImage = this.changesOnClose.bind(this);
  this.showPrevImage = this.onCloseClick.bind(this);
  this.showPrevImage = this.onDocumentKeyDown.bind(this);
  this.showPrevImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.showPrevImage = this.changePhoto.bind(this);
  this.showPrevImage = this.hideGallery.bind(this);
  this.showPrevImage = this.savePhoto.bind(this);
  this.showPrevImage = this.getPhotos.bind(this);
  this.showPrevImage = this.showGallery.bind(this);
  this.showPrevImage = this.hashCheck.bind(this);

  this.getPhotos(this.imgCollection);
  this.hashCheck();
  window.addEventListener('hashchange', this.hashCheck.bind(this));
}

Gallery.prototype.hashPhotoValidate = /#photo\/(\S+)/;

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

Gallery.prototype.imgPrev.addEventListener('click', function() {
  this.showPrevImage();
});
Gallery.prototype.imgNext.addEventListener('click', function() {
  this.showNextImage();
});
Gallery.prototype.btnCloseGallery.addEventListener('click', function() {
  this.onCloseClick();
});

Gallery.prototype.photoGallery.addEventListener('click', function(evt) {
  if (evt.target.tagName === 'IMG') {
    evt.preventDefault();
    this.savePhoto(evt.target.getAttribute('src'));
  }
});

module.exports = new Gallery();

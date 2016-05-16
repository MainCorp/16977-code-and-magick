'use strict';

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


function _onCloseClick() {
  _hideGallery();
}

function _onDocumentKeyDown(evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    _hideGallery();
  }
}

function _showNextImage() {
  if (numberPhoto < lengthArrayPhotos - 1) {

    _changePhoto(numberPhoto++ );
  }
}

function _showPrevImage() {
  if (numberPhoto > 0) {

    _changePhoto(numberPhoto-- );
  }
}

function _changePhoto() {
  currentPhoto.src = photos[numberPhoto];

  imgPrev.classList.toggle('invisible', numberPhoto === 0);
  imgNext.classList.toggle('invisible', numberPhoto === lengthArrayPhotos - 1);

  previewNumber.textContent = numberPhoto + 1;
}

function _hideGallery() {
  galleryContainer.classList.add('invisible');
  btnCloseGallery.removeEventListener('click', _onCloseClick);

  window.removeEventListener('keydown', _onDocumentKeyDown);
}

function getActivePhoto(param) {
  for (var i = 0; i < photos.length; i++) {
    if(photos[i] === param) {
      break;
    }
  }
  return i;
}

getPhotos(imgCollection);
function getPhotos(pct) {
  for (var i = 0; i < pct.length; i++) {
    photos[i] = pct[i].src;
  }
  lengthArrayPhotos = photos.length;

  totalPreviews.textContent = lengthArrayPhotos;
  currentPhoto = galleryPreview.appendChild(new Image());
}

function showGallery() {
  galleryContainer.classList.remove('invisible');

  imgPrev.addEventListener('click', _showPrevImage);
  imgNext.addEventListener('click', _showNextImage);
  btnCloseGallery.addEventListener('click', _onCloseClick);

  window.addEventListener('keydown', _onDocumentKeyDown);

  _changePhoto();
}

photoGallery.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    numberPhoto = getActivePhoto(evt.target.src);
    showGallery();
  }
});

module.exports.showGallery = showGallery;

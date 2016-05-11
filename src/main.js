require('./form');
require('./game');
require('./reviews-cont/reviews');
var gallery = require('./gallery');

var photoGallery = document.querySelector('.photogallery');
var idPhoto;
gallery.getPhotos();

photoGallery.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    idPhoto = parseInt(evt.target.dataset.id, 10);
    gallery.showGallery(idPhoto);
  }
});

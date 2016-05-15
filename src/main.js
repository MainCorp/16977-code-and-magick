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
    idPhoto = gallery.returnSerialNumber(photos.src);
    gallery.showGallery(idPhoto);
  }
  console.log(returnSerialNumber(photos.src));
});

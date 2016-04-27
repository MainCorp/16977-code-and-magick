var filtersContainer = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone = templateElement.content.querySelector('.review');

var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

var getReviewsElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent =	data.description;
  container.appendChild(element);

  var photoUser = new Image();
  var reviewAuthor =	element.querySelector('.review-author');

  photoUser.onload = function(evt) {
    reviewAuthor.style.backgroundImage = 'url(\'' + evt.target.src + '\')';
    reviewAuthor.style.height = '124px';
    reviewAuthor.style.width = '124px';
  };

  photoUser.onerror = function() {
    element.classList.add('review-load-failure');
  };

  photoUser.src = data.author.picture;

  return element;
};

var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    try {
      var loadedData = JSON.parse(evt.target.response);
    } catch (err) {
      console.log('Ошибка соединения с сервером');
    }

    callback(loadedData);
  };

  xhr.onerror = function() {
    elementToClone.classList.add('reviews-load-failure');
  };
  xhr.timeout = 15000;
  xhr.ontimeout = function() {
    elementToClone.classList.add('reviews-load-failure');
  };

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};

var renderReviews = function(reviews) {
  reviewsContainer.innerHTML = '';

  reviews.forEach(function(review) {
    getReviewsElement(review, reviewsContainer);
  });
};

var getFilteredReviews = function(reviews, filter) {
  var reviewsToFilter = reviews.slice(0);

  switch (filter) {
    case 'reviews-all':
      break;
    case 'reviews-recent':
      reviewsToFilter.sort(function(a, b) {
        return (new Date(b.date) - new Date(a.date));
      });
      break;
    case 'reviews-good':
      reviewsToFilter.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case 'reviews-bad':
      reviewsToFilter.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case 'reviews-popular':
      reviewsToFilter.sort(function(a, b) {
        return a.review_usefulness - b.review_usefulness;
      });
      break;
  }

  return reviewsToFilter;
};

var includeFilter = function(filter) {
  var filteredReviews = getFilteredReviews(reviews, filter);
  renderReviews(filteredReviews);
};

var includeFiltration = function() {
  var filters = filtersContainer.querySelectorAll('.reviews-filter-item');
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function() {
      includeFilter(this.id);
    };
  }
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  includeFiltration(true);
  includeFilter('reviews-all');
});

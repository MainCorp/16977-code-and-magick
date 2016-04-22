var reviewsContainer = document.querySelector('.reviews-list');
var templateEl = document.querySelector('template');
var reviewsContent = document.querySelector('.reviews');
var elementClone = templateEl.content.querySelector('.review');

/** @const {number} */

var REVIEWS_URL = '//o0.github.io/assets/json/reviews.json';

var getReviewElement = function(data, container) {
	var element = elementClone.cloneNode(true);
	element.querySelector('.review-text').textContent = data.description;
	container.appendChild(element);

	var authorPicture = new Image();

	authorPicture.onload = function(evt) {
		element.style.authorPicture = 'url(\'' + evt.target.src + '\')';
	};

	authorPicture.onerror = function() {
		element.classList.add('review-load-failure');
	};

	authorPicture.src = '/' + data.author.picture;

	return element;
};

var getReviews = function(callback) {
	var xhr = new XMLHttpRequest();
	var contentLoader = function() {
		xhr.onerror = function() {
			reviewsContent.classList.add('reviews-load-failure');
		};
		xhr.timeout = 15000;
		xhr.ontimeout = function() {
			reviewsContent.classList.add('reviews-load-failure');
		};
	};
	xhr.onload = function(evt) {
		var requestObj = evt.target;
		try {
			var loadedData = JSON.parse(requestObj.response);
		} catch (err) {
			console.log("Ошибка при соединении");
		}
		callback(loadedData);
	};
	contentLoader();
	xhr.open('GET', REVIEWS_URL);
	xhr.onreadystatechange = function() {
		if(xhr.status !== 200) {
			reviewsContent.classList.add('reviews-list-loading');
		}
	};
	xhr.send();
};

/** @param {Array.<Object>} reviews */
var renderReviews = function(reviews) {
	reviews.forEach(function(review) {
		getReviewElement(review, reviewsContainer);
	});
};

getReviews(function(loadedReviews) {
	reviews = loadedReviews;
	renderReviews(reviews);
});

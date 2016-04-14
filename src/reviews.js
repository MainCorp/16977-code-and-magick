var reviewsContainer = document.querySelector('.reviews-list');
var templateEl = document.querySelector('template');
var elementClone;
var reviewsContent = document.querySelector('.reviews');

/** @const {number} */

var REVIEWS_URL = '//o0.github.io/assets/json/reviews.json';

if ('content' in templateEl) {
	elementClone = templateEl.content.querySelector('.review');
} else {
	elementClone = templateEl.querySelector('.review');
}

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

	xhr.onload = function(evt) {
		var requestObj = evt.target;
		var loadedData = JSON.parse(requestObj.response);
		callback(loadedData);
	};
	xhr.onerror = function() {
		reviewsContent.classList.add('reviews-load-failure');
	};
	xhr.timeout = 15000;
	xhr.ontimeout = function() {
		reviewsContent.classList.add('reviews-load-failure');
	};

	xhr.open('GET', REVIEWS_URL);
	xhr.onreadystatechange = function() {
		if(xhr.status != 200) {
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

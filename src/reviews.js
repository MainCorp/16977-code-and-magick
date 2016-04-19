'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var templateEl = document.querySelector('template');
var elementClone;

if ('content' in templateEl) {
	elementClone = templateEl.content.querySelector('.review');
} else {
	elementClone = templateEl.querySelector('.review');
}

var createReviewElement = function(data, container) {
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

window.reviews.forEach(function(review) {
	createReviewElement(review, reviewsContainer);
});

'use strict';
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone = templateElement.content.querySelector('.review');


var receiveReviewsElement = function(data, container) {
	var element = elementToClone.cloneNode(true);
	element.querySelector('.review-text').textContent = data.description;
	container.appendChild(element);

	var photoUser = new Image();
	var reviewAuthor = element.querySelector('.review-author');

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

window.reviews.forEach(function(review) {
	receiveReviewsElement(review, reviewsContainer);
});

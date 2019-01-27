// animate.css -http://daneden.me/animate
// Version - 3.7.0
// Licensed under the MIT license - http://opensource.org/licenses/MIT
// Copyright (c) 2018 Daniel Eden
// -----------------------------------------------------------------------------

export function animateCSS(element, animationName, callback) {
	const node = (typeof element === 'object') ? element : document.querySelector(element);
	node.classList.add('animated', animationName);

	function handleAnimationEnd() {
			node.classList.remove('animated', animationName);
			node.removeEventListener('animationend', handleAnimationEnd);

			if (typeof callback === 'function') callback();
	}

	node.addEventListener('animationend', handleAnimationEnd);
}
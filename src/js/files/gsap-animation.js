gsap.registerPlugin(ScrollTrigger)

if (document.querySelector('.skip-button')) {
	gsap.from('.skip-button', {
		scrollTrigger: {
			trigger: '.celebrities__container ',
			// markers: true,
		},
		x: 100,
		opacity: 0,
		duration: 1,
		delay: 1
	});
}
export function main() {
	initSwiper();
	initHoverNewsCard();
	initPauseButton();
	openAllAccordionItems();

	Fancybox.bind('[data-fancybox]', {
		Toolbar: false,
		Thumbs: {
			type: 'classic'
		},
	});


	// Mobile Menu
	const iconMenu = document.querySelector('.menu-button');
	const menuBody = document.querySelector('.sidebar-menu');

	if (iconMenu) {
		iconMenu.addEventListener('click', function (e) {
			iconMenu.classList.toggle('active');
			menuBody.classList.toggle('active');

			if (iconMenu.classList.contains('active')) {
				iconMenu.textContent = 'close';
			} else {
				iconMenu.textContent = 'menu';
			}
		});
	}

	function initSwiper() {

		let swiperAwards = new Swiper('.slider-awards', {
			mousewheel: true,
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			navigation: {
				nextEl: '.slider-awards__nav .swiper-button-next',
				prevEl: '.slider-awards__nav .swiper-button-prev',
			},
		})
		let swiperSenses = new Swiper('.slider-senses', {
			mousewheel: true,
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			navigation: {
				nextEl: '.slider-senses__nav .swiper-button-next',
				prevEl: '.slider-senses__nav .swiper-button-prev',
			},
			breakpoints: {
				1280: {
					spaceBetween: 48
				}
			}
		})
		let swiperVisit = new Swiper('.slider-visit', {
			enabled: false,
			mousewheel: true,
			breakpoints: {
				1280: {
					enabled: true,
					slidesPerView: 'auto',
					spaceBetween: 48,
					loop: false,
					scrollbar: {
						el: '.swiper-scrollbar',
						draggable: true,
					},
					navigation: {
						nextEl: '.slider-visit__nav .swiper-button-next',
						prevEl: '.slider-visit__nav .swiper-button-prev',
					},
				},

			}
		})
		let swiperHashtag = new Swiper('.slider-hashtag', {
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: true,
			speed: 3500,
			autoplay: {
				delay: 300,
				disableOnInteraction: false
			},
			// freeMode: true,
			// allowTouchMove: false,
			breakpoints: {
				1280: {
					spaceBetween: 24
				}
			}
		})
		let swiperSelArticles = new Swiper('.slider-sel-articles', {
			mousewheel: true,
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			navigation: {
				nextEl: '.slider-sel-articles__nav .swiper-button-next',
				prevEl: '.slider-sel-articles__nav .swiper-button-prev',
			},
			breakpoints: {
				1280: {
					spaceBetween: 24,
				},
			}
		})

		function checkScreenWidth() {
			if (window.innerWidth <= 1279) {
				swiperVisit.destroy(true, true);
			}
		}

		checkScreenWidth();

		window.addEventListener('resize', checkScreenWidth);

	}

	let acc = document.getElementsByClassName('accordion__title');
	let accClose = document.getElementsByClassName('accordion__close');

	function toggleAccordion() {
		let isCloseButton = this.classList.contains('accordion__close');
		let accordionContent = isCloseButton ?
				this.previousElementSibling.querySelector('.accordion__content') :
				this.nextElementSibling;
		let isOpen = accordionContent.style.maxHeight;
		let accordionWrapper = this.closest('.accordion__wrapper');
		let isShowAllMode = accordionWrapper.closest('.accordion').classList.contains('accordion-show-all');
		if (!isOpen && !isShowAllMode) {
			let allAccContentInSameContainer = accordionWrapper.closest('.accordion').querySelectorAll('.accordion__content');
			allAccContentInSameContainer.forEach(content => {
				if (content !== accordionContent) {
					content.previousElementSibling.classList.remove('active');
					content.style.maxHeight = null;
					content.closest('.accordion__wrapper').classList.remove('accordion-active');
				}
			});
		}

		if (isOpen) {
			this.classList.remove('active');
			accordionContent.style.maxHeight = null;
			accordionWrapper.classList.remove('accordion-active');
		} else {
			this.classList.add('active');
			accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
			accordionWrapper.classList.add('accordion-active');
		}
	}

	for (let i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', toggleAccordion);
	}
	for (let i = 0; i < accClose.length; i++) {
		accClose[i].addEventListener('click', toggleAccordion);
	}

	function openAllAccordionItems() {
		let allAccordions = document.querySelectorAll('.accordion.accordion-show-all');
		allAccordions.forEach(function (accordion) {
			let allContents = accordion.querySelectorAll('.accordion__content');
			allContents.forEach(content => {
				let title = content.previousElementSibling;
				title.classList.add('active');
				content.style.maxHeight = content.scrollHeight + 'px';
				content.closest('.accordion__wrapper').classList.add('accordion-active');
			});
		});
	}

	let accordionSidebar = document.querySelector('.sidebar-menu .accordion__wrapper');
	let windowWidth = window.innerWidth;
	if (windowWidth >= 1280) {
		// sideBarAccordion closing on page scroll
		let isCursorOnSidebar = false;

		document.querySelector('.sidebar-menu').addEventListener('mouseenter', () => {
			isCursorOnSidebar = true;
		});
		document.querySelector('.sidebar-menu').addEventListener('mouseleave', () => {
			isCursorOnSidebar = false;
		});

		window.addEventListener('scroll', () => {
			if (!isCursorOnSidebar && accordionSidebar.classList.contains('accordion-active')) {
				closeSidebarAccordion();
			}
		});
	}

	function closeSidebarAccordion() {
		let accordionTitle = accordionSidebar.querySelector('.accordion__title');
		let accordionContent = accordionSidebar.querySelector('.accordion__content');

		accordionTitle.classList.remove('active');
		accordionContent.style.maxHeight = null;
		accordionSidebar.classList.remove('accordion-active');

		accordionTitle.classList.add('_icon-PlusCircle');
		accordionTitle.classList.remove('_icon-MinusCircle');
	}

	function initHoverNewsCard() {
		let windowWidth = window.innerWidth;
		if (windowWidth >= 1280) {
			document.querySelectorAll('.slide-sel-articles').forEach(item => {
				item.addEventListener('mouseover', function () {
					this.querySelector('.slide-sel-articles__text-holder-js').style.maxHeight = '126px';
				});

				item.addEventListener('mouseout', function () {
					this.querySelector('.slide-sel-articles__text-holder-js').style.maxHeight = '63px';
				});
			});
		}
	}

	function initPauseButton() {
		const pauseButtons = document.querySelectorAll('.pause-btn');
		pauseButtons.forEach(button => {
			button.addEventListener('click', function () {
				const video = this.closest('.video-holder').querySelector('video');
				if (video.paused) {
					video.play();
					this.classList.remove('_icon-Play');
					this.classList.add('_icon-Pause');
				} else {
					video.pause();
					this.classList.remove('_icon-Pause');
					this.classList.add('_icon-Play');
				}
			});
		});
	}


}
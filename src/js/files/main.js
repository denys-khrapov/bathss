export function main() {
	if (
			document.querySelector('.slider-awards') ||
			document.querySelector('.slider-senses') ||
			document.querySelector('.slider-hashtag') ||
			document.querySelector('.slider-logos') ||
			document.querySelector('.slider-sel-articles') ||
			document.querySelector('.slider-image-accordion')
	) {
		initSwiper();
	}

	if (document.querySelector('.slider-visit')) {
		checkScreenWidth();
		window.addEventListener('resize', checkScreenWidth);
	}

	initHoverNewsCard();
	initHoverNewsCards();
	initPauseButton();
	openAllAccordionItems();
	hoverLastChildimageAcc();
	showTooltip();
	changeGender();
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
		let swiperLogos = new Swiper('.slider-logos', {
			mousewheel: true,
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			navigation: {
				nextEl: '.slider-logos__nav .swiper-button-next',
				prevEl: '.slider-logos__nav .swiper-button-prev',
			},
			breakpoints: {
				1280: {
					spaceBetween: 24,
				},
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


	}

	function checkScreenWidth() {
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
		if (window.innerWidth <= 1279) {
			swiperVisit.destroy(true, true);
		}
	}


	let acc = document.getElementsByClassName('accordion__title');
	let accClose = document.getElementsByClassName('accordion__close');
	function toggleAccordion() {
		let isCloseButton = this.classList.contains('accordion__close');
		let accordionContent;
		let targetTitle;

		if (isCloseButton) {
			accordionContent = this.previousElementSibling.querySelector('.accordion__content');
			targetTitle = this.previousElementSibling.querySelector('.accordion__title');
		} else {
			accordionContent = this.nextElementSibling;
			targetTitle = this;
		}

		let isOpen = accordionContent.style.maxHeight;
		let accordionWrapper = this.closest('.accordion__wrapper');
		let isShowAllMode = accordionWrapper.closest('.accordion').classList.contains('accordion-show-all');

		if (!isOpen && !isShowAllMode) {
			let allAccContentInSameContainer = accordionWrapper.closest('.accordion').querySelectorAll('.accordion__content');
			allAccContentInSameContainer.forEach(content => {
				content.previousElementSibling.classList.remove('active');
				content.style.maxHeight = null;
				content.closest('.accordion__wrapper').classList.remove('accordion-active');
			});
		}

		if (isOpen) {
			targetTitle.classList.remove('active');
			accordionContent.style.maxHeight = null;
			accordionWrapper.classList.remove('accordion-active');
		} else {
			targetTitle.classList.add('active');
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
	// function toggleAccordion() {
	// 	let isCloseButton = this.classList.contains('accordion__close');
	// 	let accordionContent = isCloseButton ?
	// 			this.previousElementSibling.querySelector('.accordion__content') :
	// 			this.nextElementSibling;
	// 	let isOpen = accordionContent.style.maxHeight;
	// 	let accordionWrapper = this.closest('.accordion__wrapper');
	// 	let isShowAllMode = accordionWrapper.closest('.accordion').classList.contains('accordion-show-all');
	// 	if (!isOpen && !isShowAllMode) {
	// 		let allAccContentInSameContainer = accordionWrapper.closest('.accordion').querySelectorAll('.accordion__content');
	// 		allAccContentInSameContainer.forEach(content => {
	// 			if (content !== accordionContent) {
	// 				content.previousElementSibling.classList.remove('active');
	// 				content.style.maxHeight = null;
	// 				content.closest('.accordion__wrapper').classList.remove('accordion-active');
	// 			}
	// 		});
	// 	}
	//
	// 	if (isOpen) {
	// 		this.classList.remove('active');
	// 		accordionContent.style.maxHeight = null;
	// 		accordionWrapper.classList.remove('accordion-active');
	// 	} else {
	// 		this.classList.add('active');
	// 		accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
	// 		accordionWrapper.classList.add('accordion-active');
	// 	}
	// }
	//
	// for (let i = 0; i < acc.length; i++) {
	// 	acc[i].addEventListener('click', toggleAccordion);
	// }
	// for (let i = 0; i < accClose.length; i++) {
	// 	accClose[i].addEventListener('click', toggleAccordion);
	// }

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

	function initHoverNewsCards() {
		let windowWidth = window.innerWidth;
		if (windowWidth >= 1280) {
			document.querySelectorAll('.card-blog').forEach(item => {
				item.addEventListener('mouseover', function () {
					this.querySelector('.card-blog__text-holder-js').style.maxHeight = '126px';
				});

				item.addEventListener('mouseout', function () {
					this.querySelector('.card-blog__text-holder-js').style.maxHeight = '63px';
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

	function hoverLastChildimageAcc() {
		let swiperImageAccordion = new Swiper('.slider-image-accordion', {
			mousewheel: true,
			slidesPerView: 'auto',
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			navigation: {
				nextEl: '.slider-image-accordion__nav .swiper-button-next',
				prevEl: '.slider-image-accordion__nav .swiper-button-prev',
			},
		});


		let slides = document.querySelectorAll('.slide-image-accordion');
		// let imageAccIconClose = document.querySelectorAll('.slide-image-accordion__icon-holder');
		slides.forEach((slide, index) => {
			const interactionType = window.innerWidth >= 1280 ? 'mouseover' : 'click';
			slide.addEventListener(interactionType, () => {
				slides.forEach(item => {
					item.classList.remove('slide-image-accordion--full');
				});
				slide.classList.add('slide-image-accordion--full');
			});
		});
	}

	function showTooltip() {
		if (window.innerWidth <= 1279) {
			const priceContainer = document.querySelectorAll('.price-container');
			priceContainer.forEach(priceContainer => {
				const tooltipBox = priceContainer.querySelector('.tooltip-box');
				const closeTooltipBox = priceContainer.querySelector('.tooltip-box__close');
				if (tooltipBox && closeTooltipBox) {
					priceContainer.addEventListener('click', () => {
						tooltipBox.classList.add('show');
					});
					closeTooltipBox.addEventListener('click', (e) => {
						e.stopPropagation();
						tooltipBox.classList.remove('show');
					});
				}
			});
		}
	}

	function changeGender() {
		const filterGenderActive = document.querySelector('.filter-heading__gender--active');
		const filterGender = document.querySelectorAll('.filter-heading__gender');
		const badgeGender = document.querySelectorAll('.badge--gender');

		if (filterGenderActive) {
			const filterText = filterGenderActive.textContent;
			badgeGender.forEach(badge => {
				badge.textContent = filterText;
			});
		}
		filterGender.forEach(btn => {
			btn.addEventListener('click', () => {
				filterGender.forEach(button => {
					button.classList.remove('filter-heading__gender--active');
				});
				btn.classList.add('filter-heading__gender--active');
				let filterText = btn.textContent;
				badgeGender.forEach(badge => {
					badge.textContent = filterText;
				});
			});
		});
	}

	jQuery(document).ready(function ($) {
		let accordionSidebar = $('.sidebar-menu .accordion__wrapper');
		let windowWidth = $(window).width();
		let sidebarMenu = $('.sidebar-menu');
		let menuItemHasChildren = $('.menu-item-has-children > a');
		menuItemHasChildren.append('<span class="menu-item-has-children__icon"></span>');
		subMenuOpen();

		function subMenuOpen() {
			menuItemHasChildren.click(function (e) {
				e.preventDefault();
				$(this).toggleClass('active');
				$('.sub-menu').slideToggle(300);
			});
		}

		function subMenuClose() {
			menuItemHasChildren.removeClass('active');
			$('.sub-menu').slideUp(300);
		}

		if (windowWidth >= 1280) {
			let isCursorOnSidebar = false;

			sidebarMenu.mouseenter(function () {
				isCursorOnSidebar = true;
			});

			sidebarMenu.mouseleave(function () {
				isCursorOnSidebar = false;
			});

			$(window).scroll(function () {
				if (!isCursorOnSidebar) {
					subMenuClose();
				}
			});
		}
	});

}
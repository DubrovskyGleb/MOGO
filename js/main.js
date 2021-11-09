"use strict"

window.onload = function () {
    const burger = document.querySelector('.burger');
    const body = document.querySelector('body');
    const teamCards = document.querySelectorAll('.team-card');
    const frontCards = document.querySelectorAll('.team-card__front');
    const frontGallery = document.querySelectorAll('.gallery-card__front');
    const heroContainer = document.querySelector('.hero__container');
    const hero = document.querySelector('.hero');
    let count = 0;

    burger.addEventListener('click', function () {
        body.classList.toggle('_lock');
        burger.previousElementSibling.classList.toggle('_active');
        burger.classList.toggle('_active');
    });

    mobileOrDesctop();
    touchOrHover();
    heroHeight();

    frontTitleContent();

    window.onresize = function () {
        mobileOrDesctop();
        touchOrHover();
        heroHeight();

        frontTitleContent();
    }

    function mobileOrDesctop() {
        let isMobile = {
            Android: function () { return navigator.userAgent.match(/Android/i); },
            BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
            iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
            Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
            Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
            any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
        };

        isMobile.any() ? body.classList.add('_touch') : body.classList.remove('_touch');
    }

    function touchOrHover() {
        const _animateDepend = document.querySelectorAll('._animateDepend');
        let animateFor = '';

        body.classList.contains('_touch') ? animateFor = '_animateForTouch' : animateFor = '_animateForHover';

        for (let index = 0; index < _animateDepend.length; index++) {
            const currentItem = _animateDepend[index];

            currentItem.classList.remove('_animateForTouch');
            currentItem.classList.remove('_animateForHover');

            currentItem.classList.add(animateFor);
        }
    }

    const serviceListButtons = document.querySelectorAll('.service-list__button');

    function removeActiveClass() {
        for (let index = 0; index < serviceListButtons.length; index++) {
            serviceListButtons[index].classList.remove('_active');
            serviceListButtons[index].parentNode.classList.remove('_active');

            const content = serviceListButtons[index].parentNode.querySelector('.service-list__content');
            content.classList.add('_noScroll');
        }
    }

    for (let index = 0; index < serviceListButtons.length; index++) {
        serviceListButtons[index].addEventListener('click', () => {
            removeActiveClass();
            serviceListButtons[index].classList.add('_active');
            serviceListButtons[index].parentNode.classList.add('_active');
            const content = serviceListButtons[index].parentNode.querySelector('.service-list__content');

            setTimeout(() => {
                content.classList.remove('_noScroll');
            }, 600);
        })
    }

    function frontTitleContent() {

        if (body.classList.contains('_touch') && count === 0) {
            const containers = document.querySelectorAll('.front-title');
            insertContentTitle(containers);
        }

        if (!body.classList.contains('_touch') && count === 1) {
            const containers = document.querySelectorAll('.team-card__title');
            insertContentTitle(containers);
        }
    }

    for (let index = 0; index < frontCards.length; index++) {
        const currentFront = frontCards[index];
        currentFront.addEventListener('click', (e) => {
            if (body.classList.contains('_touch')) {
                currentFront.classList.toggle('_active');
            }
        })
    }

    for (let index = 0; index < frontGallery.length; index++) {
        const currentFront = frontGallery[index];
        currentFront.addEventListener('click', (e) => {
            if (body.classList.contains('_touch')) {
                currentFront.classList.toggle('_active');
            }
        })
    }

    function insertContentTitle(containers) {

        for (let index = 0; index < teamCards.length; index++) {
            const currentCard = teamCards[index];
            const currentCardName = currentCard.querySelector('.team-card__name');
            const currentCardProf = currentCard.querySelector('.team-card__profession');
            const currentCardFront = currentCard.querySelector('.team-card__front');
            const containerTitle = containers[index];
            let frontTitleName = containerTitle.getElementsByClassName('team-card__name');
            let frontTitleProf = containerTitle.getElementsByClassName('team-card__profession');

            if (frontTitleProf.length === 0) {
                containerTitle.insertAdjacentElement('afterbegin', currentCardProf);
            }

            if (frontTitleName.length === 0) {
                containerTitle.insertAdjacentElement('afterbegin', currentCardName);
            }
        }
        count = count === 1 ? 0 : 1;
    }

    function heroHeight() {
        if (heroContainer.offsetHeight > window.innerHeight) {
            hero.style.height = 'auto';
        }

        if (heroContainer.offsetHeight <= window.innerHeight) {
            hero.style.height = '100vh';
        }
    }

    new Swiper('.comments-slider__container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        speed: 800
    });

    new Swiper('.feedback-slider__container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        speed: 800
    })

    new Swiper('.partner__container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
            360: {
                slidesPerView: 3
            },
            530: {
                slidesPerView: 4,
                spaceBetween: 15
            },
            740: {
                slidesPerView: 5,
                spaceBetween: 20
            },
            950: {
                slidesPerView: 6,
                spaceBetween: 30
            }
        }
    });

    new Swiper('.hero-slider', {
        pagination: {
            el: '.hero-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                let paginationText = ['intro', 'work', 'about', 'contacts'];
                return '\
                    <div class="hero-pagination__item ' + className + '">\
                        <div class="hero-pagination__progressbar">\
                            <div class="hero-pagination__progress"></div>\
                        </div>\
                    <button class="hero-pagination__button">\
                        <span class="hero-pagination__number">0'+ (index + 1) + '</span>\
                    <span class="hero-pagination__text">'+ paginationText[index] + '</span>\
                    </button>\
                    </div>';
            }
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        speed: 800,
        grabCursor: true,
    });

    const heroPaginationItems = document.querySelectorAll('.hero-pagination__item');

    if (heroPaginationItems.length > 0) {
        for (let index = 0; index < heroPaginationItems.length; index++) {
            heroPaginationItems[index].add

        }
    }

    const statistic = document.querySelector('.statistic');
    const statisticNumbers = document.querySelectorAll('.statistic__number');
    let interCount = 0;
    let statisticNumbersArr = [];
    const options = {
        threshold: 0.3
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (interCount === 0) {
                for (let index = 0; index < statisticNumbers.length; index++) {
                    statisticNumbersArr.push(statisticNumbers[index].textContent);
                    statisticNumbers[index].innerHTML = '0';
                }
                interCount = 1;
            }
            if (interCount === 1 && entry.isIntersecting) {
                for (let index = 0; index < statisticNumbers.length; index++) {
                    outNum(statisticNumbersArr[index], statisticNumbers[index]);
                }
                interCount = 2;
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(statistic);

    const time = 1000;
    const step = 1;

    function outNum(num, elem) {
        let n = 0;
        let t = Math.round(time / (num / step));
        let interval = setInterval(() => {
            n = n + step;
            if (n == num) {
                clearInterval(interval);
            }
            elem.innerHTML = n;
        }, t);
    }
}
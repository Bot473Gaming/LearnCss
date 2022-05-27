function tog_nav() {
    let nav_bar = document.querySelector('.header-nav-m');
    nav_bar.classList.toggle('in');
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop() + 80;
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    console.log(docViewTop, docViewBottom)
    console.log(elem, elemTop, elemBottom)
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) || ((elemBottom >= docViewTop) && (elemTop <= docViewTop - (elemBottom - docViewTop)));
};

function isScrolled(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop));
}

function changeActive(val) {
    for (let i = 1; i <= 3; i++) {
        $(`.item-${i}`).removeClass('active');
    }
    $(`.item-${val}`).addClass('active');
}

// listen for scroll event
if (isScrolledIntoView($('.hl'))) {
    $('.hl').addClass('fadeInUp');
    setTimeout(function() {
        $('.home-desc').addClass('fadeInUp');
    }, 500);
    setTimeout(function() {
        $('.home-footer').addClass('fadeInUp');
        $('.btnh').addClass('fadeInUp');

    }, 700);
    setTimeout(function() {
        $('.home-model').addClass('fadeInRight');
    }, 900)
}


// console.log($('#home').height())
var chooseActive = 1;
$(window).scroll(function() {
    if (isScrolled($('#home'))) {
        // console.log('in home')
        $('.btn-toTop').removeClass('show');
    } else {
        // console.log('non-in home')
        $('.btn-toTop').addClass('show');
    }
    if (isScrolled($('#about'))) {
        console.log('about')
        chooseActive = 3
    }
    if (isScrolled($('#messages'))) {
        console.log('messages')
        chooseActive = 2;
    }
    if (isScrolled($('#features'))) {
        console.log('features')
        chooseActive = 1;
    }
    changeActive(chooseActive);
    console.log(chooseActive)
    if (isScrolledIntoView($('.row-item'))) {
        $('.row-item').addClass('fadeInUp');
    }
    if (isScrolledIntoView($('.btnb'))) {
        $('.btnb').addClass('bounceIn');
    }
    if (isScrolledIntoView($('.hl'))) {
        $('.hl').addClass('fadeInUp');
        setTimeout(function() {
            $('.home-desc').addClass('fadeInUp');
        }, 500);
        setTimeout(function() {
            $('.home-footer').addClass('fadeInUp');
            $('.btnh').addClass('fadeInUp');

        }, 700);
        setTimeout(function() {
            $('.home-model').addClass('fadeInRight');
        }, 900)
    }
    if (isScrolledIntoView($('.msg-item'))) {
        $('.msg-item').addClass('fadeInLeft');
    }
    if (isScrolledIntoView($('.ab-img'))) {
        $('.ab-img').addClass('fadeInLeft');
    }
    if (isScrolledIntoView($('.ab-body'))) {
        $('.ab-body').addClass('fadeInRight');
    }
});

//fadeInRight
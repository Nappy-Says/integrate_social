"use strict";

var tg = window.Telegram.WebApp;
tg.expand();
document.querySelector(".main-top__close").addEventListener('click', function() {
    tg.close();
});
var drag;
document.querySelectorAll(".child").forEach(function(elem) {
    var initialpos = 0;
    var finalpos = 0;
    var initialleft = elem.style.left;
    var threshold = 100;
    var remove = false;

    function reset(event) {
        drag = false;
        initialpos = 0;
        finalpos = 0;
        elem.style.transform = 'none'; // elem.style.opacity = 1;

        if (remove) {
            elem.removeAttribute('style'); // tl.to(elem, {y:"100%", duration:0});
        } // elem.style.transform = 'translate(0px, 100%)';

    }

    function init(event) {
        var touch = event.touches && event.touches[0];
        drag = true;
        initialpos = event.clientX || touch.pageX;
        console.log(" -- init --", initialpos);
        remove = false;
    }

    function update(event) {
        if (drag) {
            console.log(" -- move -- ");
            var touch = event.touches && event.touches[0];
            finalpos = event.clientX || touch.pageX;
            var moved = finalpos - initialpos;
            console.log(" -- moved dist -- ", finalpos, initialpos, moved);

            if (moved > 1) {
                elem.style.transform = "translateX(".concat(moved, "px)");
                var opacityValue = 1 - Math.pow(Math.abs(moved) / 100, 5); //  elem.style.opacity = opacityValue;

                remove = false;

                if (Math.abs(moved) >= threshold) {
                    remove = true;
                }
            } else {
                remove = false;
            }
        }
    } //   elem.addEventListener('mousedown',init);
    //   elem.addEventListener('mousemove',update);
    //   elem.addEventListener('mouseup',reset);
    //   elem.addEventListener('mouseleave',reset);


    elem.addEventListener('touchstart', init);
    elem.addEventListener('touchmove', update);
    elem.addEventListener('touchend', reset);
});
var tl = gsap.timeline();
var tw = gsap.timeline();
var tw1 = gsap.timeline();
var tw2 = gsap.timeline();
var profileBtn1 = document.querySelector(".profile__btn1");
var profileBtn2 = document.querySelector(".profile__btn2");
profileBtn1.addEventListener('click', function() {
    this.classList.add("active");
    profileBtn2.classList.remove("active");
    tl.to(".profile-link-action__bg", {
        x: 0,
        duration: 0.2,
        ease: Linear.easeIn
    });
    tw.to(".profile__btn1 svg", {
        rotation: -20,
        duration: 0.15,
        ease: Linear.easeIn
    });
    tw.to(".profile__btn1 svg", {
        rotation: 0,
        duration: 0.15,
        ease: Linear.easeIn
    });
    tw1.to(".profile__btn1-path", {
        x: -2,
        duration: 0.15,
        ease: Linear.easeIn
    });
    tw1.to(".profile__btn1-path", {
        x: 0,
        duration: 0.15,
        ease: Linear.easeIn
    });
    document.querySelector(".profile-link__address--2").style.display = 'none';
    unfade(document.querySelector(".profile-link__address--1"));
});
profileBtn2.addEventListener('click', function() {
    this.classList.add("active");
    profileBtn1.classList.remove("active");
    tl.to(".profile-link-action__bg", {
        x: 64,
        duration: 0.3,
        ease: Linear.easeIn
    });
    tw.to(".profile__btn2 svg", {
        rotation: 20,
        duration: 0.15,
        ease: Linear.easeIn
    });
    tw.to(".profile__btn2 svg", {
        rotation: 0,
        duration: 0.15,
        ease: Linear.easeIn
    });
    tw1.to(".profile__btn2-path", {
        x: -2,
        duration: 0.15,
        ease: Linear.easeIn
    });
    tw1.to(".profile__btn2-path", {
        x: 0,
        duration: 0.15,
        ease: Linear.easeIn
    });
    tw2.to(".profile__btn2-path", {
        x: 2,
        duration: 0.15,
        ease: Linear.easeIn
    });
    tw2.to(".profile__btn2-path", {
        x: 0,
        duration: 0.15,
        ease: Linear.easeIn
    });
    document.querySelector(".profile-link__address--1").style.display = 'none';
    unfade(document.querySelector(".profile-link__address--2"));
});
var copy = document.querySelector(".profile-action-item__copy");
copy.addEventListener('click', function() {
    tl.fromTo(".copied", {
        y: "-100%"
    }, {
        y: "0%",
        duration: 0.3
    });
    setTimeout(function() {
        fade(document.querySelector(".copied"));
        setTimeout(function() {
            document.querySelector(".copied").style.display = 'flex';
            document.querySelector(".copied").style.opacity = '1';
            tl.to(".copied", {
                y: "-100%",
                duration: 0
            });
        }, 300);
    }, 1000);
});
var qr = document.querySelector(".profile-action-item__qr");
qr.addEventListener('click', function() {
    tl.fromTo(".qr", {
        y: "100%"
    }, {
        y: "0%",
        duration: 0.3
    });
});
document.querySelector(".qr__close").addEventListener('click', function() {
    fade(document.querySelector(".qr"));
    setTimeout(function() {
        tl.to(".qr", {
            y: "100%",
            duration: 0
        });
        document.querySelector(".qr").style.display = 'flex';
        document.querySelector(".qr").style.opacity = '1';
    }, 300);
});
document.querySelector(".qr").addEventListener('click', function(e) {
    var target = e.target;

    if (!target.closest('.qr-container')) {
        fade(document.querySelector(".qr"));
        setTimeout(function() {
            tl.to(".qr", {
                y: "100%",
                duration: 0
            });
            document.querySelector(".qr").style.display = 'flex';
            document.querySelector(".qr").style.opacity = '1';
        }, 300);
    }
});
var notification = document.querySelector(".profile-notification");
notification.addEventListener('click', function() {
    tl.fromTo(".profile-notification svg", {
        scaleX: 1,
        scaleY: 1
    }, {
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 0.15
    });
    tl.to(".profile-notification svg", {
        scaleX: 1,
        scaleY: 1,
        duration: 0.15
    });
    tl.fromTo(".notifications", {
        y: "100%"
    }, {
        y: "0%",
        duration: 0.3
    });
});
document.querySelector(".notifications-top__close").addEventListener('click', function() {
    tl.fromTo(".notifications", {
        y: 0
    }, {
        y: "100%",
        duration: 0.3
    });
});
document.querySelector(".profile-stat__followers").addEventListener('click', function() {
    tl.fromTo(".profile-stat__followers", {
        y: 0
    }, {
        y: 3,
        duration: 0.15
    });
    tl.to(".profile-stat__followers", {
        y: 0,
        duration: 0.15
    });
    tl.fromTo(".followers", {
        y: "100%"
    }, {
        y: "0%",
        duration: 0.3
    });
});
document.querySelector(".followers .follow-top__close").addEventListener('click', function() {
    tl.fromTo(".followers", {
        y: 0
    }, {
        y: "100%",
        duration: 0.3
    });
});
document.querySelector(".profile-stat__following").addEventListener('click', function() {
    tl.fromTo(".profile-stat__following", {
        y: 0
    }, {
        y: 3,
        duration: 0.15
    });
    tl.to(".profile-stat__following", {
        y: 0,
        duration: 0.15
    });
    tl.fromTo(".following", {
        y: "100%"
    }, {
        y: "0%",
        duration: 0.3
    });
});
document.querySelector(".following .follow-top__close").addEventListener('click', function() {
    tl.fromTo(".following", {
        y: 0
    }, {
        y: "100%",
        duration: 0.3
    });
});
var followItem;
document.querySelectorAll(".follow-item-icon").forEach(function(btn) {
    btn.addEventListener('click', function() {
        fade(btn);
        followItem = btn.closest('.follow-item');
        unfadeflex(followItem.querySelector(".follow-item-action"));
    });
});
document.querySelectorAll(".follow-item-action__follow").forEach(function(btn) {
    btn.addEventListener('click', function() {
        followItem = btn.closest('.follow-item');
        unfade(followItem.querySelector(".follow-item-icon"));
        fade(followItem.querySelector(".follow-item-action"));
    });
});
document.querySelectorAll(".profile-action-item").forEach(function(btn) {
    btn.addEventListener('click', function() {
        tl.fromTo(btn, {
            scaleX: 1,
            scaleY: 1
        }, {
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 0.15
        });
        tl.to(btn, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.15
        });
    });
});
document.querySelectorAll(".follow-item-action__remove").forEach(function(btn) {
    btn.addEventListener('click', function() {
        followItem = btn.closest('.follow-item');
        tl.fromTo(document.querySelector(".remove "), {
            y: "100%"
        }, {
            y: "0%",
            duration: 0.3
        });
    });
});
document.querySelector(".remove").addEventListener('click', function(e) {
    var target = e.target;

    if (!target.closest('.remove-container')) {
        tl.to(document.querySelector(".remove"), {
            y: "100%",
            duration: 0
        });
    }
});
document.querySelector(".remove__close").addEventListener('click', function(e) {
    tl.to(document.querySelector(".remove"), {
        y: "100%",
        duration: 0
    });
});
document.querySelector(".remove__cancel").addEventListener('click', function(e) {
    tl.to(document.querySelector(".remove"), {
        y: "100%",
        duration: 0
    });
});
document.querySelector(".remove__btn ").addEventListener('click', function(e) {
    followItem.remove();
    tl.to(document.querySelector(".remove"), {
        y: "100%",
        duration: 0
    });
});

function fade(element) {
    var op = 1; // initial opacity

    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}

function unfade(element) {
    var op = 0.1; // initial opacity

    element.style.display = 'block';
    var timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function unfadeflex(element) {
    var op = 0.1; // initial opacity

    element.style.display = 'flex';
    var timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}
/* SLIDE UP */


var slideUp = function slideUp(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function() {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property'); //alert("!");
    }, duration);
};
/* SLIDE DOWN */


var slideDown = function slideDown(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    target.style.removeProperty('display');
    var display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function() {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
};
/* TOOGLE */


var slideToggle = function slideToggle(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
};
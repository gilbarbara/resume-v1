var React = require('react'),
    $     = require('jquery'),
    Home  = require('./components/Home');

var drop = event => {
    var el = event.target;
    var style = window.getComputedStyle(event.target, null);

    if (style.left !== 'auto') {
        el.style.left = event.clientX + 'px';
    }
    else {
        el.style.right = (window.innerWidth - event.clientX - parseInt(style.width, 10)) + 'px';
    }

    el.style.top = (event.clientY - parseInt(el.height, 10)) + 'px';
    event.preventDefault();
    return false;
};

var scrolled = () => {
    var logos = document.querySelector('.logos');

    if (window.scrollY > 75 && !logos.classList.contains('logos--fade')) {
        logos.classList.add('logos--fade');
        logos.classList.remove('logos--show');
    }
    else if (window.scrollY < 75 && logos.classList.contains('logos--fade')) {
        logos.classList.add('logos--show');
        logos.classList.remove('logos--fade');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    React.render(<Home/>, document.getElementById('react'));

    var imgs = document.querySelectorAll('.logos img');
    for (var i = 0; i < imgs.length; ++i) {
        imgs[i].addEventListener('dragend', drop, false);
    }
    scrolled();
});

document.addEventListener('scroll', scrolled);

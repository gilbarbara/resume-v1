import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let drop = event => {
    let el = event.target,
        style = window.getComputedStyle(event.target, null);

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

let scrolled = () => {
    let logos = document.querySelector('.logos');

    if (window.scrollY > 75 && !logos.classList.contains('logos--fade')) {
        logos.classList.add('logos--fade');
        logos.classList.remove('logos--show');
    }
    else if (window.scrollY < 75 && logos.classList.contains('logos--fade')) {
        logos.classList.add('logos--show');
        logos.classList.remove('logos--fade');
    }
};
// Polyfills
require('babel-polyfill');

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App/>, document.getElementById('react'));

    let imgs = document.querySelectorAll('.logos img');
    for (let i = 0; i < imgs.length; ++i) {
        imgs[i].addEventListener('dragend', drop, false);
    }
    scrolled();
});

document.addEventListener('scroll', scrolled);

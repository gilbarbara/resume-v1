// Polyfills
import 'core-js/modules/es6.object.assign';
import 'classlist-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const drop = event => {
  const el = event.target;
  const style = window.getComputedStyle(event.target, null);

  if (style.left !== 'auto') {
    el.style.left = `${event.clientX}px`;
  }
  else {
    el.style.right = `${(window.innerWidth - event.clientX - parseInt(style.width, 10))}px`;
  }

  el.style.top = `${(event.clientY - parseInt(el.height, 10))}px`;
  event.preventDefault();
  return false;
};

const scrolled = () => {
  const logos = document.querySelector('.logos');

  if (window.scrollY > 75 && !logos.classList.contains('logos--fade')) {
    logos.classList.add('logos--fade');
    logos.classList.remove('logos--show');
  }
  else if (window.scrollY < 75 && logos.classList.contains('logos--fade')) {
    logos.classList.add('logos--show');
    logos.classList.remove('logos--fade');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('react'));

  const imgs = document.querySelectorAll('.logos img');
  for (let i = 0; i < imgs.length; ++i) {
    imgs[i].addEventListener('dragend', drop, false);
  }
  scrolled();
});

document.addEventListener('scroll', scrolled);

document.addEventListener('DOMContentLoaded', function () {
    console.log('ready');
    var imgs = document.querySelectorAll('.logos img');
    for (var i = 0; i < imgs.length; ++i) {
        imgs[i].addEventListener('dragstart', drag_start, false);
        imgs[i].addEventListener('dragend', drop, false);
    }
});

function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    var rect = event.target.getBoundingClientRect();

    event.dataTransfer.setData("text/json",
        JSON.stringify({
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left
        }));
}

function drop(event) {
    var el = event.target;
    var style = window.getComputedStyle(event.target, null);

    console.log(style.height);

    if (style.left !== 'auto') {
        el.style.left = event.clientX + 'px';
    }
    else {
        el.style.right = (window.innerWidth - event.clientX - parseInt(style.width, 10)) + 'px';
    }

    el.style.top = (event.clientY - parseInt(el.height, 10)) + 'px';
    event.preventDefault();
    return false;
}

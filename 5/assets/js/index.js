var words_string = ''
$.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/Bot473Gaming/words/main/words",
    async: false,
    success: function(text) {
        words_string = text;
    }
});
var word_data = words_string.split('\n');
var number_Fish = prompt('Number of fish?')
var DEAD = true;
// var fish = document.getElementsByClassName('fish')[0];
var HTML = '';
for (let i = 1; i <= number_Fish; i++) {
    let k = Math.floor(Math.random() * 456);
    HTML +=
        `<div class="fish-box">
    <div class="fish"></div>
    <div class="text">${word_data[k]}</div>
</div>`
}
var Begin = document.querySelector('#main');
Begin.innerHTML = Begin.innerHTML + HTML;
console.log(Begin, HTML)

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getPos(el) {
    var _x = 0;
    // var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        // _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return _x;
}

function checkCollision() {
    let fis = document.getElementsByClassName('fish');
    let line_dead = getPos(document.getElementsByClassName('line-dead')[0]);
    for (let fi of fis) {
        let x_pos = getPos(fi);
        if (x_pos >= line_dead) {
            DEAD = false;
            alert('You Dead')
            return;
        }
    }
}

function check_text(input) {
    let fishs = document.getElementsByClassName('fish-box');
    let fis_text = document.getElementsByClassName('text');
    for (let i in fishs) {
        if (input == fis_text[i].innerHTML) {
            fishs[i].style.left = '0px';
            fis_text[i].innerHTML = word_data[Math.floor(Math.random() * 456)];
            return;
        }
    }
}

function check() {
    if (event.keyCode == 13 || event.keyCode == 32) {
        let texts = document.getElementsByClassName('text');
        let input_text = document.querySelector('input');
        let inp_val = input_text.value.trim();
        check_text(inp_val);
        input_text.value = '';
        // console.log('ok')
    }
}

function fish_move() {
    let fis = document.getElementsByClassName('fish-box');
    for (let fi of fis) {
        let x_pos = getPos(fi);
        fi.style.left = (x_pos + 1) + 'px';
    }
}

var myf = setInterval(function() {
    fish_move();
    checkCollision();
    if (!DEAD) {
        clearInterval(myf);
    }
}, 10)
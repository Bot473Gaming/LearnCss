var h1 = 0,
    h2 = 0;
var rota = [0, 90, 180, 270];
var bullets = document.getElementsByClassName('bullet');
var slbl = 0;
var p1 = document.getElementsByClassName('tank')[0],
    p2 = document.getElementsByClassName('tank')[1],
    pbg1 = document.getElementsByClassName('tank-ctn')[0],
    pbg2 = document.getElementsByClassName('tank-ctn')[1],
    hp1 = hp2 = 100,
    fort = document.getElementsByClassName('fort'),
    hpf1 = hpf2 = 300;
var iscl = false,
    isf1 = true,
    isf2 = true;
pbg1.style.left = '275px';
pbg1.style.top = '200px';

pbg2.style.left = '275px';
pbg2.style.top = '400px';

fort[0].style.left = '265px';
fort[0].style.top = '12px';
fort[1].style.left = '265px';
fort[1].style.top = '528px';

var game = true;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function outWall(pos) {
    if (pos > 535 || pos < 12) {
        if (pos > 535) {
            pos = 535;
        } else {
            pos = 12;
        }
    }
    return pos;
}

function isoutWall(pos) {
    pos = parseInt(pos);
    if (pos > 570 || pos < 12) {
        return true;
    }
    return false;
}

function getAndchoose(x, y, h) {
    x = parseInt(x.replace('px', ''));
    y = parseInt(y.replace('px', ''));
    switch (h) {
        case 0:
            x += 20;
            y -= 25;
            break;
        case 1:
            x += 65;
            y += 15;
            break;
        case 2:
            x += 20;
            y += 65;
            break;
        case 3:
            x -= 20;
            y += 15;
    }
    return { x: x + 'px', y: y + 'px' };
}

function changePosBullet(x, y, h) {
    switch (h) {
        case 0:
            y -= 5;
            break;
        case 1:
            x += 5;
            break;
        case 2:
            y += 5;
            break;
        case 3:
            x -= 5;
    }
    return { x: x + 'px', y: y + 'px' };
}

function ccc(x, y, h) {
    switch (h) {
        case 0:
            y += 2;
            break;
        case 1:
            x -= 2;
            break;
        case 2:
            y -= 2;
            break;
        case 3:
            x += 2;
    }
    return { x: x + 'px', y: y + 'px' };
}

function getPos(pl) {
    let x1 = $(pl).offset().left,
        y1 = $(pl).offset().top;
    let x2 = x1 + $(pl).width(),
        y2 = y1 + $(pl).height();
    return { x1: x1, x2: x2, y1: y1, y2: y2 };
}

function isCollect(x, y) {
    let pos_1 = getPos(x),
        pos_2 = getPos(y);
    let a = pos_1.x2 > pos_2.x1,
        b = pos_1.x1 < pos_2.x2,
        c = pos_1.y2 > pos_2.y1,
        d = pos_1.y1 < pos_2.y2;

    if (a && b && c && d) {
        return true
    }
    return false;
}

(function() {
    setInterval(function() {
        let bullets = document.getElementsByClassName('bullet');
        try {
            for (bullet of bullets) {
                let x = parseInt(String(bullet.style.left).replace('px', ''));
                let y = parseInt(String(bullet.style.top).replace('px', ''));
                let temp = String(bullet.className).split(' ');
                let h = parseInt(temp.pop());
                let index = parseInt(temp.pop());
                let pos = changePosBullet(x, y, h);
                if (isoutWall(pos.x) || isoutWall(pos.y) || isCollect(bullet, $('.wl'))) {
                    bullet.remove();
                    continue;
                }
                if (isCollect(bullet, $('.fort').eq(0)) || isCollect(bullet, $('.fort').eq(1))) {
                    if (isCollect(bullet, $('.fort').eq(0))) {
                        hpf1 -= 10;
                    } else {
                        hpf2 -= 10;
                    }
                    bullet.remove();
                    continue;
                }
                if (isCollect(bullet, document.getElementsByClassName('tank')[0]) || isCollect(bullet, document.getElementsByClassName('tank')[1])) {
                    if (isCollect(bullet, document.getElementsByClassName('tank')[0])) {
                        hp1 -= 10;
                    } else {
                        hp2 -= 10;
                    }
                    bullet.remove();
                    continue;
                }
                bullet.style.left = pos.x;
                bullet.style.top = pos.y;

            }

        } catch (error) {
            // console.log(error)
        }

    }, 5);
})();

(async function() {
    let d1 = 0,
        d2 = 0;
    var tx = setInterval(function() {
        if (!isf1) {
            d1++;
            if (d1 >= 5) {
                d1 = 0;
                isf1 = true;
            }
        }
        if (!isf2) {
            d2++;
            if (d2 >= 5) {
                d2 = 0;
                isf2 = true;
            }
        }
        hp1 = Math.max(0, hp1);
        hp2 = Math.max(0, hp2);

        if (!hp1 || !hp2) {
            let pbg = document.getElementsByClassName('tank-ctn');
            if (!hp1) {
                pbg[0].style.left = '275px';
                pbg[0].style.top = '200px';
                hp1 = 100;
            } else {
                pbg[1].style.left = '275px';
                pbg[1].style.top = '400px';
                hp2 = 100;
            }
        }
        if (!hpf1 || !hpf2) {
            game = false;
            document.getElementsByClassName('reset')[0].classList.add('in')
            if (!hpf1) {
                document.getElementsByClassName('win')[0].innerHTML = 'P2 WIN';
            } else {
                document.getElementsByClassName('win')[0].innerHTML = 'P1 WIN'
            }
            clearInterval(tx);
        }
    }, 50);
})();
////
var keys = {};
document.onkeydown = document.onkeyup = (event) => {
    if (!game) {
        return;
    }
    if (event.type == 'keydown') {
        keys[event.keyCode] = true;
    }
    // console.log(keys)
    if (event.type == 'keyup') {
        keys[event.keyCode] = false;
    }
};
var old_pos_1 = { x: '275px', y: '200px' },
    old_pos_2 = { x: '275px', y: '400px' };
var xxx = setInterval(() => {
    if (!game) {
        clearInterval(xxx);
    }
    var p1 = document.getElementsByClassName('tank')[0],
        p2 = document.getElementsByClassName('tank')[1],
        pbg1 = document.getElementsByClassName('tank-ctn')[0],
        pbg2 = document.getElementsByClassName('tank-ctn')[1],
        hpp = document.getElementsByClassName('hp');
    if (keys[39]) {
        //right
        h1 = 1;
        let pos = parseInt(String(pbg1.style.left).replace('px', '')) + 2;
        pos = outWall(pos);
        pbg1.style.left = pos + 'px';
    }
    if (keys[37]) {
        //left
        h1 = 3;
        let pos = parseInt(String(pbg1.style.left).replace('px', '')) - 2;
        pos = outWall(pos);
        pbg1.style.left = pos + 'px';
    }
    if (keys[40]) {
        //down
        h1 = 2;
        let pos = parseInt(String(pbg1.style.top).replace('px', '')) + 2;
        pos = outWall(pos);
        pbg1.style.top = pos + 'px';
    }
    if (keys[38]) {
        //up
        h1 = 0;
        let pos = parseInt(String(pbg1.style.top).replace('px', '')) - 2;
        pos = outWall(pos);
        pbg1.style.top = pos + 'px';
    }

    ////
    if (keys[68]) {
        //right
        h2 = 1;
        let pos = parseInt(String(pbg2.style.left).replace('px', '')) + 2;
        pos = outWall(pos);
        pbg2.style.left = pos + 'px';
    }
    if (keys[65]) {
        //left

        h2 = 3;
        let pos = parseInt(String(pbg2.style.left).replace('px', '')) - 2;
        pos = outWall(pos);
        pbg2.style.left = pos + 'px';
    }
    if (keys[83]) {
        //down
        h2 = 2;
        let pos = parseInt(String(pbg2.style.top).replace('px', '')) + 2;
        pos = outWall(pos);
        pbg2.style.top = pos + 'px';
    }
    if (keys[87]) {
        //up
        h2 = 0;
        let pos = parseInt(String(pbg2.style.top).replace('px', '')) - 2;
        pos = outWall(pos);
        pbg2.style.top = pos + 'px';
    }

    if (keys[32] && isf2) {
        isf2 = false;
        let wallGame = document.getElementsByClassName('wall')[0];
        wallGame.innerHTML += `<div class="bullet ${++slbl} ${h2}"></div>`
        let bl = document.getElementsByClassName('bullet');
        let pos = getAndchoose(pbg2.style.left, pbg2.style.top, h2);
        bl[bl.length - 1].style.left = pos.x;
        bl[bl.length - 1].style.top = pos.y;
        bl[bl.length - 1].style.transform = `rotate(${rota[h2]}deg)`;
    }
    if (keys[13] && isf1) {
        isf1 = false;
        let wallGame = document.getElementsByClassName('wall')[0];
        wallGame.innerHTML += `<div class="bullet ${++slbl} ${h1}"></div>`
        let bl = document.getElementsByClassName('bullet');
        let pos = getAndchoose(pbg1.style.left, pbg1.style.top, h1);
        bl[bl.length - 1].style.left = pos.x;
        bl[bl.length - 1].style.top = pos.y;
        bl[bl.length - 1].style.transform = `rotate(${rota[h1]}deg)`;
        console.log(hpf1, hpf2)
    }

    hpp[2].style.width = hpf1 / 3 + '%';
    hpp[3].style.width = hpf2 / 3 + '%';

    hpp[0].style.width = hp1 + '%';
    hpp[1].style.width = hp2 + '%';
    p1.style.transform = `rotate(${rota[h1]}deg)`
    p2.style.transform = `rotate(${rota[h2]}deg)`
    if (isCollect(pbg1, $('.wl')) || isCollect(pbg1, $('.fort').eq(0)) || isCollect(pbg1, $('.fort').eq(1))) {
        pbg1.style.left = old_pos_1.x;
        pbg1.style.top = old_pos_1.y;
    } else {
        old_pos_1 = { x: pbg1.style.left, y: pbg1.style.top };
    }
    if (isCollect(pbg2, $('.wl')) || isCollect(pbg2, $('.fort').eq(0)) || isCollect(pbg2, $('.fort').eq(1))) {
        pbg2.style.left = old_pos_2.x;
        pbg2.style.top = old_pos_2.y;
    } else {
        old_pos_2 = { x: pbg2.style.left, y: pbg2.style.top };
    }

    let pos2 = { y: outWall(parseInt(String(pbg2.style.top).replace('px', ''))), x: outWall(parseInt(String(pbg2.style.left).replace('px', ''))) };
    pbg1.style.left = pos1.x;
    pbg1.style.top = pos1.y;
    pbg2.style.left = pos2.x;
    pbg2.style.top = pos2.y;
}, 0)
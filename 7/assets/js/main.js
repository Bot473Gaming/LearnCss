var h1 = 0,
    h2 = 0;
var rota = [0, 90, 180, 270];
var bullets = document.getElementsByClassName('bullet');
var slbl = 0;
var p1 = document.getElementsByClassName('tank')[0],
    p2 = document.getElementsByClassName('tank')[1],
    pbg1 = document.getElementsByClassName('tank-ctn')[0],
    pbg2 = document.getElementsByClassName('tank-ctn')[1],
    hp1 = hp2 = 100;
var iscl = false,
    isf1 = true,
    isf2 = true;
pbg1.style.left = '20px';
pbg1.style.top = '20px';

pbg2.style.left = '500px';
pbg2.style.top = '500px';

var game = true;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function outWall(pos) {
    if (pos > 535 || pos < 12) {
        if (pos > 535) {
            pos -= 5;
        } else {
            pos += 5;
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
            y -= 20;
            break;
        case 1:
            x += 65;
            y += 20;
            break;
        case 2:
            x += 20;
            y += 65;
            break;
        case 3:
            x -= 20;
            y += 20;
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

function getPosForCheck(pl) {
    let x1 = parseInt(String(pl.style.left).replace('px', '')),
        y1 = parseInt(String(pl.style.top).replace('px', ''));
    let x2 = x1 + 50,
        y2 = y1 + 50;
    return { x1: x1, x2: x2, y1: y1, y2: y2 };
}

function isCollect(x, y) {
    let pos_1 = getPosForCheck(document.getElementsByClassName('tank-ctn')[0]),
        pos_2 = getPosForCheck(document.getElementsByClassName('tank-ctn')[1]);
    // console.log(x, y, pos_1)
    let hpp1 = document.getElementsByClassName('hp')[0],
        hpp2 = document.getElementsByClassName('hp')[1]
    if (x >= pos_1.x1 && x <= pos_1.x2 && y >= pos_1.y1 && y <= pos_1.y2) {
        hp1 -= 10;
        hpp1.style.width = hp1 + '%';
        iscl = true;
    }
    if (x >= pos_2.x1 && x <= pos_2.x2 && y >= pos_2.y1 && y <= pos_2.y2) {
        hp2 -= 10;
        hpp2.style.width = hp2 + '%';
        iscl = true;
    }
}

(function() {
    // while (true) {
    // await delay(100);
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
                // console.log(pos, index, h, isoutWall(pos.x) || isoutWall(pos.y))
                isCollect(x, y);
                if (isoutWall(pos.x) || isoutWall(pos.y)) {
                    bullet.remove();
                    continue;
                }
                if (iscl) {
                    // console.log('collection');
                    iscl = false;
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
    // }
})();

(async function() {
    let d1 = 0,
        d2 = 0;
    var tx = setInterval(function() {
        if (!isf1) {
            d1++;
            if (d1 >= 20) {
                d1 = 0;
                isf1 = true;
            }
        }
        if (!isf2) {
            d2++;
            if (d2 >= 20) {
                d2 = 0;
                isf2 = true;
            }
        }
        hp1 = Math.max(0, hp1);
        hp2 = Math.max(0, hp2);

        if (!hp1 || !hp2) {
            game = false;
            // console.log('end')
            document.getElementsByClassName('reset')[0].classList.add('in')
            if (!hp1) {
                document.getElementsByClassName('win')[0].innerHTML = 'P2 WIN';
            } else {
                document.getElementsByClassName('win')[0].innerHTML = 'P1 WIN'
            }
            clearInterval(tx);
        }
        // console.log(d1, d2)
    }, 50);
})();
////
var keys = {};
document.onkeydown = document.onkeyup = (event) => {
    // console.log(event.keyCode)
    // console.log(event.type)
    if (event.type == 'keydown') {
        keys[event.keyCode] = true;

    }
    if (!game) {
        return;
    }
    // console.log(keys)
    if (event.type == 'keyup') {
        keys[event.keyCode] = false;

    }

};
var xxx = setInterval(() => {
        var p1 = document.getElementsByClassName('tank')[0],
            p2 = document.getElementsByClassName('tank')[1],
            pbg1 = document.getElementsByClassName('tank-ctn')[0],
            pbg2 = document.getElementsByClassName('tank-ctn')[1],
            hpp1 = document.getElementsByClassName('hp')[0],
            hpp2 = document.getElementsByClassName('hp')[1]

        if (keys[39]) {
            //right
            h1 = 1;
            let pos = parseInt(String(pbg1.style.left).replace('px', '')) + 5;
            pos = outWall(pos);
            pbg1.style.left = pos + 'px';
        }
        if (keys[37]) {
            //left
            h1 = 3;
            let pos = parseInt(String(pbg1.style.left).replace('px', '')) - 5;
            pos = outWall(pos);
            pbg1.style.left = pos + 'px';
        }
        if (keys[40]) {
            //down
            h1 = 2;
            let pos = parseInt(String(pbg1.style.top).replace('px', '')) + 5;
            pos = outWall(pos);
            pbg1.style.top = pos + 'px';
        }
        if (keys[38]) {
            //up
            h1 = 0;
            let pos = parseInt(String(pbg1.style.top).replace('px', '')) - 5;
            pos = outWall(pos);
            pbg1.style.top = pos + 'px';
        }

        ////
        if (keys[68]) {
            //right
            h2 = 1;
            let pos = parseInt(String(pbg2.style.left).replace('px', '')) + 5;
            pos = outWall(pos);
            pbg2.style.left = pos + 'px';
        }
        if (keys[65]) {
            //left

            h2 = 3;
            let pos = parseInt(String(pbg2.style.left).replace('px', '')) - 5;
            pos = outWall(pos);
            pbg2.style.left = pos + 'px';
        }
        if (keys[83]) {
            //down
            h2 = 2;
            let pos = parseInt(String(pbg2.style.top).replace('px', '')) + 5;
            pos = outWall(pos);
            pbg2.style.top = pos + 'px';
        }
        if (keys[87]) {
            //up
            h2 = 0;
            let pos = parseInt(String(pbg2.style.top).replace('px', '')) - 5;
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
        }
        hpp1.style.width = hp1 + '%';
        hpp2.style.width = hp2 + '%';
        p1.style.transform = `rotate(${rota[h1]}deg)`
        p2.style.transform = `rotate(${rota[h2]}deg)`
    }, 10)
    // document.addEventListener('keyup', (event) => {
    //     console.log(keys)

// });
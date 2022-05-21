function inputs(x) {
    var dis_ans = document.querySelector('.display-ans');
    var dis = document.querySelector('.display-show');
    dis.innerHTML += x;
    dis_ans.innerHTML = '';
}

function showAns() {
    var dis_show = document.querySelector('.display-show');
    var dis_ans = document.querySelector('.display-ans');
    var ans
    try {
        ans = eval(dis_show.innerHTML);
    } catch {
        ans = 'ERROR';
    }
    console.log(ans)

    dis_ans.innerHTML = String(ans);
}

function remove(ty) {
    var dis_show = document.querySelector('.display-show');
    var dis_ans = document.querySelector('.display-ans');
    dis_ans.innerHTML = ''
    if (ty == 1) {
        let temp = dis_show.innerHTML.slice(0, -1);
        dis_show.innerHTML = temp;
    } else {
        dis_show.innerHTML = '';

    }
}
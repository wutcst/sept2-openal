//自动显示文字
const text = "你在这款游戏的主要目标是找到一个传言中藏有大量宝藏和金子的洞穴并活着离开它。玩家在这个虚拟洞穴中探索时可以获得分数。一共可获得的分数是 430 点。这款游戏的灵感主要来源于原作者 Will Crowther 丰富的洞穴探索的经历。他曾经经常在洞穴中冒险，特别是肯塔基州的猛犸洞（Mammoth Cave）。因为游戏中的洞穴结构大体基于猛犸洞，你也许会注意到游戏中的场景和现实中的猛犸洞的相似之处。"
const div1 = document.querySelector('.beginGame .div1')
const div2 = document.querySelector('.beginGame .div2')
function tex() {
    let index = 0;
    function showText() {
        if (index < text.length) {
            div1.innerHTML += text.charAt(index);
            index++;
            setTimeout(showText, 50); // 每隔100毫秒显示一个字
        }
    }
    showText();
}

//点击开启/关闭音乐
let video = document.querySelector('video');

//自动播放音乐
document.addEventListener('click',function() {
    video.play();
})
window.onload = function() {
    tex()
}

let playMusic = true
video.addEventListener('click',function() {
    if (playMusic) {
        video.style.animationPlayState = 'paused' // 停止旋转
        video.style.backgroundImage = 'url(../image/music_off.png)'
        playMusic = false
        //关闭声音
        video.muted = true
    } else {
        video.style.animationPlayState = 'running' // 恢复旋转
        video.style.backgroundImage = 'url(../image/music_on.png)'
        playMusic = true
        //打开声音
        video.muted = false
    }

})

const login = document.querySelector('.beginGame .login')
const start = document.querySelector('.beginGame .game')
const startContro = document.querySelector('.start')
const username = document.querySelector(('.beginGame .div2 [type="text"]'))
const pwd = document.querySelector(('.beginGame .div2 [type="password"]'))
let username1;
login.addEventListener('click',function() {
    //登录
    div1.style.display = 'none'
    div2.style.display = 'block'

    if (username.value !== '' && pwd.value !== '') {
        //后端发请求
        axios.post('/users/login',{
            username: username.value,
            password: pwd.value
        }).then(function (res) {
            alert(res.data.msg)
            if (10 === res.data.code) {
                //登录/注册成功
                div1.style.display = 'block'
                div2.style.display = 'none'
                login.style.display = 'none'
                start.style.display = 'block'
                username1 = username.value
            } else if (11 === res.data.code) {
                username.value = ''
                pwd.value = ''
            }
        })
    }
})

start.addEventListener('click',function() {
    location.href = '../game.html?username1=' + username1
})

startContro.addEventListener('click',function () {
    location.href='../contr.html'
})





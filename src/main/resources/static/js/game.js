let Application = PIXI.Application,
loader  =PIXI.loader,
Sprite = PIXI.Sprite,
resources = PIXI.loader.resources,
TextureCache = PIXI.utils.TextureCache,
Rectangle = PIXI.Rectangle,
Container = PIXI.Container,
Graphics = PIXI.Graphics,
Text = PIXI.Text,
TextStyle = PIXI.TextStyle

const logout = document.querySelector('.header .logout button')
logout.addEventListener('click', function() {
    location.href = '../login.html'
})

const save = document.querySelector('.header .save button')


let app = new Application({
	width: 1280, // default: 800 宽度
	height: 550, // default: 600 高度
	antialias: true, // default: false 反锯齿
	transparent: false, // default: false 透明度
	resolution: 1, // default: 1 分辨率
});

document.body.appendChild(app.view);

//加载资源到内存
loader.add([
    './image/sprite1.json',
    './image/sprite2.json',
    './image/trans.png',
]).load(setup)

let id,road_sprite = [],doors = [],c = new Charm(PIXI),rooms = [],id_2
let gameScene,map,explorer,mask,state,gameBegin,explorerInDoor = false,current_room,magic_cookie,transScene
let gameData,itemsInExplorer = 0,cookie1,cookie2
let passRooms = []
let pub,outside,theater,lab,office
const currentRoom = document.querySelector('.header .currentRoom span')
const pack = document.querySelector('.header .pack span')
//携带物品的数量
const inPack = document.querySelector('.header .inPack span')
inPack.innerHTML = '0'

const back = document.querySelector('.header .back')
const look = document.querySelector('.header .look')
const transmit = document.querySelector('.header .transform')
const take = document.querySelector('.header .take')
const drop = document.querySelector('.header .drop')
const items = document.querySelector('.header .items')
const text = document.querySelector('.bottom .text')

function setup() {
    //创建游戏场景
    gameScene = new Container()
    gameScene.width = 1280
    gameScene.height = 550
    //将场景添加到舞台中
    app.stage.addChild(gameScene)
    // gameScene.visible = false

    //游戏开始场景
    gameBegin = new Container()
    gameBegin.width = 1280
    gameBegin.height = 550
    app.stage.addChild(gameBegin)
    gameBegin.visible = false

    //传送弹出框
    transScene = new Container()
    transScene.width = 1280
    transScene.height = 550
    app.stage.addChild(transScene)
    transScene.visible = false
    
    //从内存加载资源
    id = resources['./image/sprite1.json'].textures
    id_2 = resources['./image/sprite2.json'].textures

    //获取整个地图精灵
    map = new Sprite(id['background1.png'])
    //将地图添加到游戏场景中
    gameScene.addChild(map)
    map.interactive = true

    //获取人物精灵
    explorer = new Sprite(id['explorer1.png'])
    //设置位置,锚点居中,速度
    // explorer.position.set(650,160)
    explorer.position.set(300,160)
    explorer.anchor.x = 0.5;
    explorer.anchor.y = 0.5;
    explorer.vx = 0
    explorer.vy = 0
    //开启交互
    // explorer.interactive = true
    gameScene.addChild(explorer)

    //绘制遮罩层
    mask  = new Graphics();
    mask.beginFill(0xffffff);
    mask.drawRoundedRect(0,0,98,98,50)
    mask.endFill();
    //获取边界框
    const bounds = mask.getBounds()
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    //设置锚点
    mask.pivot.x = centerX
    mask.pivot.y = centerY
    gameScene.addChild(mask)

    //将地图的遮罩层设置为circle
    map.mask = mask

    //鼠标点击
    map.on('click',getClickPosition)

    //加载门
    loadDoor()

    //给每个门绑定点击事件
    for (let i = 0;i < doors.length;i++) {
        doors[i].interactive = true
        doors[i].on('click',enterRoom)
    }

    //加载路径
    loadRoad()

    //加载房间
    loadRoom()

    //加载游戏数据并设置房间中的物件
    loadData()

    //设置传送场景
    setTransScene()

    //给场景添加点击事件用于传送
    setTransSceneClick()

    //back命令
    back.addEventListener('click',backRoom)
    //look命令
    look.addEventListener('click',lookRoom)
    //传送命令
    transmit.addEventListener('click',transRoom)
    //tack命令
    take.addEventListener('click',takeSomething)
    //drop命令
    drop.addEventListener('click',dropSomething)
    //items命令
    items.addEventListener('click',itemsMsg)


    //键盘移动
    let left = keyboard('ArrowLeft')
    let right = keyboard('ArrowRight')
    let up = keyboard('ArrowUp')
    let down = keyboard('ArrowDown')

    left.press = function() {
        //Change the explorer's velocity when the key is pressed
        explorer.vx = -5;
        explorer.vy = 0;
    };

    left.release = function() {
        if (!right.isDown && explorer.vy === 0) {
            explorer.vx = 0;
        }
    };

    up.press = function() {
        explorer.vy = -5;
        explorer.vx = 0;
    };
    up.release = function() {
        if (!down.isDown && explorer.vx === 0) {
            explorer.vy = 0;
        }
    };

    right.press = function() {
        explorer.vx = 5;
        explorer.vy = 0;
    };
    right.release = function() {
        if (!left.isDown && explorer.vy === 0) {
            explorer.vx = 0;
        }
    };

    down.press = function() {
        explorer.vy = 5;
        explorer.vx = 0;
    };
    down.release = function() {
        if (!up.isDown && explorer.vx === 0) {
            explorer.vy = 0;
        }
    };




    //设置游戏状态
    state = play;
    
    //设置游戏循环 
    app.ticker.add((delta) => gameLoop(delta));

}

function gameLoop(delta) {
    state(delta)
}

function play(delta) {
    explorer.x += explorer.vx
    explorer.y += explorer.vy
    //更新探险者的位置,并约束探险者
    c.update()
    //同步探险者和周围的视野
    syn_cir_exp(explorer.x,explorer.y)
}

//给传送场景添加点击事件
function setTransSceneClick() {
    pub.interactive = true
    pub.on('click',function () {
        //设置探险者坐标
        explorer.x = rooms[0].x + rooms[0].width / 2
        explorer.y = rooms[0].y + rooms[0].height / 2
        explorerInDoor = true
        //修改当前房间并显示
        current_room = 'pub'
        changeToGameScene(current_room)
    })

    outside.interactive = true
    outside.on('click',function () {
        explorer.x = rooms[1].x + rooms[1].width / 2
        explorer.y = rooms[1].y + rooms[1].height / 2
        explorerInDoor = true
        current_room = 'outside'
        changeToGameScene(current_room)
    })

    lab.interactive = true
    lab.on('click',function () {
        explorer.x = rooms[2].x + rooms[2].width / 2
        explorer.y = rooms[2].y + rooms[2].height / 2
        explorerInDoor = true
        current_room = 'lab'
        changeToGameScene(current_room)
    })

    office.interactive = true
    office.on('click',function () {
        explorer.x = rooms[3].x + rooms[3].width / 2
        explorer.y = rooms[3].y + rooms[3].height / 2
        explorerInDoor = true
        current_room = 'office'
        changeToGameScene(current_room)
    })

    theater.interactive = true
    theater.on('click',function () {
        explorer.x = rooms[4].x + rooms[4].width / 2
        explorer.y = rooms[4].y + rooms[4].height / 2
        explorerInDoor = true
        current_room = 'theater'
        changeToGameScene(current_room)
    })
}

//切换回游戏场景,输出当前房间,记录经过的房间
function changeToGameScene(room) {
    //切换场景
    transScene.visible = false
    gameScene.visible = true
    //输出
    showCurrentRoom()
    //记录
    savePassRoom(room)
    text.innerHTML = `传送到房间：${current_room}`
}

//back命令
function backRoom() {
    if (passRooms.length > 0) {
        current_room = passRooms.pop()
        showCurrentRoom()
        //返回上一个房间
        for (let i = 0;i < rooms.length;i++) {
            if (rooms[i].room_name === current_room) {
                explorer.x = rooms[i].x + rooms[i].width / 2
                explorer.y = rooms[i].y + rooms[i].height / 2
                explorerInDoor = true
                break
            }
        }
        text.innerHTML = `返回上一房间${current_room}`
    } else if (passRooms.length === 0) { //将玩家带回起点
        current_room = 'outside'
        showCurrentRoom()
        explorer.x = rooms[1].x + rooms[1].width / 2
        explorer.y = rooms[1].y + rooms[1].height / 2
        explorerInDoor = true
        text.innerHTML = `回到起点：${current_room}`
    }
}
function lookRoom() {
    printRoom()
}

//transmit命令
function transRoom() {
    gameScene.visible = false
    transScene.visible = true
}

//take命令
function takeSomething() {
    for (let i = 0;i < rooms.length;i++) {
        if (rooms[i].room_name === current_room) {
            text.innerHTML = '<button class="btn1">拾取物品</button>'
            document.querySelector('.bottom .text .btn1').addEventListener('click',function () {
                //拾取房间的物件
                pickUp(rooms[i])
            })
        }
    }
}

//拾取物件
function pickUp(room) {
    text.innerHTML = '输入拾取的物品数量：\n' +
        '        金币：<input class="gold" type="text"><br>' +
        '        银币：<input class="silver" type="text">\n' +
        '        铜币：<input class="copper" type="text"><button class="sub">提交</button>'

    const btn = document.querySelector('.bottom .text .sub')
    btn.addEventListener('click',function () {
        const goldNum = document.querySelector('.bottom .text .gold').value
        const silverNum = document.querySelector('.bottom .text .silver').value
        const copperNum = document.querySelector('.bottom .text .copper').value

        if (room.gold < goldNum || room.silver < silverNum || room.copper < copperNum) {
            alert('物品数量不足，重新输入(可使用look命令查看房间中物件数量)')
        } else {
            let sum = goldNum * room.g_wei + silverNum * room.s_wei + copperNum * room.c_wei
            if (explorer.capacity >= sum) {
                //要拿走的重量比背包容量小
                room.gold -= goldNum
                room.silver -= silverNum
                room.copper -= copperNum

                explorer.gold += +goldNum
                explorer.silver += +silverNum
                explorer.copper += +copperNum

                explorer.capacity -= sum
                itemsInExplorer += +sum
                inPack.innerHTML = `${itemsInExplorer}`
                pack.innerHTML = `${explorer.capacity}`
                // text.innerHTML = ''
            }else {
                alert('背包容量不足，重新输入')
            }
        }
    })
}

//drop命令
function dropSomething() {
    for (let i = 0;i < rooms.length;i++) {
        if (rooms[i].room_name === current_room) {
            text.innerHTML = `玩家携带的：金币${explorer.gold}个，银币${explorer.silver}个，铜币${explorer.copper}个<br>丢弃物件：`+'金币：<input class="gold" type="text">\n银币<input class="silver" type="text">' +
                '\n铜币：<input class="copper" type="text">\n<button class="sub">提交结果</button>'
            //
            const btn = document.querySelector('.bottom .text .sub')
            btn.addEventListener('click',function () {
                //丢弃数量
                const goldNum = document.querySelector('.bottom .text .gold').value
                const silverNum = document.querySelector('.bottom .text .silver').value
                const copperNum = document.querySelector('.bottom .text .copper').value
                if (explorer.gold < +goldNum || explorer.silver < +silverNum || explorer.copper < +copperNum) {
                    alert('玩家携带物件不足')
                } else {
                    //总的丢弃重量
                    let sum = goldNum * rooms[i].g_wei + silverNum * rooms[i].s_wei + copperNum * rooms[i].c_wei

                    rooms[i].gold += +goldNum
                    rooms[i].silver += +silverNum
                    rooms[i].copper += +copperNum
                    explorer.gold -= goldNum
                    explorer.silver -= silverNum
                    explorer.copper -= copperNum

                    explorer.capacity += +sum
                    itemsInExplorer -= sum
                    inPack.innerHTML = `${itemsInExplorer}`
                    pack.innerHTML = `${explorer.capacity}`
                    // text.innerHTML = ''
                }
            })
        }
    }
}

//items命令
function itemsMsg() {
    console.log('你好你好')
    for (let i = 0;i < rooms.length;i++) {
        if (rooms[i].room_name === current_room) {
            text.innerHTML = `房间中金币${rooms[i].gold}个，银币${rooms[i].silver}个，铜币${rooms[i].copper}个<br>` +
                `玩家携带金币${explorer.gold}个，银币${explorer.silver}个，铜币${explorer.copper}个`
        }
    }
}


//同步circle和探险者的位置：circle根据explorer的位置定位
function syn_cir_exp(explorerX,explorerY) {
    mask.position.set(explorerX,explorerY)
}

function loadData() {
    //从后端获取数据
    axios.get('/games/data').then(function (res) {
        if (21 === res.data.code) {
            gameData = res.data.data
        }
        setUpItems()
    })
}

//随机设置物件的数量
function setUpItems() {
    explorer.gold = 0
    explorer.silver = 0
    explorer.copper = 0
    //生成每个房间的物件数量
    for (let i = 0;i < rooms.length;i++) {
        rooms[i].gold = Math.floor(Math.random() * 10); //金币数量
        rooms[i].silver = Math.floor(Math.random() * 10); //银币数量
        rooms[i].copper = Math.floor(Math.random() * 10); //铜币数量

        let gold = new Sprite(id_2['gold.png'])
        gold.position.set(rooms[i].x + 15,rooms[i].y + 15)
        map.addChild(gold)
        let silver = new Sprite(id_2['silverCoin.png'])
        silver.position.set(rooms[i].x + 45,rooms[i].y + 15)
        map.addChild(silver)
        let copper = new Sprite(id_2['cu.png'])
        copper.position.set(rooms[i].x + 70,rooms[i].y + 15)
        map.addChild(copper)
        rooms[i].goldSpirte = gold
        rooms[i].silverSpirte = silver
        rooms[i].copperSpirte = copper
        //计算每个房间的物件重量，设置物件描述
        rooms[i].g_des = gameData.gold_description
        rooms[i].g_wei = gameData.gold_weight
        rooms[i].s_des = gameData.silver_description
        rooms[i].s_wei = gameData.silver_weight
        rooms[i].c_des = gameData.copper_description
        rooms[i].c_wei = gameData.copper_weight
    }
    //设置玩家的负重
    explorer.capacity = gameData.capacity
    pack.innerHTML = `${explorer.capacity}`
    magic_cookie = gameData.magic_cookie
    //设置饼干
    cookie1 = new Sprite(id_2['magicCookie.png'])
    cookie2 = new Sprite(id_2['magicCookie.png'])
    cookie1.position.set(100,100)
    map.addChild(cookie1)
    cookie2.position.set(750,125)
    map.addChild(cookie2)
    cookie1.interactive = true
    cookie2.interactive = true
    cookie1.on('click',function () {
        explorer.capacity += magic_cookie
        pack.innerHTML = `${explorer.capacity}`
        this.visible = false
    })
    cookie2.on('click',function () {
        explorer.capacity += magic_cookie
        pack.innerHTML = `${explorer.capacity}`
        this.visible = false
    })
}
function mac() {

}

//展示房间物件的数量
function printRoom() {
    for (let i = 0;i < rooms.length;i++) {
        if (rooms[i].room_name === current_room) {
            text.innerHTML = `当前房间${current_room}。\n
            金币：${rooms[i].gold}个，重量：${rooms[i].gold * rooms[i].g_wei}。\n
            银币：${rooms[i].silver}个，重量：${rooms[i].silver * rooms[i].s_wei}。\n
            铜币：${rooms[i].copper}个，重量：${rooms[i].copper * rooms[i].c_wei}。`
        }
    }
}

//获取鼠标点击的位置，检测碰撞，把探险者约束在道路和房间中
function getClickPosition(event) {
    //获取鼠标点击的位置
    const clickPosition = event.data.getLocalPosition(map);
    console.log(clickPosition);

    if (!explorerInDoor) {
        //判定是否与道路发生碰撞
        //true:可以移动；false:不可到达
        for (let i = 0;i < road_sprite.length;i++) {
            if (hitTestRectangle({x: clickPosition.x, y: clickPosition.y},road_sprite[i])) {
                //以平滑的方式滑动到目的点
                c.slide(explorer,clickPosition.x, clickPosition.y,10,'smoothstep')
                explorer.x = clickPosition.x
                explorer.y = clickPosition.y
            }
        }
    } else {
        for (let i = 0;i < rooms.length;i++) {
            if (hitTestRectangle({x:clickPosition.x,y:clickPosition.y},rooms[i])) {
                c.slide(explorer,clickPosition.x, clickPosition.y,10,'smoothstep')
                explorer.x = clickPosition.x
                explorer.y = clickPosition.y
            }
        }
    }
}

//加载所有路的坐标并创建精灵
function loadRoad() {
    let road_all_data = []
    //road1
    let road = {
        x_min: 230,
        x_max: 615,
        y_min: 100,
        y_max: 190
    }
    road_all_data.push(road)
    //road2
    road = {
        x_min: 430,
        x_max: 515,
        y_min: 180,
        y_max: 535
    }
    road_all_data.push(road)
    //road3
    road = {
        x_min: 260,
        x_max: 373,
        y_min: 280,
        y_max: 330
    }
    road_all_data.push(road)
    //road4
    road = {
        x_min: 324,
        x_max: 380,
        y_min: 300,
        y_max: 488
    }
    road_all_data.push(road)
    //road5
    road = {
        x_min: 84,
        x_max: 450,
        y_min: 488,
        y_max: 535
    }
    road_all_data.push(road)
    //road6
    road = {
        x_min: 520,
        x_max: 780,
        y_min: 380,
        y_max: 476
    }
    road_all_data.push(road)
    //road7
    road = {
        x_min: 636,
        x_max: 706,
        y_min: 297,
        y_max: 385
    }
    road_all_data.push(road)
    //road8
    road = {
        x_min: 480,
        x_max: 1020,
        y_min: 235,
        y_max: 280
    }
    road_all_data.push(road)
    //road9
    road = {
        x_min: 930,
        x_max: 1020,
        y_min: 160,
        y_max: 240
    }
    road_all_data.push(road)
    //road10
    road = {
        x_min: 935,
        x_max: 1263,
        y_min: 80,
        y_max: 143
    }
    road_all_data.push(road)
    //road11
    road = {
        x_min: 1160,
        x_max: 1263,
        y_min: 140,
        y_max: 230
    }
    road_all_data.push(road)
    //road12
    road = {
        x_min: 865,
        x_max: 1263,
        y_min: 28,
        y_max: 120
    }
    road_all_data.push(road)

    let rectangle
    //依据以上矩形数据绘制矩形精灵
    for (let i = 0;i < road_all_data.length;i++) {
        rectangle = new Graphics()
        rectangle.lineStyle(1,0xffffff,1)
        //绘制矩形
        rectangle.beginFill(0xffffff)
        rectangle.drawRect(0,0,road_all_data[i].x_max - road_all_data[i].x_min,
            road_all_data[i].y_max - road_all_data[i].y_min)
        rectangle.endFill()
        rectangle.x = road_all_data[i].x_min
        rectangle.y = road_all_data[i].y_min
        // gameScene.addChild(rectangle)
        road_sprite.push(rectangle)
    }
}

//将门设置到地图上
function loadDoor() {
    let door
    //door需要设置到map中才会被遮罩
    //door1
    door = new Sprite(id['door.png'])
    door.position.set(200,100)
    door.name = 'pub'
    //通过点击门定位探险者到房间
    door.position_x = 171
    door.position_y = 112
    //点击门定位探险者到房间外
    door.position_out_x = 250
    door.position_out_y = 115
    map.addChild(door)
    doors.push(door)

    //door2
    door = new Sprite(id['door.png'])
    door.position.set(610,160)
    door.name = 'outside'
    door.position_x = 661
    door.position_y = 176
    //点击门定位探险者到房间外
    door.position_out_x = 580
    door.position_out_y = 165
    door.scale.set(1.2,1.2)
    map.addChild(door)
    doors.push(door)

    //door3
    door = new Sprite(id['door.png'])
    door.name = 'outside'
    door.position_x = 800
    door.position_y = 30
    //点击门定位探险者到房间外
    door.position_out_x = 878
    door.position_out_y = 48
    door.position.set(830,50)
    map.addChild(door)
    doors.push(door)
    
    //door4
    door = new Sprite(id['door.png'])
    door.name = 'lab'
    door.position_x = 100
    door.position_y = 400
   //点击门定位探险者到房间外
    door.position_out_x = 100
    door.position_out_y = 475
    door.position.set(100,430)
    map.addChild(door)
    doors.push(door)

    //door5
    door = new Sprite(id['door.png'])
    door.name = 'lab'
    door.position_x = 220
    door.position_y = 280
    //点击门定位探险者到房间外
    door.position_out_x = 285
    door.position_out_y = 295
    door.position.set(235,290)
    map.addChild(door)
    doors.push(door)

    //door6
    door = new Sprite(id['door.png'])
    door.name = 'office'
    door.position_x = 826
    door.position_y = 380
    //点击门定位探险者到房间外
    door.position_out_x = 750
    door.position_out_y = 390
    door.position.set(780,380)
    map.addChild(door)
    doors.push(door)

    //door7
    door = new Sprite(id['door.png'])
    door.name = 'theater'
    door.position_x = 1247
    door.position_y = 270
    //点击门定位探险者到房间外
    door.position_out_x = 1245
    door.position_out_y = 214
    door.position.set(1240,230)
    map.addChild(door)
    doors.push(door)
}

function enterRoom() {
    if (!explorerInDoor) {
        //进入房间
        current_room = this.name
        showCurrentRoom()
        c.slide(explorer,this.position_x,this.position_y,60,'smoothstep',false,1000)
        //淡出
        explorer.x = this.position_x
        explorer.y = this.position_y
        explorerInDoor = true
        //保存经过的房间
        savePassRoom(this.name)
        text.innerHTML = `进入房间：${current_room}`
    } else {
        //出房间
        currentRoom.innerHTML = ''
        c.slide(explorer,this.position_out_x,this.position_out_y,60,'smoothstep',false,1000)
        //淡出
        explorer.x = this.position_out_x
        explorer.y = this.position_out_y
        explorerInDoor = false

    }
}

//保存经过的房间，不允许重复
function savePassRoom(room) {
    let has = false //不允许passRoom中的值重复
    for (let i = 0;i < passRooms.length;i++) {
        if (passRooms[i] === room) {
            has = true
            break
        }
    }
    if (!has) {
        passRooms.push(room)
    }
}

//将当前房间显示到页面上
function showCurrentRoom() {
    currentRoom.innerHTML = current_room
}

//设置传送场景
function setTransScene() {
    pub = new Sprite(id_2['pub.png'])
    pub.position.set(100,100)
    outside = new Sprite(id_2['outside.png'])
    outside.position.set(150,100)
    theater = new Sprite(id_2['theater.png'])
    theater.position.set(200,100)
    lab = new Sprite(id_2['lab.png'])
    lab.position.set(100,150)
    office = new Sprite(id_2['office.png'])
    office.position.set(150,150)
    transScene.addChild(pub)
    transScene.addChild(outside)
    transScene.addChild(theater)
    transScene.addChild(lab)
    transScene.addChild(office)
}

//加载房间
function loadRoom() {
    //临时存储room对象
    let room_temp = []
    let room
    //pub
    room = {
        x_min: 5,
        x_max: 205,
        y_min: 25,
        y_max: 190,
        room_name: 'pub',
    }
    room_temp.push(room)
    //outside
    room = {
        x_min: 622,
        x_max: 840,
        y_min: 15,
        y_max: 190,
        room_name: 'outside'
    }
    room_temp.push(room)
    //lab
    room = {
        x_min: 40,
        x_max: 245,
        y_min: 256,
        y_max: 440,
        room_name: 'lab'
    }
    room_temp.push(room)
    //office
    room = {
        x_min: 800,
        x_max: 1010,
        y_min: 345,
        y_max: 522,
        room_name: 'office'
    }
    room_temp.push(room)
    //theater
    room = {
        x_min: 1090,
        x_max: 1275,
        y_min: 265,
        y_max: 425,
        room_name: 'theater'
    }
    room_temp.push(room)
    let rectangle
    for (let i = 0; i < room_temp.length; i++) {
        rectangle = new Graphics()
        rectangle.beginFill(0xffffff)
        rectangle.drawRect(0,0,room_temp[i].x_max - room_temp[i].x_min,
            room_temp[i].y_max - room_temp[i].y_min)
        rectangle.endFill()
        rectangle.x = room_temp[i].x_min
        rectangle.y = room_temp[i].y_min
        rectangle.room_name = room_temp[i].room_name
        rooms.push(rectangle)
    }

}

//保存游戏
save.addEventListener('click',function () {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('username1');
    axios.post('/games/saveData',{
        username: myParam,
        exCurrentRoom: current_room
    }).then(function (res) {
        alert(res.data.msg)
        location.href='../login.html'
    })
})

//键盘移动
function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }

//碰撞检测
function hitTestRectangle(r1,r2) {
    //r1为鼠标点击的点，r2为精灵
    let vx,vy
    let hit = false
    //求出r2中心点
    r2.centerX = r2.x + r2.width / 2 //579
    r2.centerY = r2.y + r2.height / 2 //146
    vx = r1.x - r2.centerX //282
    vy = r1.y - r2.centerY //-1

    if (Math.abs(vx) < r2.width / 2) {
        if (Math.abs(vy) < r2.height / 2) {
            hit = true
        } else {
            hit = false
        }
    } else {
        hit = false
    }
    return hit
}

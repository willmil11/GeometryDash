//Functions.js script
//

var Cooldown = true;
var RotateCooldown = false;
var ips = false;
var ipscounter = 0;
var ipscounter_ = "...";
var ipswait = 0;
var fallcheck = false;

function Toogleips(){
    if (ips){
        ips = false;
    }
    else{
        ips = true;
    }
}

function mainthreadpause(ms) {
    var date = Date.now();
    var currentDate = Date.now();
    while ((currentDate - date) < ms) {
        currentDate = Date.now();
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function BuildApp() {
    document.body.innerHTML = "";
    document.body.style.overflow = "hidden";
    document.title = "Geometry Dash";
    document.body.style.backgroundColor = "rgb(26, 26, 25)";
    document.body.style.margin = "0px";
    document.body.style.padding = "0px";
    document.body.innerHTML += ("<canvas id='renderer' width='" + window.innerWidth + "' height='" + window.innerHeight + "'><div id='renderer_error'></div></canvas>");
    var renderer_error_div = document.getElementById("renderer_error");
    renderer_error_div.style.backgroundColor = "rgb(0, 0, 0)";
    renderer_error_div.style.width = ((window.innerWidth / 2) + "px");
    renderer_error_div.style.height = ((window.innerHeight / 4) + "px");
    renderer_error_div.style.marginTop = ((window.innerHeight / 8) + "px");
    renderer_error_div.innerHTML += "<font color='white' face='arial'><center><big><big><big>Can't load renderer :(</big></big></big></center></font>";
    document.body.style.backgroundImage = "url(https://d2zia2w5autnlg.cloudfront.net/352/618cff3e20616-large)";
    document.body.style.backgroundSize = "cover";
}

async function Render() {
        var renderer_element = document.getElementById("renderer");
        var renderer = renderer_element.getContext("2d");
        //Clearing the renderer
        renderer.clearRect(0, 0, window.innerWidth, window.innerHeight);
        //Render ground
        renderer.fillStyle = "rgb(20, 50, 100)";
        renderer.fillRect(0, (window.innerHeight - 19), window.innerWidth, 20);
        renderer.fillStyle = "white";
        renderer.fillRect(0, (window.innerHeight - 19), window.innerWidth, 1);
        //Render the player
        renderer.save();
        renderer.translate((Player.pos.x + 25), (Player.pos.y + 25));
        renderer.rotate((Math.PI / 180) * Player.pos.rotation);
        renderer.translate(-(Player.pos.x + 25), -(Player.pos.y + 25));

        renderer.fillStyle = "yellow";
        renderer.fillRect(Player.pos.x, Player.pos.y, 50, 50);
        renderer.fillStyle = "rgb(82, 229, 255)";
        renderer.fillRect((Player.pos.x + 12.5), (Player.pos.y + 12.5), 10, 10);
        renderer.fillRect((Player.pos.x + (25 + (12.5 / 2))), (Player.pos.y + 12.5), 10, 10);
        renderer.fillRect((Player.pos.x + 12.5), (Player.pos.y + (25 + (12.5 / 2))), 28, 10);
        renderer.fillStyle = "black"
        renderer.fillRect((Player.pos.x - 1), Player.pos.y, 52, 2);
        renderer.fillRect((Player.pos.x - 2), Player.pos.y, 2, 51);
        renderer.fillRect((Player.pos.x - 2), (Player.pos.y + 50), 52, 2);
        renderer.fillRect((Player.pos.x + 50), (Player.pos.y + 52), 2, -52)
        renderer.restore();
        //Obstacles
        var index = 0;
        while (index < (Object.keys(Obstacles).length)){
            indexkey = Object.keys(Obstacles)[index];
            eval(("renderer.fillStyle = Obstacles." + indexkey + ".color"));
            eval(("renderer.fillRect(Obstacles." + indexkey + ".pos.x, Obstacles." + indexkey + ".pos.y, Obstacles." + indexkey + ".sizes.w, Obstacles." + indexkey + ".sizes.h)"));
            var Obstaclex = eval(("Obstacles." + indexkey + ".pos.x"))
            var Obstacley = eval(("Obstacles." + indexkey + ".pos.y"))
            var Obstaclew = eval(("Obstacles." + indexkey + ".hitboxes.w"));
            var Obstacleh = eval(("Obstacles." + indexkey + ".hitboxes.h"));
            var result = eval(("CheckPlayerColisions(" + Obstaclex + ", " + Obstacley + ", " + Obstaclew + ", " + Obstacleh + ")"));
            if (result){
                document.body.innerHTML = "";
                document.body.innerHTML += "<center><div id='content'></div></center>"
                var center = document.getElementById("content");
                center.style.height = ((window.innerHeight / 8) + "px");
                center.style.width = ((window.innerWidth / 2) + "px");
                center.style.marginTop = (((window.innerHeight / 2) - center.offsetHeight) + "px");
                center.style.backgroundColor = "rgb(21, 21, 20)";
                center.innerHTML = "<font color='white' face='arial'><strong><div id='text'></div></strong></font>"
                var text = document.getElementById("text");
                text.style.fontSize = ((window.innerHeight / 10) + "px");
                text.innerHTML = "Game over";
                await wait(300);
                text.innerHTML = "3";
                await wait(1000);
                text.innerHTML = "2";
                await wait(1000);
                text.innerHTML = "1";
                await wait(1000);
                await Reset();
                document.body.innerHTML = "";
                document.body.style.backgroundImage = "";
                document.body.style.backgroundColor = "rgb(0, 0, 0)";
            }
            index += 1;
        }
        var index = 0;
        while (index < (Object.keys(decorations).length)){
            indexkey = Object.keys(decorations)[index];
            eval(("renderer.fillStyle = decorations." + indexkey + ".color"));
            eval(("renderer.fillRect(decorations." + indexkey + ".pos.x, decorations." + indexkey + ".pos.y, decorations." + indexkey + ".sizes.w, decorations." + indexkey + ".sizes.h)"));
            var decox = eval(("decorations." + indexkey + ".pos.x"));
            var decoy = eval(("decorations." + indexkey + ".pos.y"));
            var decow = eval(("decorations." + indexkey + ".hitboxes.w"));
            var decoh = eval(("decorations." + indexkey + ".hitboxes.h"));
            var result = eval(("CheckPlayerColisions(" + decox + ", " + decoy + ", " + decow + ", " + decoh + ")"));
            if (result){
                Player.ground = (decoy - (decoh * 3.5));
                check = true;
            }
            index += 1;
        }
        //Render skins
        var index = 0;
        while (index < (Object.keys(skins).length)){
            indexkey = Object.keys(skins)[index];
            var toexe = eval(("skins." + indexkey + ".code"));
            eval(toexe);
            index += 1;
        }
        //Ips (Iteration per second) counter
        if (ips){
            ipscounter += 1;
            ipswait = 0;
            renderer.fillStyle = "rgb(21, 21, 20)";
            renderer.fillRect((window.innerWidth / 1.1), 0, (window.innerWidth - (window.innerWidth / 1.1)), (window.innerHeight - (window.innerHeight / 1.05)))
            renderer.font = ((window.innerWidth / 42) + "px Arial");
            renderer.fillStyle = "white";
            renderer.fillText((`${ipscounter_}` + " ips"), (window.innerWidth / 1.09), 13)
        }
    }


function Reset() {
    location.reload();
}

var Player = {
    lastrandom: undefined,
    ground: (window.innerHeight - 71),
    pos: {
        x: (window.innerWidth / 32),
        y: (window.innerHeight - 71),
        rotation: 0
    },
    rotate: async function () {
        var index = 0;
        while (index < (360)) {
            if (RotateCooldown === false) {
                Player.pos.rotation += 1;
                index += 1;
                await wait(10)
            }
            else{
                await wait(1);
            }
        }
        Player.pos.rotation = 0;
    },
    jumpheight: 167,
    jump: async function () {
        if (Cooldown === false) {
            RotateCooldown = false;
            Cooldown = true;
            Player.rotate();
            while (Player.pos.y > (Player.ground - Player.jumpheight)) {
                Player.pos.y = Player.pos.y - 4;
                RotateCooldown = true;
                Render();
                RotateCooldown = false;
                await wait(1);
            }
            while (Player.pos.y < Player.ground) {
                Player.pos.y += 4;
                RotateCooldown = true;
                await Render();
                RotateCooldown = false;
                await wait(5);
            }
            RotateCooldown = true;
            //Random square rotation at end of jump animation
            var random = Math.floor(Math.random() * 4);
            if (Player.lastrandom === undefined){
                Player.lastrandom = random;
            }
            else{
                while (random === Player.lastrandom){
                    random = Math.floor(Math.random() * 4)
                }
                Player.lastrandom = random;
            }
            if (random === 1){
                Player.pos.rotation = 0;
            }
            else{
                if (random === 2){
                    Player.pos.rotation = 90;
                }
                else{
                    if (random === 3){
                        Player.pos.rotation = 180;
                    }
                    else{
                        if (random === 0){
                            Player.pos.rotation = 270;
                        }
                    }
                }
            }
            Render();
            Cooldown = false;
        }
    }
};

var Player_ = Player;

var Obstacles = {
    _1: {
        color: "black",
        pos: {
            x: (window.innerWidth / 1.3),
            y: (window.innerHeight - 40)
        },
        sizes: {
            w: 0,
            h: 0
        },
        hitboxes: {
            w: 25,
            h: 20
        }
    },
    _2: {
        color: "black",
        pos: {
            x: (window.innerWidth * 1.7),
            y: (window.innerHeight - 40)
        },
        sizes: {
            w: 0,
            h: 0
        },
        hitboxes: {
            w: 25,
            h: 20
        }
    },
    _3: {
        color: "black",
        pos: {
            x: ((window.innerWidth * 1.7) + 25),
            y: (window.innerHeight - 70)
        },
        sizes: {
            w: 0,
            h: 0
        },
        hitboxes: {
            w: 25,
            h: 50
        }
    },
    _4: {
        color: "black",
        pos: {
            x: (window.innerWidth * 2.7),
            y: (window.innerHeight - 70)
        },
        sizes: {
            w: 0,
            h: 0
        },
        hitboxes: {
            w: 25,
            h: 50
        }
    },
    _5: {
        color: "black",
        pos: {
            x: ((window.innerWidth * 2.7) + 25),
            y: (window.innerHeight - 70)
        },
        sizes: {
            w: 0,
            h: 0
        },
        hitboxes: {
            w: 25,
            h: 50
        }
    },
    _6: {
        color: "rgba(10,21,74,255)",
        pos: {
            x: (((window.innerWidth * 2.7) + 25) + 27),
            y: (window.innerHeight - 70)
        },
        sizes: {
            w: 1,
            h: 47,
        },
        hitboxes: {
            w: 1,
            h: 47
        }   
    },
    _7: {
        color: "black",
        pos: {
            x: (((window.innerWidth * 2.7) + 25) + 25 * 3),
            y: (window.innerHeight - 25)
        },
        sizes: {
            w: 0,
            h: 0,
        },
        hitboxes: {
            w: 100,
            h: 5
        }   
    },
    _8: {
        color: "rgba(10,21,74,255)",
        pos: {
            x: (((window.innerWidth * 2.7) + 25) + (25 * 7) + 7),
            y: (window.innerHeight - 117)
        },
        sizes: {
            w: 1,
            h: 97,
        },
        hitboxes: {
            w: 1,
            h: 97
        }   
    },
    _9: {
        color: "rgba(10,21,74,255)",
        pos: {
            x: (((window.innerWidth * 2.7) + 25) + (25 * 12) + 7),
            y: (window.innerHeight - 147)
        },
        sizes: {
            w: 1,
            h: 127,
        },
        hitboxes: {
            w: 1,
            h: 127
        }   
    },
    _10: {
        color: "black",
        pos: {
            x: (((window.innerWidth * 2.7) + 25) + 25 * 9),
            y: (window.innerHeight - 25)
        },
        sizes: {
            w: 0,
            h: 0,
        },
        hitboxes: {
            w: 100,
            h: 5
        }   
    }
}

var Obstacles_ = Obstacles;

var decorations = {
    _1: {
        color: "rgba(10,21,74,255)",
        pos: {
            x: (((window.innerWidth * 2.7) + 25) + 27),
            y: (window.innerHeight - 70)
        },
        sizes: {
            w: 50,
            h: 50,
        },
        hitboxes: {
            w: 50,
            h: 50
        }
    },
    _2: {
        color: "rgba(10,21,74,255)",
        pos: {
            x: (((window.innerWidth * 2.7) + 25) + (25 * 7) + 7),
            y: (window.innerHeight - 120)
        },
        sizes: {
            w: 50,
            h: 100,
        },
        hitboxes: {
            w: 50,
            h: 100
        }
    },
    _3: {
        color: "rgba(10,21,74,255)",
        pos: {
            x: (((window.innerWidth * 2.7) + 25) + (25 * 12) + 7),
            y: (window.innerHeight - 140)
        },
        sizes: {
            w: 50,
            h: 120,
        },
        hitboxes: {
            w: 50,
            h: 120
        }
    }
}

var decorations_ = decorations;

var skins = {
    _1: {
        code: ("renderer.fillStyle = 'rgba(11,21,79,255)';\nrenderer.beginPath();\nrenderer.moveTo(" + (Obstacles._1.pos.x + Obstacles._1.hitboxes.w) + ", " + (Obstacles._1.pos.y + Obstacles._1.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._1.pos.x + (Obstacles._1.hitboxes.w / 2)) + ", " + Obstacles._1.pos.y + ");\nrenderer.lineTo(" + (Obstacles._1.pos.x - (Obstacles._1.hitboxes.w / 11)) + ", " + (Obstacles._1.pos.y + Obstacles._1.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._1.pos.x) + ", " + (Obstacles._1.pos.y + Obstacles._1.hitboxes.h) + ");\nrenderer.fill();\nrenderer.endPath();")
    },
    _2: {
        code: undefined
    },
    _3: {
        code: undefined
    },
    _4: {
        code: undefined
    },
    _5: {
        code: undefined
    },
    _7: {
        code: undefined
    },
    _10: {
        code: undefined
    }
}

function CheckPlayerColisions(Obstaclex, Obstacley, Obstaclew, Obstacleh){
    if (Player.pos.x + 50 >= Obstaclex && Player.pos.x <= Obstaclex + Obstaclew && Player.pos.y + 50 >= Obstacley && Player.pos.y<= Obstacley + Obstacleh){
        return true;
    }
}

//Make the player go straight
setInterval(function(){
    if (Player.pos.x < (window.innerWidth / 3.5)){
        if (window.innerWidth <= 500){
            Player.pos.x += 2;
        }
        else{
            if (window.innerWidth <= 1000){
                Player.pos.x += 3;
            }
            else{
                Player.pos.x += 4;
            }
        }
    }
    Render();
    var index = 0;
    var index2 = 0;
    while (index < (Object.keys(decorations).length)){
        indexkey = Object.keys(decorations)[index];
        var decox = eval(("decorations." + indexkey + ".pos.x"));
        var decoy = eval(("decorations." + indexkey + ".pos.y"));
        var decow = eval(("decorations." + indexkey + ".hitboxes.w"));
        var decoh = eval(("decorations." + indexkey + ".hitboxes.h"));
        var result = eval(("CheckPlayerColisions(" + decox + ", " + decoy + ", " + decow + ", " + decoh + ")"));
        if (!result){
            index2 += 1;
        }
        if (index2 === (Object.keys(decorations).length)){
            Player.ground = (window.innerHeight - 71);
            if (check){
                check = false;
                Player.jump();
            }
        }
        index += 1;
    }
}, 5);

setInterval(function(){
    if (ips){
        ipscounter_ = ipscounter;
        ipscounter = 0;
    }
}, 1005);

var once = false;

requestAnimationFrame(Render)

var indexkey = "";
setInterval(function(){
    if ((parseInt(Player.pos.x)) >= ((parseInt(window.innerWidth / 3.5)))){
        if (!once){
            once = true;
            Cooldown = false;
        }
        //skins moves
        skins._1.code = ("renderer.fillStyle = 'rgba(11,21,79,255)';\nrenderer.beginPath();\nrenderer.moveTo(" + (Obstacles._1.pos.x + Obstacles._1.hitboxes.w) + ", " + (Obstacles._1.pos.y + Obstacles._1.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._1.pos.x + (Obstacles._1.hitboxes.w / 2)) + ", " + Obstacles._1.pos.y + ");\nrenderer.lineTo(" + (Obstacles._1.pos.x - (Obstacles._1.hitboxes.w / 11)) + ", " + (Obstacles._1.pos.y + Obstacles._1.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._1.pos.x) + ", " + (Obstacles._1.pos.y + Obstacles._1.hitboxes.h) + ");\nrenderer.fill();")
        skins._2.code = ("renderer.fillStyle = 'rgba(11,21,79,255)';\nrenderer.beginPath();\nrenderer.moveTo(" + (Obstacles._2.pos.x + Obstacles._2.hitboxes.w) + ", " + (Obstacles._2.pos.y + Obstacles._2.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._2.pos.x + (Obstacles._2.hitboxes.w / 2)) + ", " + Obstacles._2.pos.y + ");\nrenderer.lineTo(" + (Obstacles._2.pos.x - (Obstacles._2.hitboxes.w / 11)) + ", " + (Obstacles._2.pos.y + Obstacles._2.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._2.pos.x) + ", " + (Obstacles._2.pos.y + Obstacles._2.hitboxes.h) + ");\nrenderer.fill();")
        skins._3.code = ("renderer.fillStyle = 'rgba(11,21,79,255)';\nrenderer.beginPath();\nrenderer.moveTo(" + (Obstacles._3.pos.x + Obstacles._3.hitboxes.w) + ", " + (Obstacles._3.pos.y + Obstacles._3.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._3.pos.x + (Obstacles._3.hitboxes.w / 2)) + ", " + Obstacles._3.pos.y + ");\nrenderer.lineTo(" + (Obstacles._3.pos.x - (Obstacles._3.hitboxes.w / 11)) + ", " + (Obstacles._3.pos.y + Obstacles._3.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._3.pos.x) + ", " + (Obstacles._3.pos.y + Obstacles._3.hitboxes.h) + ");\nrenderer.fill();")
        skins._4.code = ("renderer.fillStyle = 'rgba(11,21,79,255)';\nrenderer.beginPath();\nrenderer.moveTo(" + (Obstacles._4.pos.x + Obstacles._4.hitboxes.w) + ", " + (Obstacles._4.pos.y + Obstacles._4.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._4.pos.x + (Obstacles._4.hitboxes.w / 2)) + ", " + Obstacles._4.pos.y + ");\nrenderer.lineTo(" + (Obstacles._4.pos.x - (Obstacles._4.hitboxes.w / 11)) + ", " + (Obstacles._4.pos.y + Obstacles._4.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._4.pos.x) + ", " + (Obstacles._4.pos.y + Obstacles._4.hitboxes.h) + ");\nrenderer.fill();")
        skins._5.code = ("renderer.fillStyle = 'rgba(11,21,79,255)';\nrenderer.beginPath();\nrenderer.moveTo(" + (Obstacles._5.pos.x + Obstacles._5.hitboxes.w) + ", " + (Obstacles._5.pos.y + Obstacles._5.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._5.pos.x + (Obstacles._5.hitboxes.w / 2)) + ", " + Obstacles._5.pos.y + ");\nrenderer.lineTo(" + (Obstacles._5.pos.x - (Obstacles._5.hitboxes.w / 11)) + ", " + (Obstacles._5.pos.y + Obstacles._5.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._5.pos.x) + ", " + (Obstacles._5.pos.y + Obstacles._5.hitboxes.h) + ");\nrenderer.fill();")
        skins._7.code = ("renderer.fillStyle = 'rgba(11,21,79,255)';\nrenderer.beginPath();\nrenderer.moveTo(" + (Obstacles._7.pos.x + Obstacles._7.hitboxes.w) + ", " + (Obstacles._7.pos.y + Obstacles._7.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._7.pos.x + (Obstacles._7.hitboxes.w / 2)) + ", " + Obstacles._7.pos.y + ");\nrenderer.lineTo(" + (Obstacles._7.pos.x - (Obstacles._7.hitboxes.w / 11)) + ", " + (Obstacles._7.pos.y + Obstacles._7.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._7.pos.x) + ", " + (Obstacles._7.pos.y + Obstacles._7.hitboxes.h) + ");\nrenderer.fill();")
        skins._10.code = ("renderer.fillStyle = 'rgba(11,21,79,255)';\nrenderer.beginPath();\nrenderer.moveTo(" + (Obstacles._10.pos.x + Obstacles._10.hitboxes.w) + ", " + (Obstacles._10.pos.y + Obstacles._10.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._10.pos.x + (Obstacles._10.hitboxes.w / 2)) + ", " + Obstacles._10.pos.y + ");\nrenderer.lineTo(" + (Obstacles._10.pos.x - (Obstacles._10.hitboxes.w / 11)) + ", " + (Obstacles._10.pos.y + Obstacles._10.hitboxes.h) + ");\nrenderer.lineTo(" + (Obstacles._10.pos.x) + ", " + (Obstacles._10.pos.y + Obstacles._10.hitboxes.h) + ");\nrenderer.fill();")

        //Rest
        if (window.innerWidth <= 500){
            var index = 0;
            while (index < (Object.keys(Obstacles).length)){
                indexkey = Object.keys(Obstacles)[index];
                eval(("Obstacles." + indexkey + ".pos.x -= 2"));
                index += 1;
            }
            var index = 0;
            while (index < (Object.keys(decorations).length)){
                indexkey = Object.keys(decorations)[index];
                eval(("decorations." + indexkey + ".pos.x -= 2"));
                index += 1;
            }
        }
        else{
            if (window.innerWidth <= 1000){
                var index = 0;
                while (index < (Object.keys(Obstacles).length)){
                    indexkey = Object.keys(Obstacles)[index];
                    eval(("Obstacles." + indexkey + ".pos.x -= 3"));
                    index += 1;
                }
                var index = 0;
                while (index < (Object.keys(decorations).length)){
                    indexkey = Object.keys(decorations)[index];
                    eval(("decorations." + indexkey + ".pos.x -= 3"));
                    index += 1;
                }
            }
            else{
                var index = 0;
                while (index < (Object.keys(Obstacles).length)){
                    indexkey = Object.keys(Obstacles)[index];
                    eval(("Obstacles." + indexkey + ".pos.x -= 4"));
                    index += 1;
                }
                var index = 0;
                while (index < (Object.keys(decorations).length)){
                    indexkey = Object.keys(decorations)[index];
                    eval(("decorations." + indexkey + ".pos.x -= 4"));
                    index += 1;
                }
            }
        }
    }
}, 5);

//Optimise html canvas
var canvas = document.getElementById("canvas");
var renderer = canvas.getContext("2d");
renderer.imageSmoothingEnabled = false;
renderer.webkitImageSmoothingEnabled = false;
renderer.mozImageSmoothingEnabled = false;
renderer.msImageSmoothingEnabled = false;
renderer.oImageSmoothingEnabled = false;
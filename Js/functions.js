//Functions.js script
//

let Cooldown = false;
let RotateCooldown = false;
let ips = false;
let ipscounter = 0;
let ipscounter_ = "...";
let ipswait = 0;

function Toogleips(){
    if (ips){
        ips = false;
    }
    else{
        ips = true;
    }
}

var background = new Image();
background.src = "https://d2zia2w5autnlg.cloudfront.net/352/618cff3e20616-large";

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
            center.style.marginTop = (((window.innerHeight / 4.5) * 2) + "px");
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
            ResetObjects();
            BuildApp();
            Controls();
        }
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

function ResetObjects() {
    Player = {
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
        jump: async function () {
            if (Cooldown === false) {
                RotateCooldown = false;
                Cooldown = true;
                Player.rotate();
                while (Player.pos.y > (Player.ground - 130)) {
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
                Player.pos.rotation = 0;
                Render();
                Cooldown = false;
            }
        }
    };
    Obstacles = {
        test: {
            color: "green",
            pos: {
                x: (window.innerWidth / 2),
                y: (window.innerHeight - 40)
            },
            sizes: {
                w: 50,
                h: 20
            },
            hitboxes: {
                w: 50,
                h: 30
            }
        }
    }
}

let Player = {
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
    jump: async function () {
        if (Cooldown === false) {
            RotateCooldown = false;
            Cooldown = true;
            Player.rotate();
            while (Player.pos.y > (Player.ground - 130)) {
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
            Player.pos.rotation = 0;
            Render();
            Cooldown = false;
        }
    }
};

let Obstacles = {
    test: {
        color: "green",
        pos: {
            x: (window.innerWidth / 2),
            y: (window.innerHeight - 40)
        },
        sizes: {
            w: 50,
            h: 20
        },
        hitboxes: {
            w: 50,
            h: 30
        }
    }
}

function CheckPlayerColisions(Obstaclex, Obstacley, Obstaclew, Obstacleh){
    if (Player.pos.x + 50 >= Obstaclex && Player.pos.x <= Obstaclex + Obstaclew && Player.pos.y + 50 >= Obstacley && Player.pos.y<= Obstacley + Obstacleh){
        return true;
    }
}

//Make the player go straight
setInterval(() => {
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
}, 5);

setInterval(() => {
    if (ips){
        ipscounter_ = ipscounter;
        ipscounter = 0;
    }
}, 1005);

setInterval(() => {
    Render();
}, 1);

let indexkey = "";
setInterval(() => {
    if ((parseInt(Player.pos.x)) >= ((parseInt(window.innerWidth / 3.5)))){
        if (window.innerWidth <= 500){
            var index = 0;
            while (index < (Object.keys(Obstacles).length)){
                indexkey = Object.keys(Obstacles)[index];
                eval(("Obstacles." + indexkey + ".pos.x -= 2"));
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
            }
            else{
                var index = 0;
                while (index < (Object.keys(Obstacles).length)){
                    indexkey = Object.keys(Obstacles)[index];
                    eval(("Obstacles." + indexkey + ".pos.x -= 4"));
                    index += 1;
                }
            }
        }
    }
}, 5);
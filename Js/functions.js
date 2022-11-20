//Functions.js script
//

let Cooldown = false;
let RotateCooldown = false;
let fps = false;
let fpscounter = 0;
let fpscounter_ = "...";
let fpswait = 0;

function ToogleFps(){
    if (fps){
        fps = false;
    }
    else{
        fps = true;
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

function Render() {
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
    //Render obstacles
    renderer.fillStyle = Obstacles.test.color;
    renderer.fillRect(Obstacles.test.pos.x, Obstacles.test.pos.y, Obstacles.test.sizes.w, Obstacles.test.sizes.h);
    if (fps){
        fpscounter += 1;
        fpswait = 0;
        renderer.fillStyle = "rgb(21, 21, 20)";
        renderer.fillRect((window.innerWidth / 1.1), 0, (window.innerWidth - (window.innerWidth / 1.1)), (window.innerHeight - (window.innerHeight / 1.05)))
        renderer.font = ((window.innerWidth / 42) + "px Arial");
        renderer.fillStyle = "white";
        renderer.fillText((`${fpscounter_}` + " fps"), (window.innerWidth / 1.09), 13)
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
        var ticker = 0;
        while (ticker < (360)) {
            if (RotateCooldown === false) {
                Player.pos.rotation += 1;
                ticker += 1;
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
            y: (window.innerHeight - 51)
        },
        sizes: {
            w: 30,
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
    if (CheckPlayerColisions(Obstacles.test.pos.x, Obstacles.test.pos.y, 30, 30)){
        Player.pos.x = (window.innerWidth / 32)
    }
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
    if (fps){
        fpscounter_ = fpscounter;
        fpscounter = 0;
    }
}, 1005);

setInterval(() => {
    Render();
}, 1);
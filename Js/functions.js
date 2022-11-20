//Functions.js script
//

let Cooldown = false;

function mainthreadpause(ms) {
    var date = Date.now();
    var currentDate = Date.now();
    while ((currentDate - date) < ms){
        currentDate = Date.now();
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function BuildApp(){
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
}

function Render(){
    var renderer_element = document.getElementById("renderer");
    var renderer = renderer_element.getContext("2d");
    //Clearing the renderer
    renderer.clearRect(0, 0, window.innerWidth, window.innerHeight);
    //Render the player
    renderer.translate((Player.pos.x + 25), (Player.pos.y + 25));
    renderer.rotate(Player.pos.rotation);
    renderer.translate(-(Player.pos.x + 25), -(Player.pos.y + 25));
    
    renderer.fillStyle = "yellow";
    renderer.fillRect(Player.pos.x, Player.pos.y, 50, 50);
}

let Player = {
    ground: (window.innerHeight - 50),
    pos: {
        x: (window.innerWidth / 32),
        y: (window.innerHeight - 51),
        rotation: 0
    },
    rotate: async function(){
        var ticker = 0;
        while (ticker < (360)){
            Player.pos.rotation += 1;
            ticker += 1;
            await wait(1)
        }
        Player.pos.rotation = 0;
        Render();
    },
    jump: async function(){
        if (Cooldown === false){
            Cooldown = true;
            Player.rotate();
            while (Player.pos.y > (Player.ground - 70)){
                Player.pos.y = Player.pos.y - 4;
                Render();
                await wait(1);
            }
            while (Player.pos.y < Player.ground){
                Player.pos.y += 4;
                Render();
                await wait(1);
            }
            Player.pos.rotation = 0;
            Render();
            Cooldown = false;
        }
    }
};
//App.js script
//

let Control = false;

//Build app
BuildApp();

//Execute render function
Render();

//Events
function Controls(){
    document.onkeydown = async (event) => {
        if (event.key === " " || event.key === "ArrowUp"){
            Player.jump();
        }
    }
    document.onclick = () => {
        Player.jump();
    }
}

//Init controls
Controls();
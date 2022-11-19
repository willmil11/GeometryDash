//App.js script
//

//Build app
BuildApp();

//Execute render function
Render();

//Events
document.onkeydown = (event) => {
    if (event.key === " "){
        Player.jump();
    }
}
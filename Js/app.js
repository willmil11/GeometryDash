//App.js script
//

let Control = false;

//Build app
BuildApp();

//Execute render function
Render();

//Events
document.onkeydown = async (event) => {
    if (event.key === " " || event.key === "ArrowUp"){
        Player.jump();
    }
    if (event.key === "r"){
        location.reload();
    }
    if (event.key === "c"){
        req.open("GET", "https://willmil11-friendly-adventure-45g974rww9rf5rj-1234.preview.app.github.dev/clear");
        req.send("Open");
    }
    if (event.key === "Control"){
        Control = true;
        await wait(300);
        Control = false;
    }
    if (event.key === "Shift"){
        if (Control){
            Control = false;
            ToogleFps();
        }
    }
}
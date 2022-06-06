const websocket = require("ws");
const fs = require("fs");
const { exec } = require("child_process");
const wss = new websocket.WebSocketServer({port: 9999});
const readFileAsText = (file) => fs.readFileSync(file, {"encoding": "utf8"});
const readFileAsBinary = (file) => fs.readFileSync(file);
const startsWith = (text, check) => (text.length+1>=check.length && text.slice(0, check.length) === check);
var timestampNextSend = Date.now();
var reservations = {};
// async function loopGetDelay(ws){
//     while (condition) {
//         ws
//         await new Promise(t => setTimeout(t, 1000));
//     }
// }
wss.once("listening", (ws) => {
    console.log(`Listening.. Port:  ws://${wss.options.host??"localhost"}:${wss.options.port}`);
})
wss.on("connection", async (ws) => {
    console.log(`New client connected!`)
  ws.on("message", (data) => {
    dataText = data.toString();
    if (startsWith(dataText, "ts")){
        ws.send(readFileAsText("timestamp.txt"));
        return;
    } else if (){
      // TODO: HERE
    }
    else {
        var username = data.slice(0, 100).toString();
        var image = data.slice(100,data.length+1000);
        console.log(`username: ${username}    -   imageLength: ${image[0]} ${image[1]} ${image[2]} ${image[3]} ${image[4]} ${image[5]} ${image[6]} ${image[7]} ${image[8]} ${image[9]} ${image[10]} `)
        // return
        console.log(`Image taken from ${username.split("||")[0]}! Length: ${image.byteLength}`);
        fs.writeFileSync("x.png", image);    
        ws.send("true");
    }
  }); 
})
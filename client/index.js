// USE "cli.py"

// const os = require("os");
// const md5 = require("md5");
// const fs = require("fs");
// const websocket = require('ws');
// const screenshot = require('desktop-screenshot');
// const startsWith = (text, check) => (text.length+1>=check.length && text.slice(0, check.length) === check);
// const verbose = (text) => console.log(text);
// const takeScreenshot = () => {
//     if (tmpCounter>1) {
//         screenshot('screenshot.png', function (error, complete) {
//             if (error){
//                 verbose('Screenshot failed', error);
//             }
//             if (complete){
//                 var image = fs.readFileSync("screenshot.png");
//                 verbose(`Screenshot taken! MD5: "${md5(image)}". Sending..`);
//                 verbose(`Byte at index: ${(image.length/2)-1} is "${image[(image.length/2)-1]}" (the char at half of image bytes) Size of Bytes: ${image[(image.length/2)-1]}`);
//                 var data = Buffer.from(JSON.stringify({"uname": os.userInfo().username, "image": image}));
//                 client.send(data);
//             };
//         });
//     }
// };
// var tmpCounter = 0;
// var delay = 1000;
// // var cachedTimestamp = delay;
// // var wsEndPoint = 'ws://127.0.0.1:9999';
// if (process.argv.length < 4){console.log("You must type HOST and PORT as a parameter to connect the server");process.kill()};
// var wsEndPoint = `ws://${process.argv[2]}:${process.argv[3]}`;
// const client = new websocket.WebSocket(`${wsEndPoint}`);
// client.on('open', async (ws) => {
//     verbose(`Connected to server! Host: ${wsEndPoint}`);
//     while (!client.CLOSING || !client.CONNECTING || !client.CLOSED) {
//         client.send("ts");
//         verbose(`Delay before next screenshot send: ${delay}`);
//         // if (delay <= Date.now() && cachedTimestamp !== delay){
//             takeScreenshot();
//         //     cachedTimestamp = delay;
//         // };
//         await new Promise(t => setTimeout(t, delay));
//     }
// });
// client.on("message", (data) => {
//     dataText = data.toString();
//     if (dataText === "true")
//         return;
//     verbose(`New response from server! Response: ${dataText}`);
//     delay = dataText;
//     tmpCounter += 1;
// })
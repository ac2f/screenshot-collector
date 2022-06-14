from colorama import Fore, init;
from datetime import datetime;
import os, time, websocket, rel, json, asyncio, pyautogui, sys;

init(convert=True, autoreset=True);
async def main():
    # def getDate(useColor:None|Fore = False): return f"{useColor}{datetime.strftime(datetime.now(), '%Y-%m-%d %H:%M:%S')}";
    def Log(context:str, useDate:bool=True):
        print((f"[{Fore.LIGHTMAGENTA_EX}{datetime.strftime(datetime.now(), '%Y-%m-%d %H:%M:%S')}{Fore.RESET}] " if useDate else "") + f"{context}");
    def on_message(ws, message):
        if (message.startswith("send-screenshot-now")):
            Log(f"[*] Taking screenshot...");
            pyautogui.screenshot().save("screenshot.png");
            with open("screenshot.png", "rb") as f:
                Log(f"{Fore.LIGHTCYAN_EX}[*] Screenshot taken! Sending it to server...");
                ws.send(json.dumps({
                    "uname": os.getlogin(),
                    "image": {
                        "type": "Buffer",
                        "data": list(f.read())
                    }
                }));
            ws.send("ts");
            return;
        Log(f"{Fore.LIGHTGREEN_EX}[+] Image data derrived to server successfully!" if message == "true" else f"[*] Current delay (By seconds): {Fore.LIGHTCYAN_EX}{int(message)/1000}s");
    def on_error(ws, error):
        print(f"ERR! {error}");

    def on_close(ws, close_status_code, close_msg):
        Log(f"{Fore.LIGHTRED_EX}[-] Connection closed!");

    def on_open(ws):
        Log(f"{Fore.LIGHTGREEN_EX}[+] Connection opened!");

    if __name__ == "__main__":
        websocket.enableTrace(False)
        try:
            ws = websocket.WebSocketApp(f"ws://{sys.argv[1] if len(sys.argv)>2 else 'localhost'}:{sys.argv[1] if len(sys.argv)<3 else sys.argv[2]}",
                on_open=on_open,
                on_message=on_message,
                on_error=on_error,
                on_close=on_close
            );
            ws.run_forever(dispatcher=rel);
            rel.signal(2, rel.abort);
            try:
                rel.dispatch();
            except ConnectionResetError:
                on_close(0,0,0);
        except IndexError:
            Log(f"{Fore.LIGHTRED_EX}[-] You must enter a hostname and port! EX: 'thisfile <localhost> <port>' or 'thisfile <port>'");

asyncio.run(main())
# pixels = json.loads(message)["image"]["data"];
# with open("new3.png","wb") as ofile:
#     ofile.write(bytes(pixels));
# # pixels =[226, 137, 125, 226, 137, 125, 223, 137, 133, 223, 136, 128, 226, 138, 120, 226, 129, 116, 228, 138, 123, 227, 134, 124, 227, 140, 127, 225, 136, 119, 228, 135, 126, 225, 134, 121, 223, 130, 108, 226, 139, 119, 223, 135, 120, 221, 129, 114, 221, 134, 108, 221, 131, 113, 222, 138, 121, 222, 139, 114, 223, 127, 109, 223, 132, 105, 224, 129, 102, 221, 134, 109, 218, 131, 110, 221, 133, 113, 223, 130, 108, 225, 125, 98, 221, 130, 121, 221, 129, 111, 220, 127, 121, 223, 131, 109, 225, 127, 103, 223] 
# # Convert the pixels into an array using numpy
# array = np.array(pixels, dtype=np.uint8)
# # Use PIL to create an image from the new array of pixels
# new_image = Image.fromarray(array)
# new_image.save('new.png')
# asyncio.run(main());
# # await loopX();
# # asyncio.get_running_loop().run_forever(loopX);
# print("jjjj")
# # threading.Thread(target=ws, args={"dispatcher": rel}).start();
# # threading.Thread(target=loopX).start();
# loop = asyncio.get_event_loop();
# loop.run_until_complete(main());
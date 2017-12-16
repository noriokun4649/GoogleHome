const request = require("superagent");
const firebase = require("firebase");

//Windows MAC Address
const mac = "xx:xx:xx:xx:xx:xx";

//firebase config
const config = {
    apiKey: "cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxx-xxxxxx.firebaseapp.com",
    databaseURL: "https://xxxxxx-xxxxxxxxxxx.firebaseio.com",
    projectId: "xxxxxxxxxxxxxxxx-xxxxxxxxx",
    storageBucket: "xxxxxxxxx-xxxxxxxx.appspot.com",
    messagingSenderId: "xxxxxxxxxxxxxxxxx:xxxxxxxxxxx-xxxxxxxxx-xxxxxxxxxxxxxxxxxx"
};
firebase.initializeApp(config);



//database更新時
const path = "/googlehome";
const key = "word";
const db = firebase.database();
db.ref(path).on("value", function(changedSnapshot) {
    //値取得
    const value = changedSnapshot.child(key).val();
    if (value) {
        console.log(value);

        //コマンド生成
        const command = getJsonData(value.split(" ")[0] + " " + value.split(" ")[1] + " " + value.split(" ")[2] + " " + value.split(" ")[3], {

            //Windows
            "windows control メイン パソコン": () => {
                //Windowsコマンド
                const sleep = "start C:/Windows/System32/rundll32.exe powrprof.dll,SetSuspendState";
                const shutdown = "shutdown -s -t 0";
                const dispoff = "powershell C:/PowerShell/dispoff.ps1";
                const restart = "shutdown -r -t 0";
                const locks = "rundll32.exe user32.dll,LockWorkStation";
                return getJsonData(value.split(" ")[4], {
                    "スリープ": sleep,
                    "スタンバイ": sleep,
                    "止め": sleep,
                    "とめ": sleep,
                    "消し": sleep,
                    "けし": sleep,
                    "落とし": sleep,
                    "おとし": sleep,
                    "再起動": restart,
                    "リスタート": restart,
                    "シャットダウン": shutdown,
                    "モニター": dispoff,
                    "画面": dispoff,
                    "ディスプレイ": dispoff,
                    "ロック": locks,
                    "lock": locks,
                    "default": false
                });
            },
            "windows control パソコン": () => {
                //Windowsコマンド
                const sleep = "start C:/Windows/System32/rundll32.exe powrprof.dll,SetSuspendState";
                const shutdown = "shutdown -s -t 0";
                const dispoff = "powershell C:/PowerShell/dispoff.ps1";
                const locks = "rundll32.exe user32.dll,LockWorkStation";
                return getJsonData(value.split(" ")[3], {
                    "スリープ": sleep,
                    "スタンバイ": sleep,
                    "止め": sleep,
                    "とめ": sleep,
                    "消し": sleep,
                    "けし": sleep,
                    "落とし": sleep,
                    "おとし": sleep,
                    "シャットダウン": shutdown,
                    "モニター": dispoff,
                    "画面": dispoff,
                    "ディスプレイ": dispoff,
                    "ロック": locks,
                    "lock": locks,
                    "default": false
                });
            },
            //default
            "default": () => false,
        })();
        console.log(command);

        //コマンド実行
        if (command) {
            //typeof
            if (typeof command === "string") {
                const exec = require('child_process').exec;
                exec(command);
            } else if (typeof command === "function") {
                command();
            }

            //firebase clear
            db.ref(path).set({
                [key]: ""
            });
        }

    }
});



//jsonからvalueに一致する値取得
function getJsonData(value, json) {
    "use strict"
    for (let word in json)
        if (value == word) return json[word]
    return json["default"]
}
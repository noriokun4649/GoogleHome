var twitter = require('twitter');
var request2 = require('request');
const request = require('superagent');
const firebase = require('firebase');

//firebase config
const config = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    databaseURL: "https://xxxxxxxxxxxxxxx.firebaseio.com",
    projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxx.appspot.com",
    messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};
firebase.initializeApp(config);
var client = new twitter({
    consumer_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    consumer_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_token_key: 'xxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_token_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
});

//database更新時
const path = "/googlehome";
const key = "torendo";
const db = firebase.database();
db.ref(path).on("value", function(changedSnapshot) {
    //値取得
    var value = changedSnapshot.child(key).val();
    if (value) {
        var idsets;
        if (value === " 北九州 ") {
            idsets = '1110809';
        } else if (value === " 埼玉 ") {
            idsets = '1116753';
        } else if (value === " 千葉 ") {
            idsets = '1117034';
        } else if (value === " 福岡 ") {
            idsets = '1117099';
        } else if (value === " 浜松 ") {
            idsets = '1117155';
        } else if (value === " 広島 ") {
            idsets = '1117227';
        } else if (value === " 川崎 ") {
            idsets = '1117502';
        } else if (value === " 神戸 ") {
            idsets = '1117545';
        } else if (value === " 熊本 ") {
            idsets = '1117605';
        } else if (value === " 名古屋 ") {
            idsets = '1117817';
        } else if (value === " 新潟 ") {
            idsets = '1117881';
        } else if (value === " 相模原 ") {
            idsets = '1118072';
        } else if (value === " 札幌 ") {
            idsets = '1118108';
        } else if (value === " 仙台 ") {
            idsets = '1118129';
        } else if (value === " 高松 ") {
            idsets = '1118285';
        } else if (value === " 東京 ") {
            idsets = '1118370';
        } else if (value === " 横浜 ") {
            idsets = '1118550';
        } else if (value === " 沖縄 ") {
            idsets = '2345896';
        } else if (value === " 大阪 ") {
            idsets = '15015370';
        } else if (value === " 京都 ") {
            idsets = '15015372';
        } else if (value === " 岡山 ") {
            idsets = '90036018';
        } else {
            idsets = '23424856';
            //value = 日本;
        }
        client.get('trends/place', { id: idsets },
            function(error, tweets, respomse) {
                var ans;
                if (!error) {
                    var ksp = JSON.parse(respomse["body"]);
                    var result = ksp[0].trends; // 取得したデータから、メソッドチェーンで必要なものを取得
                    for (var i = 0; i < result.length; i++) {
                        var name = result[i].name; // トレンドワード
                        var url = result[i].url; // トレンドワードの検索結果リンク
                        var s = i + 1;
                        console.log(s + ":" + name);
                        // トレンドワードを一覧表示
                        //$(".listView").append('<div>' + name + ' | ' + url + '</div>');
                    }

                    ans = value + "のトレンドを検索しましたが複数の結果が見つかりました。複数のうち、トレンドの上位5位を読み上げます。1位：" + result[0].name + "。2位：" + result[1].name + "。3位" + result[2].name + "。4位" + result[3].name + "。5位" + result[4].name + "です。"
                    console.log(ans);
                } else {
                    console.log(error);
                    ans = error;
                }
                var options = {
                    uri: "http://localhost:8080/google-home-notifier/",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded",
                    },
                    form: {
                        "text": ans
                    }
                };

                request2.post(options, function(error, response, body) {});
            }

        );
    }
});
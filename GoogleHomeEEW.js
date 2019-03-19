const twitter = require('twitter');
const GoogleHome = require('google-home-push');
const options = {
    language: "ja",
    accent: "ja"
};
const myHome = new GoogleHome("192.168.0.12", options);//GoogleHomeのIPアドレス。GoogleHomeアプリからIP見れるのでそれをいれる。
const client = new twitter({//TwitterAPIの各種APIKEY
    consumer_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    consumer_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_token_key: 'xxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_token_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
});
client.stream('statuses/filter', { follow: '216184660' },//フィルター対象今回はゆれくるコール
    function (stream) {
        stream.on('data', function (tweet) {
            let para = (tweet.text).split(" ");
            if (para[0] == "[EEW]") {
                for (const i in para) {
                    let index = para[i].indexOf("：");
                    para[i] = para[i].substr(index + 1);
                }
                let id = para[1];
                let forecast = para[2];
                let epicenter = para[3];
                let depth = para[6];
                let occurrenceDate = para[7];
                let occurrenceTime = para[8];
                let magnitude = para[9];
                let intensity = para[10];
                let final = forecast == "final";
                let notitype;
                let cancel = false;
                if (final) {
                    notitype = "最終報";
                    if (epicenter == "キャンセル") {
                        cancel = true;
                    }
                } else {
                    notitype = "第" + forecast + "報";
                }
                let eezmain;
                if (!cancel) {
                    eezmain = " 緊急地震速報　" + notitype + "、" + epicenter + "で地震発生、" + "予想最大震度" + intensity + "、マグニチュード" + magnitude + "、震源の深さ" + depth;
                }else{
                    eezmain = "先ほどの緊急地震速報はキャンセルされました";
                }
                //myHome.push("https://www.city.usuki.oita.jp/docs/2014020700268/file_contents/jishin.mp3");
                myHome.speak(eezmain);
                console.log(eezmain);
            }
        });
        stream.on('error', function (error) {
            console.log(error);
        });
    }
);

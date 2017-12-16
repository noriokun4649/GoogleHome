var twitter = require('twitter');
var request = require('request');



var client = new twitter({
    consumer_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    consumer_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_token_key: 'xxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_token_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
});
client.stream('statuses/filter', { follow: '852450237356441600' },
    function(stream) {

        stream.on('data', function(tweet) {
            //console.log(tweet.text);

            var opps = (tweet.text).split(",");
            for (var i in opps) {
                //console.log(opps[i] + " " + i);
            }
            var notitype;
            if (opps[3] == 0) {
                notitype = "通常報";
            } else if (opps[3] <= 7) {
                notitype = "第" + opps[3] + "報";
            } else if (opps[3] <= 9) {
                notitype = "最終報";
            }

            var types;
            if (opps[14] == 0) {
                types = "この地震に関する警報は発表されてません";
            } else {
                types = "この地震に関する警報が発表されています";
            }

            var testis;
            if (opps[1] == 01) {
                testis = "これは訓練速報です";
            } else {
                testis = "";
            }

            var eezmain;
            if (opps[0] == 39) {
                eezmain = "先ほどの緊急地震速報はキャンセルされました";
            } else {
                eezmain = testis + " 緊急地震速報　" + notitype + " " + opps[9] + "で地震発生、" + "予想最大震度" + opps[12] + "、マグニチュード" + opps[11] + "、震源の深さ" + opps[10] + "km " + types;
            }
            console.log(eezmain);

            var options = {
                uri: "http://localhost:8080/google-home-notifier/",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                },
                form: {
                    "text": tweet.text
                }
            };

            request.post(options, function(error, response, body) {});
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    }
);
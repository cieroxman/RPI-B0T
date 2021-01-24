const groupid = "-1001386454830"
const TelegramBot = require("node-telegram-bot-api");
const token = "1482047845:AAHUxw4Xt1SjwXdTv5hp4_0lMCArAkrHuOY";
const bot = new TelegramBot(token, { polling: true });
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;
var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb+srv://admin:superadmin@cluster0.av7ui.mongodb.net/RecursosInformaticos?retryWrites=true&w=majority";
var $ = (jQuery = require("jquery")(window));

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
var f;
var n = 0;
// Matches /editable
bot.onText(/\/cursos/, function onEditableText(msg) {
    console.log(msg);
    var nameUser = msg.from.username;
    var first_name = msg.from.first_name;
    var last_name = msg.from.last_name;
    var text = msg.text;
    var chatid = msg.chat.id;
    console.log(first_name)
    bot.sendMessage(
        "-474004021",

        msg.from.first_name +
        " " +
        msg.from.last_name +
        " @" +
        msg.from.username +
        " id: " +
        msg.chat.id +
        " ha escrito " +
        msg.text
    );

    $.getJSON("https://recursosinformaticos.herokuapp.com/api/recursos").then(
        function(response) {
            listar(msg, response);

        }
    );
});

function listar(msg, arr) {
    n = 0;
    f = arr;
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Siguiente",
                    // we shall check for this value when we listen
                    // for "callback_query"
                    callback_data: "page",
                }, ],
            ],
        },
    };
    if (f.length == 1) {
        bot.sendMessage(
            groupid,

            arr[n].nombre +
            "\n" +
            arr[n].imagen +
            "\n" +
            "Telegram:" +
            arr[n].links[0].url +
            "\n" +
            "Mega:" +
            arr[n].links[1].url +
            "\n" +
            "Google Drive:" +
            arr[n].links[2].url
        );
    } else {
        bot.sendMessage(
            groupid,

            arr[n].nombre +
            "\n" +
            arr[n].imagen +
            "\n" +
            "Telegram:" +
            arr[n].links[0].url +
            "\n" +
            "Mega:" +
            arr[n].links[1].url +
            "\n" +
            "Google Drive:" +
            arr[n].links[2].url,
            opts
        );
    }
}







bot.onText(/\/verificar/, function onEditableText(msg) {
    //  console.log(msg);
    var nameUser = msg.from.username;
    var first_name = msg.from.first_name;
    var last_name = msg.from.last_name;
    var text = msg.text;
    var chatid = msg.chat.id;
    var existe = false;
    if (chatid != msg.from.id) {
        console.log("verificado");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("RecursosInformaticos");
            var myobj = {
                id: msg.from.id,
                username: msg.from.first_name + " " + msg.from.last_name,
                alias: msg.from.username,
                createdAt: msg.date
            };
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("RecursosInformaticos");
                dbo
                    .collection("userstg")
                    .findOne({ id: msg.from.id }, function(err, result) {
                        if (result != null) {
                            console.log(result);
                            existe = true;
                            // bot.sendMessage(
                            //     groupid,

                            //     msg.from.first_name +
                            //     " " +
                            //     msg.from.last_name +
                            //     " ya ha sido verificado  "
                            // );
                            bot.sendMessage(
                                msg.from.id,
                                "Tu Usuario es: " + msg.from.id
                            );
                        } else {
                            dbo.collection("userstg").insertOne(myobj, function(err, res) {
                                if (err) throw err;
                                console.log("1 document inserted");
                                bot.sendMessage(
                                    groupid,
                                    msg.from.first_name +
                                    " " +
                                    msg.from.last_name +
                                    " ha sido verificado  "
                                );
                                bot.sendMessage(msg.from.id, "Tu Usuario es: " + msg.from.id);
                                db.close();
                            });
                        }

                        db.close();
                    });
            });

        });
    }

    bot.sendMessage(
        "-474004021",

        msg.from.first_name +
        " " +
        msg.from.last_name +
        " @" +
        msg.from.username +
        " id: " +
        msg.from.id +
        " ha escrito " +
        msg.text
    );


});
console.log("work");
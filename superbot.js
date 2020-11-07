const TelegramBot = require('node-telegram-bot-api');
const token = "1482047845:AAHUxw4Xt1SjwXdTv5hp4_0lMCArAkrHuOY";
const bot = new TelegramBot(token, { polling: true });
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb+srv://admin:superadmin@cluster0.x3q0p.mongodb.net/unoriesgo?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
var f;
var n = 0;
// Matches /editable
bot.onText(/\/cursos/, function onEditableText(msg) {
    var a = ["1", "2"];
    var b = ["i", "ii", "ii"];
    listar(msg, a);
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
    bot.sendMessage(msg.from.id, "Curso " + arr[n], opts);
}
// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Anterior",
                        // we shall check for this value when we listen
                        // for "callback_query"
                        callback_data: "prev",
                    },
                    {
                        text: "Siguiente",
                        // we shall check for this value when we listen
                        // for "callback_query"
                        callback_data: "next",
                    },
                ],
            ],
        },
    };
    const opts2 = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Inicio",
                    // we shall check for this value when we listen
                    // for "callback_query"
                    callback_data: "ini",
                }, ],
            ],
        },
    };
    const opts3 = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Siguiente",
                    // we shall check for this value when we listen
                    // for "callback_query"
                    callback_data: "next",
                }, ],
            ],
        },
    };
    let text;
    if (action === "next") {
        if (n <= 0) {
            n++;
            text = "next Curso  " + f[n];
            bot.editMessageText(text, opts);
        } else {
            text = "Curso Final  " + f[n];
            bot.editMessageText(text, opts2);
        }

    }
    if (action === "prev") {
        if (n >= 1) {
            n--;
            text = "prev Curso  " + f[n];
            bot.editMessageText(text, opts);
        } else {
            text = "Curso Inicial  " + f[n];
            bot.editMessageText(text, opts3);
        }
    }
    if (action === 'page') {
        n++;
        text = "Curso " + f[n];
        bot.editMessageText(text, opts);
    }
    if (action === "ini") {
        n = 0;
        text = "Inicio Curso " + f[n];
        bot.editMessageText(text, opts3);
    }

});
bot.onText(/^\/cantidad/, function(msg) {
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unoriesgo");
        dbo
            .collection("recursos")
            .find({})
            .toArray(function(err, result) {
                if (err) throw err;
                bot.sendMessage(chatId, "La cantidad de cursos es de " + result.length);
                // console.log(result);
                db.close();
            });
    });
    //  bot.sendMessage(chatId, "Bienvenido a mi bot " + chatId);
});
bot.onText(/^\/inicio/, function(msg) {
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    //  bot.sendMessage(chatId, "Bienvenido a mi bot " + chatId);
    bot.sendMessage(chatId, l);
});
bot.onText(/^\/start/, function(msg) {
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    //  bot.sendMessage(chatId, "Bienvenido a mi bot " + chatId);
    bot.sendMessage(chatId, l);
});
var l =
    "Soy un bot que busca ayudarte entu camino de aprendizaje, este bot se regla a la ley DMCA, si un contenido que se te proporciona rompe con los estandares del DMCA notificar para proceder con la evaluacion y eliminacion del mismo." +
    "\n" +
    "Comandos:" +
    "\n" +
    "Buscar : este comando le debes pasar el termino, ejemplo: /buscar Curso Basico de Python" +
    "\n" +
    "Length : este comando te devuelve el numero de cursos que se ha subido,no recibe parametros: /cantidad" +
    "\n" +
    "Cursos : este comando te devuelve una botonera con los links de acceso del curso mostrada en la imagen y un boton de cambiar al siguienteo,no recibe parametros: /cursos" +
    "\n" +
    "Canal : este comando te devuelve el link del canal en codigo qr, donde tendras acceso a los archivos en telegram,no recibe parametros: /canal";
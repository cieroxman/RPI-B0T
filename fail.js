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
bot.onText(/^\/consultar/, function(msg) {

    var userId = msg.from.id;

    bot.sendMessage(
        msg.chat.id,
        num, {
            parse_mode: "Markdown",
        }
    );
});
var $ = jQuery = require('jquery')(window);
bot.on('polling_error', function(error) {
    console.log(error);
});
var sw;
var length;

function que(valor) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unoriesgo");
        var query = { nombre: valor };
        dbo
            .collection("recursos")
            .find(query)
            .toArray(function(err, result) {
                if (err) throw err;
                sw = result[0].nombre;
                si = result[0].imagen;
                console.log(result[0].nombre);
                db.close();
            });
    });
}

bot.onText(/\/buscar (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unoriesgo");
        var query = { nombre: resp };
        dbo
            .collection("recursos")
            .find(query)
            .toArray(function(err, result) {

                if (err) throw err;
                if (result.length == 0) {
                    bot.sendMessage(chatId, "No existe el termino que buscas");
                } else {

                    $.getJSON(
                        "https://recursosinformaticos.herokuapp.com/api/recursos" +
                        result[0]._id
                    ).then(function(response) {
                        console.log(response.nombre);
                        carta(
                            chatId,
                            response.nombre,
                            response.imagen,
                            response.links[0].url,
                            response.links[1].url,
                            response.links[2].url
                        );

                        bot.on("callback_query", function onCallbackQuery(
                            accionboton
                        ) {
                            const data = accionboton.data;
                            const msg = accionboton.message;
                            if (data == "boton1") {
                                bot.sendMessage(chatId, response[num].links[1].url);
                            }
                            if (data == "boton2") {
                                bot.sendMessage(chatId, response[num].links[2].url);
                            }
                            if (data == "boton3") {
                                bot.sendMessage(chatId, response[num].links[0].url);
                            }
                            if (data == "boton4") {
                                ll();
                                var f = num + 1;
                                if (length > num) {
                                    //     num++;
                                    //       bot.sendMessage(chatId, "existe un recurso mas ");
                                } else {
                                    // bot.sendMessage(
                                    //     chatId,
                                    //     "se acabaron los cursos "
                                    // );
                                }

                                // carta(chatId, response[num].nombre, response[num].imagen);

                                //
                            }
                        });
                    });

                }

                db.close();
            });
    });

});

var l =
    "Soy un bot que busca ayudarte entu camino de aprendizaje, este bot se regla a la ley DMCA, si un contenido que se te proporciona rompe con los estandares del DMCA notificar para proceder con la evaluacion y eliminacion del mismo." +
    "\n" +
    "Comandos:" +
    "\n" +
    "Buscar : este comando le debes pasar el termino, ejemplo: /buscar Curso Basico de Python" +
    "\n" +
    "Length : este comando te devuelve el numero de cursos que se ha subido,no recibe parametros: /length" +
    "\n" +
    "Cursos : este comando te devuelve una botonera con los links de acceso del curso mostrada en la imagen y un boton de cambiar al siguienteo,no recibe parametros: /cursos";
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
bot.onText(/^\/length/, function(msg) {
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
                console.log(result);
                db.close();
            });
    });
    //  bot.sendMessage(chatId, "Bienvenido a mi bot " + chatId);

});


bot.onText(/^\!qr/, function(msg) {
    console.log(msg);
    var userId = msg.from.id;
    //https://t.me/joinchat/AAAAAFZ6znHLX7X8uzn1rg

    var data = msg.text.substring(3).trim();
    var imageqr =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;
    bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ")Qr code de: ", {
        parse_mode: "Markdown",
    });
});
bot.onText(/^\/canal/, function(msg) {
    console.log(msg);
    var userId = msg.from.id;
    //https://t.me/joinchat/AAAAAFZ6znHLX7X8uzn1rg
    var fu = "https://t.me/joinchat/AAAAAFZ6znHLX7X8uzn1rg";
    //var data = msg.text.substring(3).trim();
    var data = fu;
    var imageqr =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;
    bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ")Qr code del link del canal: ", {
        parse_mode: "Markdown",
    });
});

var num = 0;

function carta(chatId, nombre, imagen, url1, url2, url3) {
    var f = num + 1;
    bot.sendPhoto(
        chatId,
        imagen, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Siguiente curso",
                        callback_data: "boton4",
                    }, ],
                ],
            },
            caption: "curso #" +
                f +
                " " +
                nombre +
                "\n" +
                "Telegram:" +
                url1 +
                "\n" +
                "Mega:" +
                url2 +
                "\n" +
                "Google Drive:" +
                url3 + " #escueladedesarrollo web",
        }

    );
    // bot.sendMessage(
    //     chatId,
    //     "curso #" +
    //     f +
    //     " " +
    //     nombre +
    //     "\n" +
    //     "Telegram:" + url1 +
    //     "\n" +
    //     "Mega:" + url2 +
    //     "\n" +
    //     "Google Drive:" + url3, {
    //         reply_markup: {
    //             inline_keyboard: [
    //                 [{
    //                     text: "Siguiente curso",
    //                     callback_data: "boton4",
    //                 }, ],
    //             ],
    //         },
    //     }
    // );
    // bot.sendPhoto(chatId, imagen);
}

function ll() {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unoriesgo");
        dbo
            .collection("recursos")
            .find({})
            .toArray(function(err, result) {
                if (err) throw err;
                length = result.length;
                // bot.sendMessage(chatId, "La cantidad de cursos es de " + result.length);
                console.log(result);
                db.close();
            });
    });
}

function getmovie(movie, chatId) {
    $.getJSON("https://apiroommovie.herokuapp.com/api/movies").then(function(
        response
    ) {


        j(chatId, response.length);
    });
}

function j(chatId, valor) {

    //  console.log(https://image.tmdb.org/t/p/w500+response.results[e].poster_path);
    bot.sendMessage(chatId, valor);
    //   bot.sendMessage(chatId, num)


}

bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    console.log(msg.chat)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unoriesgo");
        var query = { nombre: resp };
        dbo
            .collection("recursos")
            .find(query)
            .toArray(function(err, result) {
                if (err) throw err;
                if (result.length == 0) {
                    bot.sendMessage("-436098559", resp + "este grupo me la pela");
                } else {
                    $.getJSON(
                        "https://recursosinformaticos.herokuapp.com/api/recursos" +
                        result[0]._id
                    ).then(function(response) {
                        console.log(response.nombre);
                        //   listar(msg, result);

                        bot.sendMessage(chatId, resp);
                    });
                }

                db.close();
            });
    });
});

idgroup = "-436098559"
bot.onText(/\/getid (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    console.log(msg.chat);
    bot.sendMessage(chatId, "tu id de grupo es " + chatId);
});
bot.onText(/\/cantidad/, function onEditableText(msg) {
    const chatId = msg.chat.id;

    $.getJSON("https://recursosinformaticos.herokuapp.com/api/recursos").then(
        function(response) {
            bot.sendMessage(chatId, "La cantidad de Recursos es de " + (response.length - 1));
            //  listar(msg, response);
        }
    );
});
bot.onText(/\/getid (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    console.log(msg.chat);
    bot.sendMessage(chatId, "tu id de grupo es " + chatId);
});
bot.onText(/\/cursoid (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    console.log(msg.chat);

    $.getJSON("https://recursosinformaticos.herokuapp.com/api/recursos").then(
        function(response) {

            //  listar(msg, response);
            if (resp >= 0 && resp <= response.length) { bot.sendMessage(chatId, response[resp].nombre); } else { bot.sendMessage(chatId, "el numero que solicitas no existe, consulta la cantidad con /cantidad"); }
        }
    );

});
bot.onText(/\/cursos/, function onEditableText(msg) {
    const opts31 = {
        chat_id: idgroup,
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
    const chatId = msg.chat.id;
    var a = ["1", "2", "3"];
    var b = ["i", "ii", "ii"];
    $.getJSON("https://recursosinformaticos.herokuapp.com/api/recursos").then(
        function(response) {
            bot.sendMessage(chatId, "tu id de grupo es " + response, opts31);
            //bot.editMessageText("text", opts3);
            // listar(msg, response);
        }
    );
});


var f;
var n = 0;
bot.on("callback_query", function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
        chat_id: idgroup,
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
        chat_id: idgroup,
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
        chat_id: idgroup,
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
    var a = 1;
    if (a >= 2) {
        a = a - 2;
    }
    if (action === "next") {
        bot.editMessageText("mensaje editado", opts2);
        // if (n <= a) {
        //     n++;
        //     text =
        //         f[n].nombre +
        //         "\n" +
        //         f[n].imagen +
        //         "\n" +
        //         "Telegram:" +
        //         f[n].links[0].url +
        //         "\n" +
        //         "Mega:" +
        //         f[n].links[1].url +
        //         "\n" +
        //         "Google Drive:" +
        //         f[n].links[2].url;
        //     bot.editMessageText(text, opts);
        // } else {
        //     text =
        //         f[n].nombre +
        //         "\n" +
        //         f[n].imagen +
        //         "\n" +
        //         "Telegram:" +
        //         f[n].links[0].url +
        //         "\n" +
        //         "Mega:" +
        //         f[n].links[1].url +
        //         "\n" +
        //         "Google Drive:" +
        //         f[n].links[2].url;
        //     bot.editMessageText(text, opts2);
        // }
    }

    if (action === "prev") {
        if (n >= 1) {
            n--;
            text =
                f[n].nombre +
                "\n" +
                f[n].imagen +
                "\n" +
                "Telegram:" +
                f[n].links[0].url +
                "\n" +
                "Mega:" +
                f[n].links[1].url +
                "\n" +
                "Google Drive:" +
                f[n].links[2].url;
            bot.editMessageText(text, opts);
        } else {
            text =
                "Curso Inicial  " +
                f[n].nombre +
                "\n" +
                f[n].imagen +
                "\n" +
                "Telegram:" +
                f[n].links[0].url +
                "\n" +
                "Mega:" +
                f[n].links[1].url +
                "\n" +
                "Google Drive:" +
                f[n].links[2].url;
            bot.editMessageText(text, opts3);
        }
    }
    if (action === "page") {
        n++;
        text =
            f[n].nombre +
            "\n" +
            f[n].imagen +
            "\n" +
            "Telegram:" +
            f[n].links[0].url +
            "\n" +
            "Mega:" +
            f[n].links[1].url +
            "\n" +
            "Google Drive:" +
            f[n].links[2].url;
        bot.editMessageText(text, opts);
    }
    if (action === "ini") {
        n = 0;
        text =
            f[n].nombre +
            "\n" +
            f[n].imagen +
            "\n" +
            "Telegram:" +
            f[n].links[0].url +
            "\n" +
            "Mega:" +
            f[n].links[1].url +
            "\n" +
            "Google Drive:" +
            f[n].links[2].url;
        bot.editMessageText(text, opts3);
    }
});
bot.onText(/\/editable/, function onEditableText(msg) {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Edit Text",
                    // we shall check for this value when we listen
                    // for "callback_query"
                    callback_data: "edit",
                }, ],
            ],
        },
    };
    bot.sendMessage("-436098559", "Original Text", opts);
});
// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
    };
    let text;

    if (action === 'edit') {
        text = 'Edited Text';
    }

    bot.editMessageText(text, opts);
});
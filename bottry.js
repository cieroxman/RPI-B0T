//"-436098559"
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
    "mongodb+srv://admin:superadmin@cluster0.av7ui.mongodb.net/RecursosInformaticos?retryWrites=true&w=majority";;
var $ = (jQuery = require("jquery")(window));
bot.on("polling_error", function(error) {
    console.log(error);
});
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
var f;
var n = 0;
// Matches /editable
bot.onText(/\/cursos/, function onEditableText(msg) {
    var a = ["1", "2", "3"];
    var b = ["i", "ii", "ii"];
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
            "Curso " +
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
            "Curso " +
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
// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function onEchoText(msg, match) {
    const resp = match[1];
    bot.sendMessage(msg.chat.id, resp);
});
var hoy = new Date();
var fecha = hoy.getDate();
bot.onText(/\/pole/, function onPhotoText(msg) {
    // From file path
    //const photo = `${__dirname}/../test/data/photo.gif`;
    bot.sendMessage(msg.chat.id, fecha);
});
bot.onText(/^\/mute (.+)/, function(msg, match) {
        var chatId = msg.chat.id;
        var fromId = msg.from.id;
        var replyId = msg.reply_to_message.from.id;
        var replyName = msg.reply_to_message.from.first_name;
        var fromName = msg.from.first_name;

        // Recogerá en el comando el tiempo de baneo
        var tiempo = match[1];

        // Nos permitirá manejar el tiempo
        var ms = require('ms')

        // Se encargará de manejar los privilegios que el usuario tendrá restringidos.
        const perms = {};
        perms.can_send_message = false;
        perms.can_send_media_messages = false;
        perms.can_send_other_messages = false;
        perms.can_can_add_web_page_previews = false;

        if (msg.reply_to_message == undefined) {
            return;
        }

        bot.getChatMember(chatId, fromId).then(function(data) {
                if ((data.status == 'creator') || (data.status == 'administrator')) {
                    bot.restrictChatMember(chatId, replyId, { until_date: Math.round((Date.now() + ms(tiempo + "days") / 1000)) }, perms).then(function(result) {
                            bot.sendMessage(chatId, "El usuario " + replyName + " ha sido muteado durante " + tiempo + " días");
                        }) // restrictChatMember
                } else {
                    bot.sendMessage(chatId, "Lo siento " + fromName + " no eres administrador");
                }
            }) // getChatMember
    }) // Comando
bot.onText(/^\/unmute/, function(msg) {
        var chatId = msg.chat.id;
        var fromId = msg.from.id;
        var fromName = msg.from.first_name;
        var replyName = msg.reply_to_message.from.first_name;
        var replyId = msg.reply_to_message.from.id;
        const perms = {};

        perms.can_send_message = true;
        perms.can_send_media_messages = true;
        perms.can_send_other_messages = true;
        perms.can_can_add_web_page_previews = true;

        if (msg.reply_to_message == undefined) {
            return;
        }

        bot.getChatMember(chatId, fromId).then(function(data) {
                if ((data.status == 'creator') || (data.status == 'administrator')) {
                    bot.restrictChatMember(chatId, replyId, perms).then(function(result) {
                            bot.sendMessage(chatId, "El usuario " + replyName + " ha sido desmuteado");
                        }) // restrictChatMember
                } else {
                    bot.sendMessage(chatId, "Lo siento " + fromName + " no eres administrador");
                }
            }) // getChatMember
    }) // Comando

// Handle callback queries
bot.on("callback_query", function onCallbackQuery(callbackQuery) {
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
    var a = f.length;
    if (a >= 2) {
        a = a - 2;
    }
    if (action === "next") {
        if (n <= a) {
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
        } else {
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
            bot.editMessageText(text, opts2);
        }
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
bot.onText(/^\/getid/, function(msg) {
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
                bot.sendMessage(chatId, "El id del grupo es" + chatId);
                // console.log(result);
                db.close();
            });
    });
    //  bot.sendMessage(chatId, "Bienvenido a mi bot " + chatId);
});
bot.onText(/^\/cantidad/, function(msg) {
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("RecursosInformaticos");
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
bot.onText(/^\/dado/, (msg) => {
    bot.sendDice(msg.chat.id);
});
bot.onText(/^\/dardo/, (msg) => {
    const opts = {
        emoji: "🎯",
    };
    bot.sendDice(msg.chat.id, opts);
});
bot.onText(/^\/custom/, function(msg) {

    var chatId = msg.chat.id;
    var userId = msg.reply_to_message.from.id; // ID del usuario al que respondemos mediante un mensaje con el comando

    bot.setChatAdministratorCustomTitle(chat_id, user_id, "El Banhammer");
});
bot.onText(/^\/admin/, function(msg) {

    var chatId = msg.chat.id;
    var userId = msg.reply_to_message.from.id; // ID del usuario al que respondemos al mensaje

    // Objecto con los permisos
    const perms = {
        can_change_info: true,
        can_invite_users: true
    }

    bot.promoteChatMember(chat_id, user_id, perms);
});
bot.onText(/\/buscar (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    var f = [];
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    $.getJSON(
        "https://recursosinformaticos.herokuapp.com/api/recursos"
    ).then(function(response) {
        for (let index = 0; index < response.length; index++) {
            //   const element = array[index];
            if (response[index].nombre.toUpperCase().includes(resp.toUpperCase())) {
                f.push(response[index]);
                console.log(response[index].nombre);
            }

        }
        // const getrecursos = response.find(curso => curso.nombre == "Git");
        // console.log(getrecursos)
        //  result.indexOf("Excel")
        if (f.length == 0) { bot.sendMessage(chatId, "no encontrado"); } else { listar(msg, f); }


        //  
    });
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("RecursosInformaticos");
    //     var query = { nombre: /.*Excel*/ }; //{ nombre: resp };
    //     dbo
    //         .collection("recursos")
    //         .find(query)
    //         .toArray(function(err, result) {
    //             if (err) throw err;
    //             if (result.length == 0) {
    //                 bot.sendMessage(chatId, "No existe el termino que buscas");
    //             } else {
    //               console.log()
    //                 //  bot.sendMessage(chatId, result);
    //                 $.getJSON(
    //                     "https://recursosinformaticos.herokuapp.com/api/recursos" +
    //                     result[0]._id
    //                 ).then(function(response) {
    //                     console.log(response.nombre);
    //                     result.indexOf("Excel")
    //                     listar(msg, result);

    //                     //  bot.sendMessage(chatId, "work busc");
    //                 });
    //             }

    //             db.close();
    //         });
    // });
    // }); bot.onText(/\/cursoid (.+)/, (msg, match) => {
    // // 'msg' is the received Message from Telegram
    // // 'match' is the result of executing the regexp above on the text content
    // // of the message

    // const chatId = msg.chat.id;
    // const resp = match[1]; // the captured "whatever"
    // console.log(msg.chat);

    // $.getJSON("https://recursosinformaticos.herokuapp.com/api/recursos").then(
    //     function(response) {
    //         //  listar(msg, response);
    //         if (resp >= 0 && resp <= response.length) {
    //             bot.sendMessage(
    //                 chatId,

    //                 response[resp].nombre +
    //                 "\n" +
    //                 response[resp].imagen +
    //                 "\n" +
    //                 "Telegram:" +
    //                 response[resp].links[0].url +
    //                 "\n" +
    //                 "Mega:" +
    //                 response[resp].links[1].url +
    //                 "\n" +
    //                 "Google Drive:" +
    //                 response[resp].links[2].url
    //             );
    //         } else {
    //             bot.sendMessage(
    //                 chatId,
    //                 "el numero que solicitas no existe, consulta la cantidad con /cantidad"
    //             );
    //         }
    //     }
    // );
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
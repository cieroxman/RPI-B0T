//"-436098559"
const groupid = "-1001386454830";
const TelegramBot = require("node-telegram-bot-api");
const token = "1482047845:AAHUxw4Xt1SjwXdTv5hp4_0lMCArAkrHuOY";
const imgur = require("imgur-node-api");

const bot = new TelegramBot(token, { polling: true });
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;
var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb+srv://admin:superadmin@cluster0.av7ui.mongodb.net/RecursosInformaticos2?retryWrites=true&w=majority";
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
    var nameUser = msg.from.username;
    var chatid = msg.chat.id;
    bot.sendMessage(
        "-474004021",
        "El usuario @" +
        nameUser +
        " con ID " +
        chatid +
        " uso el bot con el comando /cursos"
    );
    var b = ["i", "ii", "ii"];
    $.getJSON("https://recursosinformaticos2.herokuapp.com/api/recursos").then(
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
            // arr[n].imagen +
            // "\n" +
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
            // arr[n].imagen +
            // "\n" +
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
bot.onText(/\/paltaoaguacate/, function onPhotoText(msg) {
    // From file path
    //const photo = `${__dirname}/../test/data/photo.gif`;
    bot.sendMessage(msg.chat.id, "Es AGUACATE @morgana_exe ");
});
bot.onText(/\/getid/, function onPhotoText(msg) {
    // From file path
    //const photo = `${__dirname}/../test/data/photo.gif`;
    bot.sendMessage(msg.chat.id, msg.chat.username);
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
    var ms = require("ms");

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
        if (data.status == "creator" || data.status == "administrator") {
            bot
                .restrictChatMember(
                    chatId,
                    replyId, { until_date: Math.round(Date.now() + ms(tiempo + "days") / 1000) },
                    perms
                )
                .then(function(result) {
                    bot.sendMessage(
                        chatId,
                        "El usuario " +
                        replyName +
                        " ha sido muteado durante " +
                        tiempo +
                        " días"
                    );
                }); // restrictChatMember
        } else {
            bot.sendMessage(
                chatId,
                "Lo siento " + fromName + " no eres administrador"
            );
        }
    }); // getChatMember
}); // Comando
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
        if (data.status == "creator" || data.status == "administrator") {
            bot.restrictChatMember(chatId, replyId, perms).then(function(result) {
                bot.sendMessage(
                    chatId,
                    "El usuario " + replyName + " ha sido desmuteado"
                );
            }); // restrictChatMember
        } else {
            bot.sendMessage(
                chatId,
                "Lo siento " + fromName + " no eres administrador"
            );
        }
    }); // getChatMember
}); // Comando

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
                // f[n].imagen +
                // "\n" +
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
                // f[n].imagen +
                // "\n" +
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
                // f[n].imagen +
                // "\n" +
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
                // f[n].imagen +
                // "\n" +
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
            // f[n].imagen +
            // "\n" +
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
            // f[n].imagen +
            // "\n" +
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
    var nameUser = msg.from.username;
    var chatid = msg.chat.id;
    bot.sendMessage(
        "-474004021",
        "El usuario @" +
        nameUser +
        " con ID " +
        chatid +
        " uso el bot con el comando /cantidad"
    );
    var chatId = msg.chat.id;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("RecursosInformaticos2");
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
        can_invite_users: true,
    };

    bot.promoteChatMember(chat_id, user_id, perms);
});
bot.onText(/\/buscar (.+)/, (msg, match) => {
    var nameUser = msg.from.username;
    var chatid = msg.chat.id;
    bot.sendMessage(
        "-474004021",
        "El usuario @" +
        nameUser +
        " con ID " +
        chatid +
        " uso el bot con el comando /buscar"
    );
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    var f = [];
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    $.getJSON("https://recursosinformaticos2.herokuapp.com/api/recursos").then(
        function(response) {
            for (let index = 0; index <= response.length - 2; index++) {
                //   const element = array[index];
                if (response[index].nombre.toUpperCase().includes(resp.toUpperCase())) {
                    f.push(response[index]);
                    console.log(response[index].nombre);
                }
            }
            // const getrecursos = response.find(curso => curso.nombre == "Git");
            // console.log(getrecursos)
            //  result.indexOf("Excel")
            if (f.length == 0) {
                bot.sendMessage(chatId, "no encontrado");
            } else {
                listar(msg, f);
            }

            //
        }
    );
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
    // });

    // // 'msg' is the received Message from Telegram
    // // 'match' is the result of executing the regexp above on the text content
    // // of the message
});
bot.onText(/\/cursoid (.+)/, (msg, match) => {
    var nameUser = msg.from.username;
    var chatid = msg.chat.id;
    bot.sendMessage(
        "-474004021",
        "El usuario @" +
        nameUser +
        " con ID " +
        chatid +
        " uso el bot con el comando /cursoid"
    );
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    //console.log(msg.chat);
    $.getJSON("https://recursosinformaticos2.herokuapp.com/api/recursos").then(
        function(response) {
            //  listar(msg, response);
            if (resp >= 0 && resp <= response.length) {
                bot.sendMessage(
                    groupid,

                    response[resp].nombre +
                    "\n" +
                    response[resp].imagen +
                    "\n" +
                    "Telegram:" +
                    response[resp].links[0].url +
                    "\n" +
                    "Mega:" +
                    response[resp].links[1].url +
                    "\n" +
                    "Google Drive:" +
                    response[resp].links[2].url
                );
            } else {
                bot.sendMessage(
                    groupid,
                    "hola " +
                    msg.chat.id +
                    " el numero que solicitas no existe, consulta la cantidad con /cantidad"
                );
                bot.sendMessage(
                    chatId,
                    "Este contenido es exclusivo para el grupo RPI"
                );
            }
        }
    );
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
            var dbo = db.db("RecursosInformaticos2");
            var myobj = {
                id: msg.from.id,
                username: msg.from.first_name + " " + msg.from.last_name,
                alias: msg.from.username,
                createdAt: msg.date,
            };
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("RecursosInformaticos2");
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
                            bot.sendMessage(msg.from.id, "Tu Usuario es: " + msg.from.id);
                        } else {
                            dbo
                                .collection("userstg")
                                .insertOne(myobj, function(err, res) {
                                    if (err) throw err;
                                    console.log("1 document inserted");
                                    bot.sendMessage(
                                        groupid,
                                        msg.from.first_name +
                                        " " +
                                        msg.from.last_name +
                                        " ha sido verificado  "
                                    );
                                    bot.sendMessage(
                                        msg.from.id,
                                        "Tu Usuario es: " + msg.from.id
                                    );
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
// Creamos el comando
bot.onText(/^\/imgur/, function(msg) {
        // Recogemos el chatId donde se realiza la petición-
        var chatId = msg.chat.id;

        /*
        Obligamos de alguna manera a que el usuario tenga que responder a una imagen que previamente haya sido enviada
        para poder obtener los datos que necesitamos para obtener el enlace de los servidores de Telegram.
        */

        // Le indicamos que si no respondemos a la imagen, no haga nada.
        if (msg.reply_to_message == undefined) {
            return;
        }
        console.log(msg)
            /*
            Visualizando el contenido mediante console.log(msg), se puede observar los parámetros de la imagen. 
            Habitualmente suele devolver un Array con 3 resultados. 
            Como recomendación, deja marcada por defecto la posición [2] del array, 
            principalmente por la calidad de la imagen.
            */

        var photo = msg.reply_to_message.photo[0].file_id
            // Con esto obtendríamos el id del archivo de los servidores de Telegram.

        bot.getFileLink(photo).then(function(enlace) {
            // "enlace", devuelve la url de la imagen subida en Telegram
            console.log(enlace);
            //
            var clientId = "1b54fecc7e593b7";

            // Establecemos el cliente y procedemos a la subida

            imgur.setClientID(clientId);

            // Pasamos como parametro "enlace"

            imgur.upload(enlace, function(err, res) {
                // "res.data.link" devuelve la url de la imagen ya subida a Telegram
                console.log(res.data.link);
                var link = res.data.link;

                // Y por último, enviaremos el enlace en un mensaje
                bot.sendMessage(
                    chatId,
                    "Enlace de la imagen subida a Imgur: \n" + link
                );
            });
        })
    })
    /*
    Debemos dar nuestro clientId que previamente hemos solicitado para de alguna manera identificarnos. 
    La subida de imagenes son totalmente anonimas.
    */
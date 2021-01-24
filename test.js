const groupid = "1203528828";
const TelegramBot = require("node-telegram-bot-api");
const token = "1482047845:AAHUxw4Xt1SjwXdTv5hp4_0lMCArAkrHuOY";
const bot = new TelegramBot(token, { polling: true });
const axios = require("axios");

bot.onText(/\/buscar (.+)/, function onEchoText(msg, match) {
    const resp = match[1];
    //  asyncCall(msg);
    traercursos(msg, resp);

});
// (async() => {
//     try {
//         const response = await axios.get(
//             "https://recursosinformaticos.herokuapp.com/api/recursos"
//         );
//         console.log(response.data.length);
//         //console.log(response.data.explanation);
//     } catch (error) {
//         console.log(error.response.body);
//     }
// })();

function resolveAfter2Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, 2000);
    });
}

async function asyncCall(r) {
    console.log("calling");
    const result = await resolveAfter2Seconds();
    bot.sendMessage(r.from.id, result);
    console.log(result);
    // expected output: "resolved"
}
f = [];
async function traercursos(mensaje, termino) {
    bot.sendMessage("1203528828", "Buscando... " + termino);
    const response = await axios.get(
        "https://recursosinformaticos.herokuapp.com/api/recursos"
    );
    listar(response, termino);
    // 


    // const getrecursos = response.find(curso => curso.nombre == "Git");
    // console.log(getrecursos)
    //  result.indexOf("Excel")
    // if (f.length == 0) {
    //     // bot.sendMessage("1203528828", "no encontrado");
    // } else {
    //     listar(msg, f);
    // }
    //bot.sendMessage(r.from.id, result);
    // console.log(result);
    // expected output: "resolved"
}

function listar(response, termino) {
    arr = response.data;
    busquedad = [];
    for (let index = 0; index < arr.length; index++) {
        //
        if (arr[index].nombre.includes("Curso")) {

            console.log(arr[index].nombre);

        }
        //   const element = array[index];
        // if (arr[index].nombre.toUpperCase().includes(termino.toUpperCase())) {
        //     //  busquedad.push(arr[index]);
        //     //     arr.push(response.data[index]);
        //     //     //  bot.sendMessage("1203528828", response.data[index].nombre);

        //     //     //
        //     //     //
        // }
    }
    bot.sendMessage("1203528828", "busquedad[0].nombre");
    //console.log(arr);
}
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

function listr(msg, arr) {
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
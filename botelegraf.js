// const Telegraf = require("telegraf");

// const bot = new Telegraf("1474067552:AAFey_F3tQyQINZmkK4_-oxB2lvs0XgCGmQ");
// const Extra = require("telegraf/extra");
// const Markup = require("telegraf/markup");
// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = new JSDOM("").window;
// global.document = document;
// var f = ["curso", "test"];
// var $ = (jQuery = require("jquery")(window));
// const axios = require("axios");
// // const testMenu = Telegraf.Extra.markdown().markup((m) =>
// //     m.inlineKeyboard([
// //         // m.button("Google", hide = true),
// //         //
// //         m.callbackButton("text", "w")
// //     ])
// // );

// // bot.hears(f, (ctx) => {

// //     ctx.reply("Curso de javascript", testMenu).then(() => {
// //         ctx.replyWithPhoto({
// //             url: "https://picsum.photos/200/300/?random",
// //             filename: "kitten.jpg",
// //         });
// //     });
// // })

// bot.on("callback_query", (ctx) => {
//     // get info from callback_query object
//     const subreddit = ctx.update.callback_query.data;
//     const userId = ctx.update.callback_query.from.id;

//     // check if user state and its properties exist
//     let type;
//     let index;
//     try {
//         type = state[userId].command ? state[userId].command : "top";
//         index = state[userId].index;
//     } catch (err) {
//         return ctx.reply("Send a subreddit name.");
//     }

//     // reply with a popup to callback
//     ctx.answerCallbackQuery("Wait...");

//     axios
//         .get(`https://reddit.com/r/${subreddit}/${type}.json?limit=10`)
//         .then((res) => {
//             const data = res.data.data;

//             // check if next one exists
//             if (!data.children[index + 1]) return ctx.reply("No more posts!");

//             // send next link and update the user state with new index
//             const link = `https://reddit.com/${
//         data.children[index + 1].data.permalink
//       }`;
//             state[userId].index = state[userId].index + 1;
//             return ctx.reply(
//                 link,
//                 Markup.inlineKeyboard([
//                     Markup.callbackButton("➡️ Next", subreddit),
//                 ]).extra()
//             );
//         })
//         .catch((err) => console.log(err));
// });

// function cart(ctx) {
//     ctx.reply("welo")
// }
// const testMenu = Telegraf.Extra
//     .markdown()
//     .markup((m) => m.inlineKeyboard([
//         m.callbackButton('Test button', 'test')
//     ]))

// const aboutMenu = Telegraf.Extra
//     .markdown()
//     .markup((m) => m.keyboard([
//         m.callbackButton('⬅️ Back'),
//         m.callbackButton('⬅️ next')
//     ]).resize())

// bot.hears('test', (ctx) => {
//     ctx.reply('test message', testMenu).then(() => {
//         ctx.reply('about', aboutMenu)
//     })
// })

// bot.action('test', (ctx) => ctx.answerCallbackQuery('Yay!'))
// bot.launch();




























































// // bot.use((ctx, next) => {
// //     //  ctx.reply("usaste el bot");
// //     // next();
// //     ctx.state.users = 75;
// //     next(ctx); //next is passed because we can modify data
// // });
// // bot.command(["cursos", "inversiones", "Inversion", "Inversiones"], (ctx) => {
// //     //Para poner botones y el extra de parse HTML
// //     carta(ctx);
// // });
// // bot.start((ctx) => {
// //     // ctx.reply('Welcome');
// //     // console.log(ctx)
// //     // console.log(ctx.from)
// //     // console.log(ctx.chat)
// //     // console.log(ctx.message)
// //     // console.log(ctx.updateSubTypes)
// //     console.log(ctx.updateSubTypes[0]);

// //     // ctx.reply(`Welcome ${ctx.from.first_name} ${ctx.from.last_name}`)
// //     // ctx.reply(`Total Users: ${ctx.state.users}`) // shurtcuts does not require id

// //     // shortcuts avoid to write the following
// //     // bot.telegram.sendMessage(ctx.chat.id, 'hello world', [extra]);
// //     //  bot.telegram.sendMessage(ctx.chat.id, "hello world");
// //     bot.telegram.sendMessage(
// //         ctx.chat.id,
// //         "<i>Te llego una notificacion?</i> <b> responde</b>", {
// //             parse_mode: "HTML",
// //             disable_notification: false,
// //         }
// //     );
// // });

// // bot.help((ctx) => ctx.reply("help command"));

// // bot.settings((ctx) => ctx.reply("settings command"));

// // // Custom Command
// // // to avoid case sensitive commando you can put in an array some variations
// // bot.command(["computadora", "Mytest", "test"], async(ctx) => {
// //     //  var chatId = msg.chat.id;
// //     //  var nameUser = msg.from.first_name;
// //     var s = "d ";
// //     $.getJSON("https://recursosinformaticos.herokuapp.com/api/recursos").then(
// //         function(response) {
// //             for (let index = 0; index < response.length; index++) {
// //                 //  const element = response[index];
// //                 s += "/" + response[index]._id + " " + response[index].nombre;
// //                 //+ " ," + response[index].nombre + "\n"
// //             }
// //             ctx.reply(s);
// //             //  bot.sendMessage(chatId, s);
// //             //"Hola " + nameUser + ", Se tiene un total de " + response.length + "cursos los cuales son:" + "\n" +
// //             //    bot.sendPhoto(chatId, response[0].imagen);
// //             //  bot.sendMessage(chatId, response[0].nombre + " ");
// //             //j(chatId, response.length);
// //         }
// //     );

// // });
// // bot.hears("Hola", (ctx) =>
// //     ctx.replyWithHTML(
// //         `Hola <b>${ctx.from.first_name}</b>, ¿qué tal estás?. Tu ID en Telegram es: <b>${ctx.message.from.id}</b>\n\nTu username es: <b>${ctx.message.from.username}</b>`
// //     )
// // );

// // function carta(ctx) {
// //     ctx.telegram.sendMessage(
// //         ctx.chat.id,
// //         "<i>Estamos en</i> <h1>construccion</h1>", {
// //             reply_markup: {
// //                 inline_keyboard: [
// //                     [

// //                         { text: "click me", url: "www.google.com" },
// //                         { text: "click me", url: "www.mediavida.com" },
// //                         { text: "click me", url: "www.google.com" },
// //                         { text: "click me", url: "www.mediavida.com" },
// //                         { text: "click me", url: "www.mediavida.com" },
// //                         { text: "click me", url: "www.mediavida.com" },
// //                         { text: "click me", url: "www.mediavida.com" },
// //                         { text: "click me", url: "www.mediavida.com" },
// //                     ],
// //                 ],
// //             },
// //         }
// //     );
// // }
// // // hears
// // // This wont work on groups, so you will have to turn off 'privacy group'
// // bot.hears("computra", (ctx) => {
// //     ctx.reply("Hey yo amo las computadoras");
// // });

// // // bot.on('text', ctx => {
// // //   ctx.reply('text message');
// // // });

// // // bot.on('sticker', ctx => {
// // //   ctx.reply('oh! you like stickers')
// // // })

// // // this methods can be recognized inside a long text
// // bot.mention("BotFather", (ctx) => {
// //     ctx.reply("you mentioned someone");
// // });

// // bot.phone("+1 730 263-4233", (ctx) => {
// //     ctx.reply("this is a phone");
// // });

// // bot.hashtag("coding", (ctx) => {
// //     ctx.reply("hashtag!");
// // });

// // bot.hears(["hola", "Hola"], (ctx) =>
// //     ctx.replyWithHTML(
// //         `Hola <b>${ctx.from.first_name}</b>, ¿qué tal estás?. Tu ID en Telegram es: <b>${ctx.message.from.id}</b>\n\nTu username es: <b>${ctx.message.from.username}</b>`
// //     )
// // );
// // bot.hears(/calor/i, (ctx) =>
// //     ctx.reply("Pues si, parece que hacer calor por aqui....")
// // );
// // // const teclado = Markup.inlineKeyboard([
// // //     Markup.urlButton("❤️", "https://www.iessanclemente.net"),
// // //     //  Markup.gameButton(r, false),
// // //     Markup.callbackButton("Borrar", "accionborrar"),
// // // ]);

// // //Programación de accionborrar. Borra el mensaje y el teclado asociado.
// // bot.action("accionborrar", ({ deleteMessage }) => deleteMessage());

// // // Cuando reciba un mensaje que no está programado anteriormente entonces, responde con un teclado de ejemplo, que muestra un enlace y un botón de Borrar (que borra el mensaje actual)
// // // bot.on("message", (ctx) =>
// // //     ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(teclado))
// // // );
// // bot.on("photo", (ctx) => {
// //     let urlInfoFichero = `https://api.telegram.org/bot${"1474067552:AAFey_F3tQyQINZmkK4_-oxB2lvs0XgCGmQ"}/getFile?file_id=${
// //     ctx.message.photo[ctx.message.photo.length - 1].file_id
// //   }`;
// //     ctx.replyWithHTML(
// //         `Hola <i>${ctx.from.first_name}</i>, ¿qué tal estás?. Tu ID en Telegram es: <b>${ctx.message.from.id}</b>\n\nTu username es: <b>${ctx.message.from.username}</b>`
// //     );
// //     // Nos conectamos a Telegram para averiguar la carpeta dónde se almacenó la foto.
// //     request(urlInfoFichero, function(err, response, body) {
// //         body = JSON.parse(body);

// //         let urlDescargaFichero = `https://api.telegram.org/file/bot${"1474067552:AAFey_F3tQyQINZmkK4_-oxB2lvs0XgCGmQ"}/${body.result.file_path}`;

// //         // Generamos un nombre único para ese fichero, para poder guardar en /descargas
// //         let nombreFinalFichero =
// //             uniqueFilename("./descargas/") +
// //             "." +
// //             body.result.file_path.split(".").pop();

// //         descargarFichero(urlDescargaFichero, nombreFinalFichero, function() {
// //             ctx.replyWithHTML(
// //                 "Imagen recibida correctamente en el servidor. Le mandamos una copia"
// //             );

// //             // Esta foto ya está en TElegram, con lo que si ponemos el file_id es suficiente.
// //             ctx.replyWithPhoto(body.result.file_id);

// //             // Si queremos enviar una foto sacada de Internet....
// //             // ctx.replyWithPhoto('http://www.discovery-8.com/wp-content/uploads/2017/07/parapente-algodonales.jpeg');
// //         });
// //     });
// // });
// // const testMenu = Telegraf.Extra
// //     .markdown()
// //     .markup((m) => m.inlineKeyboard([
// //         m.callbackButton('Test button', 'test')
// //     ]))

// // const aboutMenu = Telegraf.Extra
// //     .markdown()
// //     .markup((m) => m.keyboard([
// //         m.callbackButton('⬅️ Back'),
// //         m.callbackButton('⬅️ next')
// //     ]).resize())

// // bot.hears('test', (ctx) => {
// //     ctx.reply('test message', testMenu).then(() => {
// //         ctx.reply('about', aboutMenu)
// //     })
// // })

// // bot.action('test', (ctx) => ctx.answerCallbackQuery('Yay!'))

// const Telegraf = require("telegraf");
// const app = new Telegraf("1474067552:AAFey_F3tQyQINZmkK4_-oxB2lvs0XgCGmQ");

// app.hears("hi", (ctx) => {
//     return ctx.reply("Hey!");
// });
// const axios = require("axios"); // add axios

// // handle the reaction everytime user sends a text message
// app.on("text", (ctx) => {
//     // ctx object holds the Update object from Telegram API
//     // So you can use everything you see there

//     // get the text message sent by user
//     const subreddit = ctx.message.text;

//     // GET the data from Reddit API
//     axios
//         .get(`https://reddit.com/r/${subreddit}/top.json?limit=10`)
//         .then((res) => {
//             // data recieved from Reddit
//             const data = res.data.data;

//             // if subbreddit does not exist
//             if (data.children.length < 1)
//                 return ctx.reply("The subreddit couldn't be found.");

//             // send the first top post link to the user
//             const link = `https://reddit.com/${data.children[0].data.permalink}`;
//             return ctx.reply(link);
//         })

//     // if there's any error in request
//     .catch((err) => console.log(err));
// });
// let state = {};


// app.command("top", (ctx) => {
//     const userId = ctx.message.from.id;
//     // check if state and command exists and set defaults
//     const type = !state[userId] ?
//         "top" :
//         state[userId].command ?
//         state[userId].command :
//         "top";
//     axios
//         .get(`https://reddit.com/r${subreddit}/${type}.json?limit=10`)
//         .then((res) => [
//             // do stuff
//         ]);
//     // if user id does not exist create one
//     if (!state[userId]) state[userId] = { id: userId };

//     // save/update user last command
//     state[userId].command = "top";
//     return ctx.replyWithMarkdown(`Enter a subreddit name to get *top* posts.`);
// });

// app.command("hot", (ctx) => {
//     const userId = ctx.message.from.id;
//     if (!state[userId]) state[userId] = { id: userId };
//     state[userId].command = "hot";
//     return ctx.replyWithMarkdown("Enter a subreddit name to get *hot* posts.");
// });

// app.startPolling();
const TeleBot = require("telebot");
const fs = require("fs");
const request = require("request");
const bot = new TeleBot(token);

let db = {};
let rLimit = 10;

function updateUser(userId, subreddit, option, postNum) {
    db[userId] = { subreddit, option, postNum };
}

function sendRedditPost(messageId, subreddit, option, postNum) {
    const options = getOptions(option, rLimit);
    var start = new Date();
    request({ url: `http://www.reddit.com/r/${subreddit}/${options}`, json: true },
        function(error, response, body) {
            // check if response was successful
            if (!error && response.statusCode === 200) {
                // send error message if the bot encountered one
                if (body.hasOwnProperty("error") || body.data.children.length < 1) {
                    return sendErrorMsg(messageId);
                } else if (body.data.children.length - 1 < postNum) {
                    return noMorePosts(messageId);
                }

                // reddit post data
                let redditPost = body.data.children[postNum].data;
                redditPost.title = redditPost.title.replace(/&amp;/g, "&");

                // inline buttons
                const markup = bot.inlineKeyboard([
                    [
                        bot.inlineButton("🌐 Reddit", {
                            url: `https://www.reddit.com${redditPost.permalink}`,
                        }),
                        bot.inlineButton("➡️️ Next", { callback: "callback_query_next" }),
                    ],
                ]);

                // if post is an image or if it's a gif or a link
                if (
                    /\.(jpe?g|png)$/.test(redditPost.url) ||
                    redditPost.domain === "i.reddituploads.com" ||
                    redditPost.domain === "i.redd.it"
                ) {
                    // sendPlsWait(messageId);
                    return sendImagePost(messageId, redditPost, markup);
                } else if (
                    redditPost.preview &&
                    redditPost.preview.images[0].variants.mp4
                ) {
                    // sendPlsWait(messageId);
                    sendGifPost(messageId, redditPost, markup);
                } else {
                    return sendMessagePost(messageId, redditPost, markup);
                }

                // unsuccessful response
            } else {
                return sendErrorMsg(messageId);
            }
        }
    );
}

// options
function getOptions(option, rlimit) {
    if (option === "top") {
        return `top.json?t=day&limit=${rlimit}`;
    } else if (option === "topw") {
        return `top.json?t=week&limit=${rlimit}`;
    } else if (option === "topm") {
        return `top.json?t=month&limit=${rlimit}`;
    } else if (option === "topy") {
        return `top.json?t=year&limit=${rlimit}`;
    } else if (option === "all") {
        return `top.json?t=all&limit=${rlimit}`;
    } else if (option === "hot") {
        return `hot.json?&limit=${rlimit}`;
    } else if (option === "new") {
        return `new.json?&limit=${rlimit}`;
    } else {
        return `top.json?t=day&limit=${rlimit}`;
    }
}

function sendErrorMsg(messageId) {
    const errorMsg = `Couldn't find the subreddit. Use /help for instructions.`;
    return bot.sendMessage(messageId, errorMsg);
}

function sendLimitMsg(messageId) {
    const errorMsg = `Sorry, we can't show more than ${rLimit} posts for one option. Please change your subreddit or option. 
Use /help for instructions.`;
    return bot.sendMessage(messageId, errorMsg);
}

function noMorePosts(messageId) {
    const errorMsg = `No more posts. Use /help for instructions`;
    return bot.sendMessage(messageId, errorMsg);
}

/*function sendPlsWait(messageId) {
    const message = `Please wait...`;
    return bot.sendMessage(messageId, message);
}*/

function sendImagePost(messageId, redditPost, markup) {
    let url = redditPost.url;
    url = url.replace(/&amp;/g, "&");
    let caption = redditPost.title;
    return bot.sendPhoto(messageId, url, { caption, markup });
}

function sendGifPost(messageId, redditPost, markup) {
    let gifArr = redditPost.preview.images[0].variants.mp4.resolutions;
    let gif = gifArr[gifArr.length - 1].url;
    gif = gif.replace(/&amp;/g, "&");
    const caption = redditPost.title;
    return bot.sendVideo(messageId, gif, { caption, markup });
}

function sendMessagePost(messageId, redditPost, markup) {
    let url = redditPost.url;
    url = url.replace(/&amp;/g, "&");
    const message = `${redditPost.title}
${url}`;
    return bot.sendMessage(messageId, message, { markup });
}

bot.on("text", (msg) => {
    const parse = "Markdown";
    if (msg.text === "/start" || msg.text === "/help") {
        const message = `Enter a subreddit name with an option:
*top:* Top posts from past day
*topw:* Top posts from past week
*topm:* Top posts from past month
*topy:* Top posts from past year
*all:* Top posts of all time
*hot:* Hot posts right now 
*new:* Latest posts
For example if you want to get top posts of \`/r/cats\` enter:
*cats top*
Default option is *top*, so *cats* will return top posts of \`/r/cats\` from past day.`;
        return bot.sendMessage(msg.from.id, message, { parse });
    } else {
        const userId = `id_${msg.from.id}`;
        const messageId = msg.from.id;
        const [subreddit, option] = msg.text.toLowerCase().split(" ");
        const postNum = 0;
        updateUser(userId, subreddit, option, postNum);
        sendRedditPost(messageId, subreddit, option, postNum);
    }
});

bot.on("callbackQuery", (msg) => {
    if (msg.data === "callback_query_next") {
        const userId = `id_${msg.from.id}`;
        const messageId = msg.from.id;
        let subreddit = "",
            option = "";
        let postNum = 0;

        if (db[userId].hasOwnProperty("subreddit")) {
            subreddit = db[userId]["subreddit"];
        } else {
            return bot.sendMessage(
                messageId,
                "Sorry, you should send the subreddit again"
            );
        }

        if (db[userId]["option"]) {
            option = db[userId]["option"];
        } else {
            option = "top";
        }

        if (db[userId].hasOwnProperty("postNum")) {
            postNum = db[userId]["postNum"];
            postNum++;
        }

        db[userId]["postNum"] = postNum;

        if (postNum > rLimit - 1) {
            return sendLimitMsg(messageId);
        }
        sendRedditPost(messageId, subreddit, option, postNum);
    }
});

bot.connect();
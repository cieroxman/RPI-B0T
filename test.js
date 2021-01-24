const TelegramBot = require("node-telegram-bot-api");
const token = "1482047845:AAHUxw4Xt1SjwXdTv5hp4_0lMCArAkrHuOY";
const imgur = require("imgur-node-api");

const bot = new TelegramBot(token, { polling: true });
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
    console.log(msg);
    /*
              Visualizando el contenido mediante console.log(msg), se puede observar los parámetros de la imagen. 
              Habitualmente suele devolver un Array con 3 resultados. 
              Como recomendación, deja marcada por defecto la posición [2] del array, 
              principalmente por la calidad de la imagen.
              */

    var photo = msg.reply_to_message.photo[0].file_id;
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
            bot.sendMessage(chatId, "Enlace de la imagen subida a Imgur: \n" + link);
        });
    });
});
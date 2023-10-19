const { Emoji } = require('../models/index');
const emojiJson = require('../libs/upEmoji.json')

const createEmoji = async () => {
    try {
      const existingEmojis = await Emoji.findAll();
  
      if (existingEmojis.length > 0) {
       return 'Los emojis ya estan creados';
      } else {
        const newEmojis = await Promise.all(
          emojiJson.map((e) => Emoji.create(e))
        );
  
        if (newEmojis.length > 0) {
          return 'emojis creados'
          //res.status(200).send(newEmojis);
        } else {
          //res.status(404).send({ message: 'No se pudieron crear los emojis' });
          return 'No se pudieron crear los emojis'
        }
      }
    } catch (error) {
      console.log("Algo salió mal: ", error);
      //res.status(500).send({ message: 'Algo salió mal en el servidor' });
    }
  }
  
  module.exports = {
    createEmoji
  }
  
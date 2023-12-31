const { Emoji } = require('../models/index')

const addEmoji = async (req,res) => {
    try {
      const emoji = req.body
      const newEmoji = await Emoji.create(emoji)
      res.send(newEmoji);
    } catch (error) { console.log("Algo salio mal: ", error); 
  }
  }

  const getAllEmojis = async (req, res) => {
    try {
      const emoji = await Emoji.findAll()
      if (emoji) {
        res.send(JSON.stringify(emoji));
      } else {
        res.status(404).send({ mensaje: "Emojis no encontrados" });
      }
    } catch (error) { console.log("Algo salio mal: ", error); 
  
  }
  }

  const getEmojiById = async (req, res, next) => {
    try {
      const id = req.params.id
      const emoji = await Emoji.findByPk(id)
      emoji? res.status(200).send(emoji) : res.status(401).send({message:'No se pudo encontrar el emoji'})
    } catch (error) { console.log("Algo salio mal: ", error); 
      
  }
  }

  const putEmoji = async (req, res) => {
    try {
      const id = req.params.id
      const emoji = req.body
      const updateEmoji = await Emoji.update(emoji, {
        where: {
          id,
        },
      })
      updateEmoji[0] !== 0? res.status(200).send({message:'Emoji actualizado'}) : 
      res.status(401).send({message:'No se puede actualizar el emoji'});
    } catch (error) { console.log("Algo salio mal: ", error); 
      
  }
  }
  
  const deleteEmoji = async (req, res, next) => {
    try {
    const id = req.params.id
    const deleteEmoji = await Emoji.destroy({
      where: {
        id,
      },
    })
    deleteEmoji? res.status(200).send({message:'Emoji eliminado'}) :
    res.status(401).send({message:'No se pudo eliminar el emoji'}) 
    }
    catch (error) { console.log("Algo salio mal: ", error); 
  }
  }
  

  module.exports = {
    addEmoji,
    getAllEmojis,
    putEmoji,
    deleteEmoji,
    getEmojiById

}
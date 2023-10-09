const { Form } = require('../models/index');
const nodemailer = require('nodemailer');
const config = require('../utils/config')

//Envío de mail con datos de formulario de contacto
const conectionMail = async (req, res, info) => {
    try {
        //credenciales del mail por donde se envía el correo
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'cuyenreset@gmail.com',
                pass: config.mailPass
                }
            });
        //Armado del correo a envar
        const mailOptions = {
            from: `Contacto app-Cuyen`,
            to: "lorenadufaur@gmail.com",
            subject: 'Alguien te quiere contactar desde la aplicación',
            text: 'Tienes la siguiente consulta ' + JSON.stringify(info)
        }
        //envío correo 
        transporter.sendMail(mailOptions, (error) => {
            error? res.status(500).send(error.message): res.status(200).jsonp(req.body)
        })
        return true
        } catch (error) { console.log("Algo salio mal: ", error); 
            return false
    }
}

//Funcion que guarda en la BD la info
const sendMailContact = async (req, res) => {
  try {
    //recibe info por body
    const info = req.body

    //llamo a la funcion que envía el mail
    const mailSend = await conectionMail(req, res, info) 
    if (mailSend) {
        //Crea el dato en el formulario de contacto.
        const guardar = await Form.create(info)
        guardar?  res.status(200).send({message: 'Correo enviado y datos guardados'}):
        res.status(401).json({ message: 'No se pudo guardar la información' })
    } else {
        res.status(402).json({ message: 'No se pudo enviar el correo' })
    }

  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error
}
}

const getAllcontactos= async (req, res) => {
    try {
      const contactos = await Form.findAll()
      contactos.length > 0
      ? res.status(200).send(contactos)
      : res.status(400).send({ message: 'No se encontraron contactos' });
    } catch (error) { console.log("Algo salio mal: ", error); 
  }
  }

module.exports = {
    sendMailContact,
    getAllcontactos
}

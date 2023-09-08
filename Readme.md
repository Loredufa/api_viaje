Esta api maneja todo lo relativo a la pantalla de inicio donde se muestran promociones de la empresa


**iniciar la api: npm start


**Rutas :


GET: http://localhost:4001/viaje


POST: http://localhost:4001/nuevoviaje


        body: {  
          "hotel": "Las palmeras",
          "ubicHotel": "Av los Patos 1943",          
          "fotosHotel": "url",
          "videoHotel": "url",
          "estadia": "5 noches",
          "cronograma": "???",
          "menu": "Texto",
          "coordinador": "Pedro Sanchez",
          "contratos": "[num, num, num]"
        }


Para dar de alta un viaje:
          "inicioViaje": "Guarda la fecha de la activacion del viaje",


Para actualizar la ubucacion
          "ultimaUbic": "Guarda las coordenadas de la ultima ubcación",


Para dar de baja un biaje
          "finViaje": "Guarda la fecha que se finaliza el viaje",


Para actualizar el muro
          "muro": "[{imagen:url,idEmogi:contador}, {imagen:url,id},...]",


GET by id: http://localhost:4001/viaje/id


PUT http://localhost:4001/viaje/id


    body: { //info a modificar ej:
        "ultimaUbic": "2344.5566, 34453.666"
    }

    
DELETE http://localhost:4001/viaje/id


Variable de entorno para el archivo .env


PORT='4001'
DB_USER ='postgres'
DB_NAME = 'cuyen'
DB_PORT = '5432'
HOST = 'localhost'
DB_PASSWORD="xxxxx"
DB_HOST = 'localhost'

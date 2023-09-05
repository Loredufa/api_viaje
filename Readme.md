Esta api maneja todo lo relativo a la pantalla de inicio donde se muestran promociones de la empresa


**iniciar la api: npm start


**Rutas :


GET: http://localhost:4001/viaje


POST: http://localhost:4001/viaje


        body: {  
          "id": x,
          "Hotel": "Las palmeras",
          "ubicHotel": "Av los Patos 1943",          
          "fotosHotel": "url",
          "videoHotel": "url",
          "estadia": "5 noches",
          "cronograma": "???",
          "menu": "Texto",
          "coordinador": "Pedro Sanchez",
          "inicioViaje": "Guarda la fecha de la activacion del viaje",
          "ultimaUbic": "Guarda las coordenadas de la ultima ubcación",
          "finViaje": "Guarda la fecha que se finaliza el viaje",
          "muro": "[{imagen:url,idEmogi:contador}, {imagen:url,id},...]",
        }


GET by id: http://localhost:4001/viaje/id


PUT http://localhost:4001/viaje/id


    body: { //info a modificar ej:
        "ultimaUbic": "2344.5566, 34453.666"
    }

    
DELETE http://localhost:4001/viaje/id


Variable de entorno para el archivo .env


PORT='4001'
DB_USER ='postgres'
DB_NAME = 'postgres'
DB_PORT = '5433'
HOST = 'localhost'
DB_PASSWORD="xxxxx"
DB_HOST = 'localhost'

Esta api maneja todo lo relativo al viaje. 


**iniciar la api: npm start


**Rutas :


GET: http://localhost:4001/viaje  


POST: http://localhost:4001/viaje 


        body: {  
          "id": 4,
          "Hotel": "Canchita",
          "ubicHotel": "Av. independencia 34, Tandil",          
          "fotosHotel": "url",
          "videoHotel": "url",
          "estadia": "5 noches",
          "cronograma": ???,
          "menu": "Medio día: bufette, noche a la carta",
          "coordinador": "Sergio Donovan",
          "inicioViaje": "al activar el viaje debe guardar la fecha",
          "ultimaUbic": "aca van las coordenadas",
          "finViaje": "al finalizar el viaje debe guardar fecha ",
          "muro": "[{imagen1: url, id_emogi: contador}, {imagen1: url, id_emogi: contador}, ...] "
        }


GET by id: http://localhost:4001/viaje/id


PUT http://localhost:4001/viaje/id


    body: { //info a modificar ej:
        "ultimaUbic": "aca van las coordenadas"
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

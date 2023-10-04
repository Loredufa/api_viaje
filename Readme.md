Esta api maneja todo lo relativo a al viaje, su muro, los hoteles y el itinerario.

***Se agrega token en los Headers***


**iniciar la api: npm start


**Rutas :
**Viaje**

GET: http://localhost:4001/viaje


POST: http://localhost:4001/nuevoviaje   **Ver consideraciones **


        body: {  
          "destino": "Tandil",
          "contratos": "[num, num, num]",
          "hotelId": "x",
          "scheduleId": "x",
          "salida": "x",
          "regreso": "x",
        }
        
**Consideraciones: La funcion no valida que los numeros de contrato sean correctos, para ello sugiero colocar un select para completar el campo "contratos", genere una ruta que trae todos los contratos ordenados de manera descendente**

GET: http://localhost:4001/select

[{
    "num": "9999",
    "colegio": "San Jose"
  },
  {
    "num": "7777",
    "colegio": "San Benito"
  },
  {
    "num": "4444",
    "colegio": "Nacional N 6"
  }]


Para consultar un viaje según el numero de contrato
GET: http://localhost:4001/nuevoviaje/:num_contract


Para dar de alta un viaje:
PUT: http://localhost:4001/viaje/:id
      body{
          "inicioViaje": "fecha de la activacion del viaje"}


Para actualizar la ubicacion
PUT: http://localhost:4001/viaje/:id
      body{
          "ultimaUbic": "coordenadas de la ultima ubcación"}


Para dar de finalizar un viaje
PUT: http://localhost:4001/viaje/:id
      body{
          "finViaje": "fecha en la que se finaliza el viaje"}


GET by id: http://localhost:4001/viaje/:id


PUT http://localhost:4001/viaje/id

    body: { //info a modificar ej:
        "destino": "Valle de la luna"
    }

DELETE http://localhost:4001/viaje/id

***Muro***

Para obtener la información del muro
GET: http://localhost:4001/muro/num_contract

Ordena el resultado de manera descendente


Para subir una imagen al muro
POST: http://localhost:4001/:num
  body:
      {
        "image" : "url",
        "texto" : "nckjzhcvsdhflsdj",
      }
    

Para agregar emojis a la imagen con id de la publicacion
PUT: http://localhost:4001/reaccion/id
      body: {
              "emoji" : "carita_feliz"  //colocar en el valor de la propiedad emoji el dato que identifica el emoji
            }


***Cronograma***
Para dar de alta un día en el cronograma
POST : http://localhost:4001/itinerario
  body{
  "nombre":"Tandil, 3 dias 2 noches",
  "texto_gral": "fzngñkjdfngkjdfngkñjfnkjfadn"
}

Obtener todos los cronogramas
GET : http://localhost:4001/itinerario

Obtener cronograma por id
GET : http://localhost:4001/itinerario/:id

Obtener cronograma por contrato
GET : http://localhost:4001/itinerario/:num_contrato

Modificar cronograma
PUT : http://localhost:4001/itinerario/id

Eliminar el cronograma
DELETE : http://localhost:4001/itinerario


**Hotel**

Para dar de obtener todos los hoteles
GET: http://localhost:4001/hoteles

Para dar de alta un Hotel
POST: http://localhost:4001/hoteles
body : {
        "nombre": "Los pepinos",
        "direccion": "Av. los patos 6543",
        "fotos":"url",
        "video": "url"
      }

Para obtener los hoteles por id hotel
GET: http://localhost:4001/hoteles/:id

Para Modificar la info de un hotel
PUT: http://localhost:4001/hoteles/:id

Para eliminar un hotel
DELETE: http://localhost:4001/hoteles/:id

**Contratos**
Esta tabla no se modifican dentro de la api pero son necesarias para completar el flujo de datos

Para dar de alta un contrato
POST: http://localhost:4001/hoteles
body 
  {
  "num":"1919",
  "fecha":"14/06/23",
  "curso":"7mo",
  "division":"B",
  "turno":"Mañana",
  "colegio":"San Jose",
  "pasajeros":"28",
  "mes":"noviembre",
  "año":"2024",
  "periodo":"3",
  "destino":"Tandil",
  "impTot":"700mil",
  "canc":"si"
}

Para obtener todos los contratos
GET: http://localhost:4001/hoteles

Para el select de contratos
GET: http://localhost:4001/select

Retorna: [
  {
    "num": "9999",
    "colegio": "San Jose"
  },
  {
    "num": "7777",
    "colegio": "San Jose"
  },
  {
    "num": "4444",
    "colegio": "San Jose"
  }]


PORT='4001'
DB_USER ='postgres'
DB_NAME = 'cuyen'
DB_PORT = '5432'
HOST = 'localhost'
DB_PASSWORD="xxxxx"
DB_HOST = 'localhost'

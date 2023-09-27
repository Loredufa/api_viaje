Esta api maneja todo lo relativo a la pantalla de inicio donde se muestran promociones de la empresa


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
          "scheduleId": "x"
        }
        
**Consideraciones: La funcion no valida que los numeros de contrato sean correctos, para ello sugiero colocar un select para completar el campo "contratos", genere una ruta que trae todos los contratos ordenados de manera descendente**

GET: http://localhost:4001/select

[num, num, num, num, num, num, num, num]


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


Para dar de baja un viaje
PUT: http://localhost:4001/viaje/:
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
    "fecha" : "nnn",
    "excursion" : "xxxx",
    "actividades" : "[xxx,xxx,xxx]",
    "consideraciones" : "mnckdhfs"

  }

Obtener todas las fechas de cronograma
GET : http://localhost:4001/itinerario

Obtener cronograma por id
GET : http://localhost:4001/itinerario/:id

Obtener cronograma por contrato
GET : http://localhost:4001/itinerario/:num_contrato

Modificar cronograma
PUT : http://localhost:4001/itinerario/id

Eliminar el cronograma
DELETE : http://localhost:4001/itinerario




PORT='4001'
DB_USER ='postgres'
DB_NAME = 'cuyen'
DB_PORT = '5432'
HOST = 'localhost'
DB_PASSWORD="xxxxx"
DB_HOST = 'localhost'

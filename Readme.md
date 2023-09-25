Esta api maneja todo lo relativo a la pantalla de inicio donde se muestran promociones de la empresa


***Se agrega token en los Headers***


**iniciar la api: npm start


**Rutas :


GET: http://localhost:4001/viaje


POST: http://localhost:4001/nuevoviaje   **Ver consideraciones **


        body: {  
          "destino": "Tandil",
          "hotel": "Las palmeras",
          "ubicHotel": "Av los Patos 1943",          
          "fotosHotel": "url",
          "videoHotel": "url",
          "ingreso": "15/08/23",
          "salida": "22/08/23",
          "pension": "completa",
          "cronograma": "???",
          "menu": "Texto",
          "contratos": "[num, num, num]"
        }
**Consideraciones: La funcion no valida que los numeros de contrato sean correctos, para ello sugiero colocar un select para completar el campo "contratos", genere una ruta que trae todos los contratos ordenados de manera descendente**

GET: http://localhost:4001/contratos/select

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
        "ultimaUbic": "2344.5566, 34453.666"
    }

DELETE http://localhost:4001/viaje/id

***Muro***

Para obtener la información del muro
GET: http://localhost:4001/muro/num_contract


Para subir una imagen al muro
POST: http://localhost:4001/:num
  body:
      {
        "image" : "url",
        "texto" : "nckjzhcvsdhflsdj",
      }
    

Para modificar el contador de la imagen
PUT: http://localhost:4001/muro/:id
      body: {
              "emoji" : "{carita_feliz: 3, carita_triste : 1}"  
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


***Actividades***
Para dar de alta una actividad
POST : http://localhost:4001/actividad
  body{
    "nombre" : "nnn", **obligatorio**
    "descripcion" : "xxxx"
  }

Obtener todas las actividades
GET : http://localhost:4001/actividad

Obtener actividad por id
GET : http://localhost:4001/actividad/:id

Modificar actividad
PUT : http://localhost:4001/actividad/id

Eliminar el actividad
DELETE : http://localhost:4001/actividad


***Excursiones***
Para dar de alta una excursion
POST : http://localhost:4001/excursion
  body{
    "nombre" : "nnn", **obligatorio**
    "descripcion" : "xxxx"
  }

Obtener todas las excursiones
GET : http://localhost:4001/excursion

Obtener excursion por id
GET : http://localhost:4001/excursion/:id

Modificar excursion
PUT : http://localhost:4001/actividad/id

Eliminar el actividad
DELETE : http://localhost:4001/excursion


Variable de entorno para el archivo .env


PORT='4001'
DB_USER ='postgres'
DB_NAME = 'cuyen'
DB_PORT = '5432'
HOST = 'localhost'
DB_PASSWORD="xxxxx"
DB_HOST = 'localhost'

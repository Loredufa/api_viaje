Esta api maneja todo lo relativo a la pantalla de inicio donde se muestran promociones de la empresa


**iniciar la api: npm start


**Rutas :


GET: http://localhost:4000/inicio


POST: http://localhost:4000/inicio 


        body: {  
          "id": x,
          "imagen": "url",
          "textoImagen": "Text",          
          "video": "url",
          "textoVideo": "text"
        }


GET by id: http://localhost:4000/inicio/id


PUT http://localhost:4000/inicio/id


    body: { //info a modificar ej:
        "video": "url"
    }

    
DELETE http://localhost:4000/inicio/id


Variable de entorno para el archivo .env


PORT='4000'
DB_USER ='postgres'
DB_NAME = 'postgres'
DB_PORT = '5433'
HOST = 'localhost'
DB_PASSWORD="xxxxx"
DB_HOST = 'localhost'

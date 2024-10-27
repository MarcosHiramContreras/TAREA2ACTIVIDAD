# Actividad

## introducción Express

Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares. Proporciona mecanismos para:

1. Escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas).
2. Integración con motores de renderización de "vistas" para generar respuestas mediante la introducción de datos en plantillas.
3. Establecer ajustes de aplicaciones web como qué puerto usar para conectar, y la localización de las plantillas que se utilizan para renderizar la respuesta.
4. Añadir procesamiento de peticiones "middleware" adicional en cualquier punto dentro de la tubería de manejo de la petición.

Lo descarga así:

```sh
npm i express
```

## Servidor básico con express.

El archivo prueba_server.js tiene el código de un servidor básico en express, ejecútelo así:

```js
node run prueba_server.js
```

contiene el código:

Archivo: prueba_sever.js
```js
//cargamos el paquete express
import express from "express"
//cargar el numero de puerto
const PORT= 3001 
//crea un objeto express en la constante app
const app=express() 
//ahora con app.get('/',(req,res)=>{}) indicamos a app que al recibir la ruta "/" del servidor:
//(es decir barra despues del url del servidor:http://localhost:3001/)
//ejecutará el contenido de la función (req,res)=>{}
app.get("/",(req,res)=>{
    //idica que la respuesta esta en formato html
    res.set({"content-type":"text/html; charset=utf-8"})
    //envia como respuesta este código html
    res.send(`
        <pre>Ejemplo de servidor básico con express</pre>
    `)
})

//arranca el servidor en:http://localhost:3001/
app.listen(PORT,()=>{
    console.log(`Servidor iniciado en: http://localhost:${PORT}/`)
})
```
Como probarlo?

Ejecute el servidor:

```sh
node prueba_server.js
```

Una vez arrancado el servidor, abra su navegador y ponga la ruta:

`http://localhost:3001/`

Vera la respuesta de la función `app.get("/",(req,res)=>{...}` que se muestra antes, esta función atiende a una solicitud con el verbo get, y funciona directamente desde el navegador por que el navegador al hacer una solicitud, usa por default el verbo get, para usar otro tipo de solicitudes como post, put, delete, patch, deberá hacerlo desel la sentencia fetch o un formulario. Puede ver un ejemplo de esto en el archivo: `prueba_enviar_json.js`


aparte de la funcion:
 `app.get("/",(req,res)=>{...}` que atiende a la ruta: `http://localhost:3001/`

 podemos atender otras solicitudes con diferentes rutas, por ejemplo podemos poner:

 `app.get("/users",(req,res)=>{...}` que atiende a la ruta: `http://localhost:3001/users`
 
 `app.get("/products",(req,res)=>{...}` que atiende a la ruta: `http://localhost:3001/products`

 Pruebelo.

## código del proyecto

Para este código, tenemos que:

El archivo `model.personas.js` contiene el código para realizar el CRUD de una tabla personas.

El archivo `prueba_url_encode`, tiene un ejemplo del llamado y recepcion de datos con url encode.

El archivo `prueba_enviar_json`, tiene un ejemplo del llamado y recepcion de datos con json.

El archivo `index.js` ejecuta un servidor que puede ser probado con las rutas:

http://localhost:3000/getAll

http://localhost:3000/insert

Pruebe estas rutas usando el complemnto `Thunder Client`, apoyese en su profesor.

El archivo  `prueba_devolver_datos.js` tiene 2 ejemplos pára devolver datos al front end:

 devuelve un html o un json, con sus respectivos:

`res.set({"content-type":"text/html; charset=utf-8"})`


o

`res.set({"content-type":"application/json"})`


// TAREAAAAAAAAAAAAAAAAAAAA
Actividad:

Para una de las tablas de su proyecto, haga:

1. cree una base de datos en sqlite con al menos una de las tablas de su proyecto (use como base el archivo: 'creaTabla.js' o la aplicación `sqlitestudio` o la aplicación `sqliteadmin`)
2. cree una aplicación para ejecutar las opciones de: alta/buscar/eliminar/actualizar, basandose en los ejemplos anteriores y usando como plantilla los archivos: 
    * . index.js 
    * . model.personas.js 
3. Pruebe, 
4. cargue la aplicación en su GitHub y entregue al profesor la liga de acceso al GitHub.
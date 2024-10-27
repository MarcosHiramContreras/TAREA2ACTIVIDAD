// TAREA 2 MARCOS HIRAM CONTRERAS MENDOZA
// 174155
// 26/10/2024

import express from "express";
import dotenv from "dotenv";
import { getAllProducts, getProductById, createProduct, updateProduct, partialUpdateProduct, deleteProduct } from "./model.products.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const mydb = process.env.SQLITE_DB || 'app.sqlite3';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

// Middleware para soportar métodos HTTP alternativos (PUT, PATCH, DELETE)
app.use((req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
});

app.get("/", (req, res) => {
    res.send(`

        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Inventarios</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4; /* Color de fondo suave */
            color: #333; /* Color del texto */
            margin: 0;
            padding: 20px;
        }
        
        h1 {
            color: #4CAF50; /* Verde para el título principal */
            text-align: center;
            margin-bottom: 20px;
        }

        h3 {
            color: #333;
            margin-top: 20px;
        }

        h4 {
            color: #4CAF50; /* Verde para los subtítulos */
            margin-top: 15px;
        }

        form {
            background: #fff; /* Fondo blanco para formularios */
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        input[type="text"], input[type="number"] {
            width: calc(100% - 20px); /* Ajustar el ancho del campo */
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc; /* Borde ligero */
            border-radius: 5px;
            box-sizing: border-box; /* Incluir padding y borde en el ancho total */
        }

        button {
            background-color: #4CAF50; /* Color verde para botones */
            color: white; /* Texto blanco */
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%; /* Botones a ancho completo */
        }

        button:hover {
            background-color: #45a049; /* Efecto al pasar el mouse */
        }

        ul {
            list-style-type: none; /* Sin viñetas */
            padding: 0;
        }

        a {
            color: #4CAF50; /* Color del enlace */
            text-decoration: none; /* Sin subrayado */
        }

        a:hover {
            text-decoration: underline; /* Subrayar al pasar el mouse */
        }
    </style>
</head>
<body>

    <h1>---------- Bienvenido al Sistema de Inventarios de la Tienda ----------</h1>
    <h3>Para Visualizar Todos los Productos haga Click en la Liga:</h3>
    <ul>
        <li><a href="/getAll">GET: /getAll</a></li>
    </ul>
    <h3>Operaciones de Productos:</h3>
    
    <!-- Formulario para buscar un producto por ID -->
    <h4>Buscar Producto por ID</h4>
    <form id="search-form" action="/get/" method="GET" onsubmit="event.preventDefault(); fetchProductByIdFromForm()">
        <input type="number" name="id" placeholder="ID del producto" required />
        <button type="submit">Buscar Producto</button>
    </form>
    <div id="product-result"></div>

    <!-- Formulario para insertar un nuevo producto -->
    <h4>POST: Insertar Producto</h4>
    <form action="/insert" method="POST">
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="text" name="descripcion" placeholder="Descripción" />
        <input type="number" step="0.01" name="precio" placeholder="Precio" required />
        <input type="number" name="cantidad" placeholder="Cantidad" required />
        <button type="submit">Insertar Producto</button>
    </form>
    
 <!-- Formulario para actualizar completamente un producto -->
<h4>PUT: Actualizar Producto</h4>
<form id="update-form" action="/update/1" method="POST" onsubmit="this._method.value='PUT';">
    <input type="hidden" name="_method" value="PUT" />
    <input type="number" name="id" placeholder="ID del producto" required />
    <input type="text" name="nombre" placeholder="Nombre" required />
    <input type="text" name="descripcion" placeholder="Descripción" />
    <input type="number" step="0.01" name="precio" placeholder="Precio" required />
    <input type="number" name="cantidad" placeholder="Cantidad" required />
    <button type="button" onclick="fetchProductForUpdate()">Buscar Producto</button> <!-- Función para buscar el producto -->
    <button type="submit">Actualizar Producto</button>
</form>
    
    <!-- Formulario para actualizar parcialmente un producto -->
    <h4>PATCH: Actualizar Parcialmente Producto</h4>
    <form action="/update/1" method="POST" onsubmit="this._method.value='PATCH';">
        <input type="hidden" name="_method" value="PATCH" />
        <input type="number" name="id" placeholder="ID del producto" required />
        <input type="text" name="nombre" placeholder="Nuevo Nombre" />
        <input type="number" step="0.01" name="precio" placeholder="Nuevo Precio" />
        <button type="submit">Actualizar Parcialmente</button>
    </form>
    
    <!-- Formulario para eliminar un producto por ID -->
    <h4>DELETE: Eliminar Producto por ID</h4>
    <form action="/delete/" method="POST" onsubmit="event.preventDefault(); deleteProductById(this)">
        <input type="hidden" name="_method" value="DELETE" />
        <input type="number" name="id" placeholder="ID del producto" required />
        <button type="submit">Eliminar Producto</button>
    </form>

</body>

        <script>
            // Función para buscar producto por ID usando fetch
            // Función para buscar producto por ID usando fetch
function fetchProductByIdFromForm() {
    const id = document.querySelector('#search-form input[name="id"]').value; // Obtener el ID del formulario de búsqueda

    if (!id) { // Comprobar si el ID está vacío
        alert('Por favor ingrese un ID para buscar');
        return;
    }

    fetch('/get/' + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }
            return response.json();
        })
        .then(data => {
            // Llenar el formulario de actualización con los datos del producto
            const updateForm = document.getElementById('update-form');
            updateForm.id.value = data.id; // Establecer el ID en el formulario de actualización
            updateForm.nombre.value = data.nombre;
            updateForm.descripcion.value = data.descripcion;
            updateForm.precio.value = data.precio;
            updateForm.cantidad.value = data.cantidad;
            updateForm.action = "/update/" + data.id; // Actualizar la acción del formulario con el ID del producto
            
            // Habilitar el botón de actualizar producto
            updateForm.querySelector('button[type="submit"]').disabled = false; 
            document.getElementById('product-result').innerHTML = 'Producto encontrado: ' + JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById('product-result').innerHTML = 'Error: ' + error.message;
            // Deshabilitar el botón de actualizar producto si no se encuentra
            document.getElementById('update-form').querySelector('button[type="submit"]').disabled = true; 
        });
}

function fetchProductForUpdate() {
    const id = document.querySelector('#update-form input[name="id"]').value; // Obtener el ID del formulario de actualización

    if (!id) { // Comprobar si el ID está vacío
        alert('Por favor ingrese un ID para buscar');
        return;
    }

    fetch('/get/' + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }
            return response.json();
        })
        .then(data => {
            // Llenar el formulario de actualización con los datos del producto
            const updateForm = document.getElementById('update-form');
            updateForm.nombre.value = data.nombre; // Establecer el nombre en el formulario
            updateForm.descripcion.value = data.descripcion; // Establecer la descripción
            updateForm.precio.value = data.precio; // Establecer el precio
            updateForm.cantidad.value = data.cantidad; // Establecer la cantidad
            updateForm.action = "/update/" + data.id; // Actualizar la acción del formulario con el ID del producto

            // Habilitar el botón de actualizar producto
            updateForm.querySelector('button[type="submit"]').disabled = false; 
        })
        .catch(error => {
            alert('Error: ' + error.message);
            // Deshabilitar el botón de actualizar producto si no se encuentra
            document.getElementById('update-form').querySelector('button[type="submit"]').disabled = true; 
        });
}

            // Función para eliminar producto por ID usando fetch
            function deleteProductById(form) {
                const id = form.id.value;
                fetch('/delete/' + id, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    alert(JSON.stringify(data));
                })
                .catch(error => {
                    alert('Error: ' + error.message);
                });
            }
        </script>
    `);
});

// Otros endpoints de la API
app.get('/getAll', (req, res) => {
    const products = getAllProducts(mydb);
    res.json(products);
});

app.get('/get/:id', (req, res) => {
    const product = getProductById(mydb, req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

app.post('/insert', (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body;
    const response = createProduct(mydb, { nombre, descripcion, precio, cantidad });
    res.json(response);
});

app.put('/update/:id', (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body;
    const response = updateProduct(mydb, req.params.id, { nombre, descripcion, precio, cantidad });

    if (response.changes === 0) {
        return res.status(404).json({ message: "Producto no encontrado o no actualizado." });
    }

    res.json({ message: "Producto actualizado correctamente", changes: response.changes });
});

app.patch('/update/:id', (req, res) => {
    const updates = req.body;
    const response = partialUpdateProduct(mydb, req.params.id, updates);
    res.json(response);
});

app.delete('/delete/:id', (req, res) => {
    const response = deleteProduct(mydb, req.params.id);
    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en: http://localhost:${PORT}/`);
});
import express from "express"
const app = express();
const PORT = 3001;

// Configurar el middleware para analizar datos de formularios
app.use(express.urlencoded({ extended: true })); // Funciona para que Analize los datos y procesa en formato URL encode.

// Ruta para mostrar un formulario HTML simple
app.get('/', (req, res) => {  // RUTA RAIZ para el servidor // Cuando con GET mandamos la ruta Raiz manda un HTML en este caso un formulario.
    // EL FORMULARIO TIENE UN SOLO CAMPO que es el NOMBRE.
    res.send(`
        <form action="/submit" method="POST">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name">
            <button type="submit">Enviar</button>
        </form>
    `);
}); // CUANDO SE DA AL SUBMIT se van los datos al SUBMIT.

// Ruta para manejar el envío del formulario
app.post('/submit', (req, res) => {  // RUTA SUMBIT para el servidor
    const { name } = req.body;
    res.send(`Nombre recibido: ${name}`); // AQUI SE MANDA LA RESPUESTA AL DAR EN SUBMIT Correctamente.
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

import express from 'express'
const app = express();
const PORT = 3001;

// Configurar el middleware para analizar JSON // LOS FORMULARIOS EN SI SOLOS NO PUEDEN ENVIAR JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <form id="jsonForm">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name">
            <button type="submit">Enviar</button>
        </form>
        <script>
            document.getElementById('jsonForm').addEventListener('submit', function(event) {
                event.preventDefault();
                //const name = document.getElementById('name').value;
                const form = document.getElementById('jsonForm');
                const formData = new FormData(form);
                const jsonData = JSON.stringify(Object.fromEntries(formData));
                fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonData
                })
                .then(response => response.text())
                .then(data => alert(data))
                .catch(error => console.error('Error:', error));
            });
        </script>
    `);
});

app.post('/submit', (req, res) => {
    const { name } = req.body;
    res.send(`Nombre recibido: ${name}`);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

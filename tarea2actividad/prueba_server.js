import express from "express"

const PORT= 3001 //cargar el numero de puerto
const app=express()

app.get("/",(req,res)=>{
    res.set({"content-type":"text/html; charset=utf-8"})
    res.send(`
        <pre>Ejemplo de servidor básico con express</pre>
    `)
})

app.listen(PORT,()=>{
    console.log(`Servidor iniciado en: http://localhost:${PORT}/`)
})
import express from "express"

const PORT=4000
const app=express()

app.get("/",(req,res)=>{
    res.set({"content-type":"text/html; charset=utf-8"})
    res.end(
        `
        <h1>Servidor básico</h1>
        <div>
        <ul>
            <li><a href="http://localhost:4000/geth">obtener html</a></li>
            <li><a href="/geth">obtener html</a></li>
            <li><a href="http://localhost:4000/getj">obtener json</a></li>
            <li><a href="/getj">obtener json</a></li>
        </ul>
        </div>
        `
    )
})
//
app.get('/geth',(req,res)=>{
    res.set({"content-type":"text/html; charset=utf-8"})
    res.send(
        `
        <h1>devolviendo html</h1>
        <ul>
            <li>opcion 1</li>
            <li>opcion 2</li>
            <li>opcion 3</li>
            <li>opcion 4</li>
        </ul>
        `
    )
})
app.get('/getj',(req,res)=>{
    res.set({"content-type":"application/json"})
    res.send([
        {"id":2, name:"Ana"},
        {"id":3, name:"paco"},
        {"id":4, name:"luis"},
        {"id":5, name:"beto"},
    ])
})

app.listen(PORT,()=>{
    console.log(`iniciando express desde: http://localhost:${PORT}/`)
})

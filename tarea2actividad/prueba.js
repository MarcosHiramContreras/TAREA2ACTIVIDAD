import { getAll,create } from "./model.personas.js";
import dotenv from 'dotenv'
dotenv.config()

const mydb=process.env.SQLITE_DB || 'app.sqlite3'

const resp=create(mydb,{first_name:'beatriz',last_name:'rojas lopez',sexo:'f',edad:25})
console.log(resp)
////
const resp2=getAll(mydb)
console.log(resp2)



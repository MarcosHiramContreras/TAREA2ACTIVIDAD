import Database from "better-sqlite3";
const db = new Database('app.db')

const query=`CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    name STRING NOT NULL,
    username STRING NOT NULL UNIQUE
)    
`
db.exec(query)
db.close()
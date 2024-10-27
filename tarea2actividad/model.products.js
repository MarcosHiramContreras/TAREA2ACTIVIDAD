import Database from "better-sqlite3";
import sqlite3 from 'sqlite3';

// Obtener todos los productos
export function getAllProducts(dbName) {
    const db = new Database(dbName);
    const stmt = db.prepare("SELECT * FROM productos");
    const products = stmt.all();
    db.close();
    return products;
}

// Obtener un producto por ID
export function getProductById(dbName, id) {
    const db = new Database(dbName);
    const stmt = db.prepare("SELECT * FROM productos WHERE id = ?");
    const product = stmt.get(id);
    db.close();
    return product;
}

// Crear un nuevo producto
export function createProduct(dbName, { nombre, descripcion, precio, cantidad }) {
    const db = new Database(dbName);
    const stmt = db.prepare("INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)");
    const info = stmt.run(nombre, descripcion, precio, cantidad);
    db.close();
    return { message: "Producto insertado correctamente", id: info.lastInsertRowid };
}

// Modificar completamente un producto
export function updateProduct(dbName, id, { nombre, descripcion, precio, cantidad }) {
    const db = new Database(dbName);
    const stmt = db.prepare("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id = ?");
    const info = stmt.run(nombre, descripcion, precio, cantidad, id);
    db.close();
    return { message: "Producto actualizado correctamente", changes: info.changes };
}

// Modificar parcialmente un producto
export function partialUpdateProduct(dbName, id, updates) {
    const db = new Database(dbName);
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(", ");
    const values = [...Object.values(updates), id];
    const stmt = db.prepare(`UPDATE productos SET ${fields} WHERE id = ?`);
    const info = stmt.run(...values);
    db.close();
    return { message: "Producto parcialmente actualizado", changes: info.changes };
}

// Eliminar un producto
export function deleteProduct(dbName, id) {
    const db = new Database(dbName);
    const stmt = db.prepare("DELETE FROM productos WHERE id = ?");
    const info = stmt.run(id);
    db.close();
    return { message: "Producto eliminado", changes: info.changes };
}

// ACTUALIZAR PRODUCTO
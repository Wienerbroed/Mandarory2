import sqlite3 from 'sqlite3';

import { open } from 'sqlite';

//database name and driver 
const db = await open ({
    filename: './database.db',
    driver: sqlite3.Database
});

// database attributes 
await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT   
    )
`);


//Make and insert test user
const testEmail = 'test@email.com'
const testPassword = 'Password123!'


await db.run(
    `INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)`,
    [testEmail, testPassword]
);


export { db };
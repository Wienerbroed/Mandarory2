// Imports for database
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Imports for testing (removed later)
import bcrypt, { hash } from 'bcrypt';

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
    password TEXT,
    refreshToken TEXT   
    )
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    text TEXT,
    image TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
    );
`);


//Make and insert test user (removed later)
const testEmail = 'test@email.com'
const password = 'Password123!'

// Hash password 
const testPassword = await bcrypt.hash(password, 13);



await db.run(
    `INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)`,
    [testEmail, testPassword]
);


export { db };
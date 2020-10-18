const Database = require('sqlite-async');

function execute(db){
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            about TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            images TEXT NOT NULL,
            instructions TEXT NOT NULL,
            opening_hours TEXT NOT NULL,
            open_on_weekend TEXT NOT NULL,
            lat TEXT NOT NULL,
            lng TEXT NOT NULL
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute); // retorna db
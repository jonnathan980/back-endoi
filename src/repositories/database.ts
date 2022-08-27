import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

const SQL_ITENS_CREATE = `
	CREATE TABLE itens (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		descricao TEXT
	)`;

const SQL_BARES_CREATE = `
	CREATE TABLE bares (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		descricao TEXT,
		endereco TEXT,
		imagemUrl TEXT
	)`;
	
	const SQL_USUARIOS_CREATE =`
	 CREATE TABLE usuarios (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		sobrenome TEXT,
		email TEXT,
		senha TEXT
		
	)`;
	const SQL_Cardabios_CREATE =`
	 CREATE TABLE Cardabios (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		descricao TEXT,
		preco TEXT,
		url TEXT
		
	)`;

const database = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		console.log('Base de dados conectada com sucesso.')
		database.run(SQL_ITENS_CREATE, (err) => {
			if (err) {
				// Possivelmente a tabela já foi criada
			} else {
				console.log('Tabela itens criada com sucesso.')
			}
		})
		database.run(SQL_BARES_CREATE, (err) => {
			if (err) {
				// Possivelmente a tabela já foi criada
			} else {
				console.log('Tabela bares criada com sucesso.')
			}
		})
		database.run(SQL_USUARIOS_CREATE, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log('Tabela usuarios criada com sucesso.')
			}
		})
		database.run(SQL_Cardabios_CREATE, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log('Tabela Cardabios criada com sucesso.')
			}
		})
	}
})

export default database
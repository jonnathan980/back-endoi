import usuario from "../models/usuario"
import database from "./database"

const UsuarioRepository = {
	criar: (item: usuario, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO usuarios (nome,sobrenome,email,senha) VALUES (?,?,?,?)'
		const params = [item.nome,item.sobrenome,item.email,item.senha]
		database.run(sql, params, function(err) {
			console.error(err)
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (item: usuario[]) => void) => {
		const sql = 'SELECT * FROM usuarios'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (item?: usuario) => void) => {
		const sql = 'SELECT * FROM usuarios WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},
	login: (email:string,senha:string, callback: (item?: usuario) => void) => {
		const sql = 'SELECT * FROM usuarios WHERE email = ? and senha = ?'
		const params = [email , senha]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, item: usuario, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE usuarios SET nome = ?, sobrenome = ?,senha = ?,email = ? WHERE id = ?'
		const params = [item.nome,item.sobrenome,item.senha,item.email, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM usuarios WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default UsuarioRepository
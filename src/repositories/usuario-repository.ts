import usuario from "../models/usuario"
import database from "./database"

const UsuarioRepository = {
	criar: (item: usuario, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO usuario (id,nome,Sobrenome,Emaill,Senha,) VALUES (?,?,?,?,?)'
		const params = [item.id,item.nome,item.Sobrenome,item.Senha,item.Emaill]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (item: usuario[]) => void) => {
		const sql = 'SELECT * FROM usuario'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (item?: usuario) => void) => {
		const sql = 'SELECT * FROM usuario WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, item: usuario, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE usuario SET nome = ?, descricao = ?,endereco = ?,imagemUrl = ?, WHERE id = ?'
		const params = [item.nome,item.Sobrenome,item.Senha,item.Emaill, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM usuario WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default UsuarioRepository
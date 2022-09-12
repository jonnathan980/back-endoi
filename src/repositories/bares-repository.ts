import Bares from "../models/bares"
import database from "./database"

const BaresRepository = {
	criar: (item: Bares, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO Bares (id,nome,descricao,endereco,imagemUrl) VALUES (?,?,?,?,?)'
		const params = [item.id,item.descricao,item.nome,item.endereco,item.imagemUrl]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (item: Bares[]) => void) => {
		const sql = 'SELECT * FROM Bares'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (item?: Bares) => void) => {
		const sql = 'SELECT * FROM Bares WHERE id = ?'
		console.log(`SELECT * FROM Bares WHERE id = ${id}`)
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, item: Bares, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE Bares SET nome = ?, descricao = ?,endereco = ?,imagemUrl = ?, WHERE id = ?'
		const params = [item.nome, item.descricao, item.endereco,item.imagemUrl, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM Bares WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default BaresRepository
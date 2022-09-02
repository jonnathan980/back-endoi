import Cardabios from "../models/cardabio"
import database from "./database"

const CardabioRepository = {
	criar: (item: Cardabios, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO Cardabios,(id,title,nome,descricao,preco,url) VALUES (?,?,?,?,?,?)'
		const params = [item.id,item.title,item.nome,item.descricao,item.preco,item.url]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},


	lerTodos: (callback: (item: Cardabios[]) => void) => {
		const sql = 'SELECT * FROM Cardabios'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (item?: Cardabios) => void) => {
		const sql = 'SELECT * FROM Cardabios WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, item: Cardabios, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE Cardabios SET title = ?, nome = ?, descricao = ?,preco = ?,url = ?, WHERE id = ?'
		const params = [item.title,item.nome,item.descricao,item.preco,item.url,id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM Cardabios WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default CardabioRepository
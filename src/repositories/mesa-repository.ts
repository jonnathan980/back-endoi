
import Mesa from '../models/mesa'
import database from './database'

const MesaRepository = {
	criar: (item: Mesa, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO Mesa (id,nome) VALUES (?, ?)'
		const params = [item.id ,item.nome]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (itens: Mesa[]) => void) => {
		const sql = 'SELECT * FROM Mesa'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (item?: Mesa) => void) => {
		const sql = 'SELECT * FROM Mesa WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, item: Mesa, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE Mesa SET nome = ?,  WHERE id = ?'
		const params = [item.nome, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM Mesa WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default MesaRepository
import Cardapio from "../models/Cardapio"
import database from "./database"

const CardapioRepository = {
	criar: (item: Cardapio, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO Cardapio (id,nome,id_bar,produtos) VALUES (?,?,?,?)'
		const params = [item.id,item.nome,item.id_bar,item.produtos]
		database.run(sql, params, function(err) {
			if(err){
				console.error(err)
			}
			callback(this?.lastID)
		})
	},


	lerTodos: (callback: (item: Cardapio[]) => void) => {
		const sql = 'SELECT * FROM Cardapio'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (item?: Cardapio) => void) => {
		const sql = 'SELECT * FROM Cardapio WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, item: Cardapio, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE Cardapio SET  nome = ?,id_bar = ?,produtos = ?, WHERE id = ?'
		const params = [item.id,item.nome,item.id_bar,item.produtos]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM Cardapio WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default CardapioRepository
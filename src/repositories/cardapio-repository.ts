import Cardapio from "../models/Cardapio"
import database from "./database"

const CardapioRepository = {
	criar: (item: Cardapio, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO Cardapio (id,nome,id_bar) VALUES (?,?,?)'
		const params = [item.id,item.nome,item.id_bar]
		database.run(sql, params, function(err) {
			if(err){
				console.error(err)
			}
			callback(this?.lastID)
		})
	},
	ler:(id: number, callback:(cardapio: Cardapio) => void) => {
		const sql = 'SELECT * FROM Cardapio WHERE id = ?'
		const params = [id]
		database.get(sql,params,(_err, row) => callback(row))
	},
	lerTodos: (callback: (item: Cardapio[]) => void) => {
		const sql = 'SELECT * FROM Cardapio'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	lerTodosDoBar: (id_bar: number, callback: (cardapios: Cardapio[]) => void) => {
		const sql = 'SELECT * FROM Cardapio WHERE id_bar = ?'
		const params = [id_bar]
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	atualizar: (id: number, item: Cardapio, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE Cardapio SET  nome = ?,id_bar = ?, WHERE id = ?'
		const params = [item.nome,item.id_bar,item.produtos,id]
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
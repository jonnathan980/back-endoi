import Produto from "../models/Produto"
import database from "./database"

const ProdutoRepository = {
	criar: (item: Produto, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO Produto (nome,descricao,preco,url,id_cardapio) VALUES (?,?,?,?,?)'
		const params = [item.nome,item.descricao,item.preco,item.url,item.id_cardapio]
		database.run(sql, params, function(err) {
			if(err){
				console.error(err)
			}
			callback(this?.lastID)
		})
	},


	lerTodos: (callback: (item: Produto[]) => void) => {
		const sql = 'SELECT * FROM Produto'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	lerTodosDoCardapio: (id_cardapio: number, callback: (produtos: Produto[]) => void) => {
		const sql = 'SELECT * FROM Produto WHERE id_cardapio = ?'
		const params = [id_cardapio]
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (item?: Produto) => void) => {
		const sql = 'SELECT * FROM Produto WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, item: Produto, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE Produto SET  nome = ?, descricao = ?,preco = ?,url = ?, WHERE id = ?'
		const params = [item.nome,item.descricao,item.preco,item.url,id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM Produto WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default ProdutoRepository
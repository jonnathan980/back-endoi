import express from "express"
import Cardabios from "../models/Produto"
import ProdutoRepository from "../repositories/Produto-repository"

const ProdutoRouter = express.Router()

ProdutoRouter.post('/Produto', (req, res) => {
	const item: Cardabios  = req.body
	ProdutoRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/Produto/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

ProdutoRouter.get('/Produto', (req, res) => {
	ProdutoRepository.lerTodos((itens) => res.json(itens))
})

ProdutoRouter.get('/Produto/:id', (req, res) => {
	const id: number = +req.params.id
	ProdutoRepository.ler(id, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

ProdutoRouter.put('/Produto/:id',(req, res) => {
	const id: number = +req.params.id
	ProdutoRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

ProdutoRouter.delete('/Produto/:id', (req, res) => {
	const id: number = +req.params.id
	ProdutoRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default ProdutoRouter
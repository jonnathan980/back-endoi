import express from "express"
import Cardapio from "../models/Cardapio"
import CardapioRepository from "../repositories/cardapio-repository"
import ProdutoRepository from "../repositories/Produto-repository"

const CardapioRouter = express.Router()

CardapioRouter.post('/Cardapio', (req, res) => {
	const item: Cardapio = req.body
	CardapioRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/Cardapio/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

CardapioRouter.get('/Cardapio', (req, res) => {
	CardapioRepository.lerTodos((Cardapio) => res.json(Cardapio))
})

CardapioRouter.get('/Cardapio/:id', (req, res) => {
	const id: number = +req.params.id
	CardapioRepository.lerTodosDoBar(id, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

CardapioRouter.get('/Cardapio/:id/Protudos', (req,res) => {
	const id: number = +req.params.id
	CardapioRepository.ler(id,(cardapio) => {
		if(cardapio === undefined){
			res.status(404).send()
		}else{
			ProdutoRepository.lerTodosDoCardapio(id,(produtos) =>{
				res.status(200).json(produtos)
			})
		}
	})
})

CardapioRouter.put('/Cardapio/:id', (req, res) => {
	const id: number = +req.params.id
	CardapioRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

CardapioRouter.delete('/Cardapio/:id', (req, res) => {
	const id: number = +req.params.id
	CardapioRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default CardapioRouter
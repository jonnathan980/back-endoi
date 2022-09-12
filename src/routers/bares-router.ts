import express from "express"
import Bares from "../models/bares"
import Cardapio from "../models/Cardapio"
import BaresRepository from "../repositories/bares-repository"
import CardapioRepository from "../repositories/cardapio-repository"
import ProdutoRepository from "../repositories/Produto-repository"

const BaresRouter = express.Router()

BaresRouter.post('/Bares', (req, res) => {
	const item: Bares = req.body
	BaresRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/Bares/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

BaresRouter.get('/Bares', (req, res) => {
	BaresRepository.lerTodos((itens) => res.json(itens))
})

BaresRouter.get('/Bares/:id', (req, res) => {
	const id: number = +req.params.id
	BaresRepository.ler(id, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

BaresRouter.get('/Bares/:id/cardapios', (req, res) => {
	
	const id: number = +req.params.id
	console.log(`get/Bares/${id}/cardapios`)
	BaresRepository.ler(id, (bar) => {
		if (bar === undefined) {
			console.error('notFound')
			res.status(404).send()
		}
		else {
			CardapioRepository.lerTodosDoBar(id,(cardapios) => {
				cardapios.forEach((cardapio) => {
					ProdutoRepository.lerTodosDoCardapio(cardapio.id, (produtos) => {
						cardapio.produtos = produtos
					})
				});
		
				if (cardapios) {
					res.status(200).json(cardapios)
				} else {
					res.status(400).send()
				}
			})
		}
	})
})
	

BaresRouter.put('/Bares/:id', (req, res) => {
	const id: number = +req.params.id
	BaresRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

BaresRouter.delete('/Bares/:id', (req, res) => {
	const id: number = +req.params.id
	BaresRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default BaresRouter
import express from "express"
import Bares from "../models/bares"
import BaresRepository from "../repositories/bares-repository"
import CardapioRepository from "../repositories/cardabio-repository"
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
	CardapioRepository.ler(id,(item) => {
		if (item) {
			ProdutoRepository.lerTodos
		    res.json(item)
		} else {
			res.status(404).send()
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
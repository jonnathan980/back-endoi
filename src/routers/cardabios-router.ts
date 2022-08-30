import express from "express"
import Cardabio01 from "../models/cardabio"
import CardabioRepository from "../repositories/cardabio-repository"

const CardabiosRouter = express.Router()

CardabiosRouter.post('/CardabiosRouter', (req, res) => {
	const item: Cardabio01 = req.body
	CardabioRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/CardabiosRouter/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

CardabiosRouter.get('/CardabiosRouter', (req, res) => {
	CardabioRepository.lerTodos((itens) => res.json(itens))
})

CardabiosRouter.get('/CardabiosRouter/:id', (req, res) => {
	const id: number = +req.params.id
	CardabioRepository.ler(id, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

CardabiosRouter.put('/CardabiosRouter/:id', (req, res) => {
	const id: number = +req.params.id
	CardabioRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

CardabiosRouter.delete('/CardabiosRouter/:id', (req, res) => {
	const id: number = +req.params.id
	CardabioRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default CardabiosRouter
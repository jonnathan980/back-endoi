import express from "express"
import Cardabios from "../models/cardabio"
import CardabioRepository from "../repositories/cardabio-repository"

const CardabiosRouter = express.Router()

CardabiosRouter.post('/Cardabios', (req, res) => {
	const item: Cardabios  = req.body
	CardabioRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/Cardabios/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

CardabiosRouter.get('/Cardabios', (req, res) => {
	CardabioRepository.lerTodos((itens) => res.json(itens))
})

CardabiosRouter.get('/Cardabios/:id', (req, res) => {
	const id: number = +req.params.id
	CardabioRepository.ler(id, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

CardabiosRouter.put('/Cardabios/:id',(req, res) => {
	const id: number = +req.params.id
	CardabioRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

CardabiosRouter.delete('/Cardabios/:id', (req, res) => {
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
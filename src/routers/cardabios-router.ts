import express from "express"
import Cardabio01 from "../models/cardabio"
import Cardabio01Repository from "../repositories/cardabio"

const CardabiosRouter = express.Router()

CardabiosRouter.post('/CardabiosRouter', (req, res) => {
	const item: Cardabio01 = req.body
	Cardabio01Repository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/CardabiosRouter/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

CardabiosRouter.get('/CardabiosRouter', (req, res) => {
	Cardabio01Repository.lerTodos((itens) => res.json(itens))
})

CardabiosRouter.get('/CardabiosRouter/:id', (req, res) => {
	const id: number = +req.params.id
	Cardabio01Repository.ler(id, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

CardabiosRouter.put('/CardabiosRouter/:id', (req, res) => {
	const id: number = +req.params.id
	Cardabio01Repository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

CardabiosRouter.delete('/CardabiosRouter/:id', (req, res) => {
	const id: number = +req.params.id
	Cardabio01Repository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default CardabiosRouter
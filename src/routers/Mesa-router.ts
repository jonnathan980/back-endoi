import express from "express"
import Mesa from "../models/mesa"
import MesaRepository from "../repositories/mesa-repository"


const MesaRouter = express.Router()

MesaRouter.post('/Mesa', (req, res) => {
	const item: Mesa = req.body
	MesaRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/itens/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

MesaRouter.get('/Mesa', (req, res) => {
	MesaRepository.lerTodos((itens) => res.json(itens))
})

MesaRouter.get('/Mesa/:id', (req, res) => {
	const id: number = +req.params.id
	MesaRepository.ler(id, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

MesaRouter.put('/Mesa/:id', (req, res) => {
	const id: number = +req.params.id
	MesaRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

MesaRouter.delete('/Mesa/:id', (req, res) => {
	const id: number = +req.params.id
	MesaRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default MesaRouter
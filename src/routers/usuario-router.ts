import express from "express"
import usuario from "../models/usuario"
import UsuarioRepository from "../repositories/usuario-repository"

const UsuarioRouter = express.Router()

UsuarioRouter.post('/usuario', (req, res) => {
	const item: usuario = req.body
	UsuarioRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/usuario/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

UsuarioRouter.get('/usuario', (req, res) => {
	UsuarioRepository.lerTodos((itens) => res.json(itens))
})

UsuarioRouter.get('/usuario/logado', (req, res) => {
	if (req.headers.token === undefined) {
		res.status(400).send();
	} else {
		const token: string = req.headers.token.toString();
		const id: number = Number(token);
		UsuarioRepository.ler(id, (usuario) => {
			if (usuario === undefined) {
				res.status(401).send();
			} else {
				res.status(200).json(usuario);
			}
		});
	}
});

UsuarioRouter.get('/usuario/:id', (req, res) => {
	const id: number = +req.params.id
	UsuarioRepository.ler(id, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

UsuarioRouter.put('/usuario/:id', (req, res) => {
	const id: number = +req.params.id
	UsuarioRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

UsuarioRouter.delete('/usuario/:id', (req, res) => {
	const id: number = +req.params.id
	UsuarioRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default UsuarioRouter
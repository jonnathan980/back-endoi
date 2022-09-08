import express from 'express'
import cors from 'cors'
import itensRouter from './routers/itens-router'
import BaresRouter from './routers/bares-router'
import UsuarioRouter from './routers/usuario-router'
<<<<<<< HEAD
import CardabiosRouter from './routers/cardabios-router'
import AutenticacoesRouter from './routers/audenticacoes-router'
=======
import AudenticacoesRouter from './routers/audenticacoes-router'
>>>>>>> ebc4d14f846353d2b812a03fb74070905f251db0
import MesaRouter from './routers/Mesa-router'
import ProdutoRouter from './routers/Produto-router'
import CardapioRouter from './routers/cardabio-router'

// Porta do servidor
const PORT = process.env.PORT || 4000

// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

// App Express
const app = express()

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoint raiz
app.get('/', (req, res) => {
	res.send('Bem-vindo!')
})

// Cors
app.use(cors({
	origin: '*'
}))

// Rotas
app.use('/', itensRouter)
app.use('/', BaresRouter)
app.use('/', UsuarioRouter)
app.use('/', ProdutoRouter)
app.use('/', CardapioRouter)
app.use('/', MesaRouter)
app.use('/', AutenticacoesRouter)


// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
	res.status(404)
})

// Inicia o sevidor
app.listen(PORT, () => {
	console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})
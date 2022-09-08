import express from 'express'
import cors from 'cors'
import itensRouter from './routers/itens-router'
import BaresRouter from './routers/bares-router'
import UsuarioRouter from './routers/usuario-router'
import CardapioRouter from './routers/cardapio-router'
import AutenticacoesRouter from './routers/autenticacoes-router'
import MesaRouter from './routers/Mesa-router'
import ProdutoRouter from './routers/Produto-router'

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
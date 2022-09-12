import express from "express";
import UsuarioRepository from "../repositories/usuario-repository";

const AutenticacoesRouter = express.Router()

AutenticacoesRouter.post('/autenticacao', (req,res) => {

  UsuarioRepository.login(req.body.email, req.body.senha, (usuario) => {
    if(usuario === undefined){
      res.status(401).send()
    } else{
      res.status(201).json({
        token: usuario.id.toString()
      })
    }
  })
}) 


export default AutenticacoesRouter
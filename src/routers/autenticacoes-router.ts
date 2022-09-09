import express from "express";

const AutenticacoesRouter = express.Router()

AutenticacoesRouter.post('/autenticacao', (req,res) => {
  if (req.body.email==='admin' && req.body.senha==='admin') {
    res.status(201).json({
        token: '1'
    })
  }else{
    res.status(401).send()
  }
 
   
}) 


export default AutenticacoesRouter
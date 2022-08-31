import express from "express";

const AudenticacoesRouter = express.Router()

AudenticacoesRouter.post('/audenticacaos', (req,res) => {
  if (req.body.email==='amdin' && req.body.senha==='amdin') {
    res.status(201).json({
        token: '1'
    })
  }else{
    res.status(401).send()
  }
 
   
}) 


export default AudenticacoesRouter
import express, { Router } from 'express'
import users from './users'
import token from  './token'
const router = Router()
router.use(express.json()) //transforma arquivo json em um objeto.
router.use(express.static(__dirname + '/../../public')) // Entrega os arquivos estáticos para o cliente.
router.use('/users', users)
router.use('/token', token)
export default router
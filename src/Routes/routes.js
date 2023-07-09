const express=require('express')
const route=express.Router()
const userController=require('../Controller/userController')

route.post('/api/sign-up',userController.signUp)
route.post('/api/sign-in',userController.signIn)

module.exports=route
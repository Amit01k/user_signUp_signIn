const express=require('express')
const route=express.Router()
const userController=require('../Controller/userController')

route.post('/api/sing-up',userController.singUp)
route.post('/api/sign-in',userController.signIn)

module.exports=route
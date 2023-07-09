const express=require('express')
require('dotenv').config();
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const Routes=require('./Routes/routes')
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',Routes)
const port = process.env.PORT || 4000;
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true
})
.then(()=>console.log("Database connected"))
.catch((err)=> console.log(err))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


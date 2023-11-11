const express=require('express')
const dotenv=require('dotenv')
dotenv.config({path: __dirname + '/.env'}); 
const connectDb = require('./db/db');
const {errHandler}=require('./middlewares/errorMiddlewares')
const app=express();
const cors=require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors({ origin: true, credentials: true }));
app.use('/',express.static('uploads'))
connectDb()
app.use(cors({ origin: true, credentials: true }));
app.use('/api/contents',require('./routes/ContentRoutes'))
app.use('/api/users',require('./routes/UserRoutes'))
app.use(errHandler) 
const port= process.env.PORT||5000;


app.listen(port,()=>console.log(`app is running on port ${port}`))
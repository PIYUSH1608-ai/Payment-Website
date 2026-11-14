import express from "express"
import path, {dirname} from "path"
import { fileURLToPath } from "url"
import authRoutes from './routes/authRoutes.js'
import authMiddleware from "./middleware/authMiddleware.js"
const app=express()
//install express bcryptjs jsonwebtoken for authentication

const PORT=process.env.PORT || 5000//Syntax to get the PORT value present at .env else use PORT 5000

//Get the file name from the url of the current module
const __filename=fileURLToPath(import.meta.url)
//Get the directory name from the file path
const __dirname=dirname(__filename)// here the __dirname=src

app.use(express.json())


//It tells express to use all static files from thr public ans configures the public directory
app.use(express.static(path.join(__dirname,'../Frontend')))

//serving upto HTML file from the Frontend directory
app.get("/",(req,res)=>{
    //This sendFile wants complete path like from C:,
    res.sendFile(path.join(__dirname,"..","Frontend","/registration/registration.html"))
})


//routes
//this .use is mainly used in middleware
app.use("/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server has started at PORT:${PORT}`)
})
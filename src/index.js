const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const {default: mongoose} = require("mongoose")
const routes = require('./routes/index')
// const bodyParser = require('body-parser')
dotenv.config()
const app = express()
const port = process.env.PORT || 4001

// app.get('/',(req,res)=>{
//     res.send('Hello')
// })
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

routes(app)
mongoose.connect(`${process.env.MONGO_DB}`)
    .then(()=>{
        console.log('Thành công')
    })
    .catch((err)=>{
        console.log(err)
    })


app.listen(port,()=>{
    console.log(`Server đang được chạy trên cổng:`, port)
})



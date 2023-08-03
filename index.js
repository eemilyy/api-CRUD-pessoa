require('dotenv').config()
const express =  require('express');
const mongoose = require('mongoose');
const app = express();

// enviar e ler JSON
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json()); 

const personRoutes = require('./routes/personRoute');

app.use('/person', personRoutes);

app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lqtfc5g.mongodb.net/bancoapi?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Conectado ao MongoDB");
    app.listen(3000);
})
.catch((err)=>console.log(err))



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

app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

mongoose.connect('mongodb+srv://emily:0220@cluster0.lqtfc5g.mongodb.net/bancoapi?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conectado ao MongoDB");
    app.listen(3000);
})
.catch((err)=>console.log(err))



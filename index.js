const express =  require('express');
const mongoose = require('mongoose');
const app = express();

const Person = require('./models/Person');

// enviar e ler JSON
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json()); 

app.post('/person', async(req, res)=>{

    const {name, salary, approved} = req.body;

    if(!name){
        res.status(422).json({message: 'Insert name'})
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)

        res.status(201).json({person});

    } catch (error) {
        res.status(500).json({error: error});        
    }

})

app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

mongoose.connect('mongodb+srv://emily:0220@cluster0.lqtfc5g.mongodb.net/bancoapi?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conectado ao MongoDB");
    app.listen(3000);
})
.catch((err)=>console.log(err))



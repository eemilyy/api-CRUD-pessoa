const router = require('express').Router();

const Person = require('../models/Person');

router.post('/', async(req, res)=>{

    const {name, salary, approved} = req.body;

    if(!name){
        res.status(422).json({message: 'Name cannot be blank'})
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)

        res.status(201).json(person);

    } catch (error) {
        res.status(500).json({error: error});        
    }

})

router.get('/', async(req, res) => {
   try {
    const people = await Person.find()

    res.status(200).json(people)

   } catch (error) {
        res.status(500).json({error: error});
   }
})


router.get('/:id', async(req, res) => {

    const id = req.params.id; // retona um parametro especifico

    try {
     const person = await Person.findOne({_id:id}) // o id no BD é mostrado com _id

     if(!person){
        res.status(422).json({message:'User does not exist'})
        return
     }

 
     res.status(200).json(person)
     
    } catch (error) {
         res.status(500).json({error: error});
    }
 })

router.patch('/:id', async(req, res) => {

    const id = req.params.id;

    const {name, salary, approved} = req.body;

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)

        res.status(200).json({message: "User has been updated"})

    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.delete('/:id', async(req, res) => {

    const id = req.params.id;

    const person = await Person.findOne({_id:id}) // o id no BD é mostrado com _id

     if(!person){
        res.status(422).json({message:'User does not exist'})
        return
    }

    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({message: "User has been deleted"})

    } catch (error) {
        res.status(500).json({error: error});
    }

})

module.exports = router;


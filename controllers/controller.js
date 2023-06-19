const { response } = require('express');
const Persona = require('../models/Person');


const getPersons = async (req, res) => {
    try {
        const persons = await Persona.find({});
        if (persons){
          //  return persons;
            console.log(persons);
            return res.status(200).json(persons)
           // 
        }
        return "Cannot process the request";
    } catch (error) {
        return 'Sorry, we have some problem to process your request :( ';
    }
}

module.exports = {
     getPersons
}
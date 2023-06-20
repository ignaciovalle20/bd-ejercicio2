const Persona = require('../models/Person');


const getPersons = async () => {
  try {
      //const persons = await Persona.find({}); // find all the data in the Person collection
      return await Persona.find({}).select({"_id": 0, "ci": 1, "nombre":1, "categoria": 1});
  } catch (error) {
      return 'Sorry, we have some problem to process your request :( ';
  }
}

const getPersonsByCategory = async (category) => {
  try {
      return await Persona.find({ categoria: category }).select({"_id": 0, "ci": 1});
  } catch (error) {
      return 'Sorry, we have some problem to process your request :( ';
  }
}

const getCategories = async () => {
  try {
      return await Persona.find({}).distinct('categoria');
  } catch (error) {
      return 'Sorry, we have some problem to process your request :( ';
  }
}

const modifyRoleByCi = async (ci, role) => {
  try {
      return await Persona.updateOne({ ci }, { categoria: role });
  }
  catch (error) {
      return 'Sorry, we have some problem to process your request :( ';
  }
}

const deletePersonByCi = async (ci) => {
  try {
      return await Persona.deleteOne({ ci }); 
  }
  catch (error) {
      return 'Sorry, we have some problem to process your request :( ';
  }
}

const getPersonByCi = async (ci) => {
  try {
    return Persona.findOne({ ci });
  } catch (error) {
    return 'Sorry, we have some problem to process your request :( ';
  }
}


module.exports = {
  getPersons,
  getPersonByCi,
  getPersonsByCategory,
  getCategories,
  modifyRoleByCi,
  deletePersonByCi
}


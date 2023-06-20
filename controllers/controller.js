const personDA = require('../data_access/person');


const getPersons = async () => {
    return personDA.getPersons();
}

const getPersonByCi = async (ci) => {
    return personDA.getPersonByCi(ci);
}

const getPersonsByCategory = async (category) => {
    return personDA.getPersonsByCategory(category);
}

const getCategories = async () => {
    return personDA.getCategories();
}

const modifyRoleByCi = async (ci, role) => {
    const personExists = await personDA.getPersonByCi(ci);
    if (!personExists) {
        throw new Error('No existe ninguna persona con esa cédula.');
    }
    else if (personExists.categoria === role) {
        throw new Error('La persona ya tiene ese rol.');
    }
    return personDA.modifyRoleByCi(ci, role);
}

const deletePersonByCi = async (ci) => {
    const personExists = await personDA.getPersonByCi(ci);
    if (!personExists) {
        throw new Error('No existe ninguna persona con esa cédula.');
    }
    return personDA.deletePersonByCi(ci);
}


module.exports = {
    getPersons,
    getPersonByCi,
    getPersonsByCategory,
    getCategories,
    modifyRoleByCi,
    deletePersonByCi
}
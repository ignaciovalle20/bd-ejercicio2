const readline = require('readline');
const controller = require('./controllers/controller');
const inquirer = require('inquirer');


const promptMenuPrincipal = async () => {
  let answers;

  const promptsMap = {
    1: promptListados,
    2: promptModificarRol,
    3: promptEliminarPersona,
    4: () => console.log('Saliendo del programa...')
  };

  do {
    console.log();
    console.log('=== Menú principal ===');
    answers = await inquirer.prompt([
      {
        type: 'list',
        loop: false,
        name: 'submenu',
        message: 'Seleccione la acción que desea realizar:',
        choices: [
          {
            name: '1. Obtener listados',
            value: 1
          },
          {
            name: '2. Modificar el rol de una persona registrada',
            value: 2
          },
          {
            name: '3. Eliminar persona',
            value: 3
          },
          {
            name: '4. Salir',
            value: 4
          }
        ]
      }
    ]);

    await promptsMap[answers.submenu]();
  }
  while (answers.submenu !== 4);
};

const promptListados = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      loop: false,
      name: 'listado',
      message: 'Seleccione la acción que desea realizar:',
      choices: [
        {
          name: '1. Listar todas las personas',
          value: 1
        },
        {
          name: '2. Listar todas las personas según su rol',
          value: 2
        }
      ]
    }
  ]);

  if (answers.listado === 1) {
    const personas = await controller.getPersons();
    for (const persona of personas) {
      console.log(`Cédula: ${persona.ci}, Nombre: ${persona.nombre}, Rol: ${persona.categoria}`);
    }
  }
  else if (answers.listado === 2) {
    const roles = await controller.getCategories();
    const answers = await inquirer.prompt([
      {
        type: 'list',
        loop: false,
        name: 'rol',
        message: 'Seleccione el rol a consultar:',
        choices: roles.map((rol) => ({ name: rol, value: rol }))
      }
    ]);

    const personas = await controller.getPersonsByCategory(answers.rol);
    console.log(`Cédulas de personas con el rol ${answers.rol}:`);
    for (const persona of personas) {
      console.log(persona.ci);
    }
  }
};

const promptModificarRol = async () => {
  let persona;

  const answers = await inquirer.prompt([
    {
      type: 'input',
      message: 'Ingrese la cédula de la persona a modificar:',
      name: 'ci',
      validate: async (ci) => {
        persona = await controller.getPersonByCi(ci);
        if (!persona) {
          printValidateError(`No se encontró ninguna persona con cédula ${ci}.`);
          return false;
        }

        return true;
      }
    },
    {
      type: 'input',
      message: 'Ingrese el nuevo rol:',
      name: 'rol',
      validate: (rol) => {
        if (rol === persona.categoria) {
          printValidateError(`La persona ya tiene el rol ${rol}.`);
          return false;
        }

        return true;
      }
    }
  ]);

  try {
    await controller.modifyRoleByCi(answers.ci, answers.rol);
    printSuccess('Rol modificado con éxito.');
  }
  catch (error) {
    printValidateError(error.message);
  }
}

const promptEliminarPersona = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      message: 'Ingrese la cédula de la persona a eliminar:',
      name: 'ci',
      validate: async (ci) => {
        const persona = await controller.getPersonByCi(ci);
        if (!persona) {
          printValidateError(`No se encontró ninguna persona con cédula ${ci}.`);
          return false;
        }

        return true;
      }
    },
    {
      type: 'confirm',
      message: '¿Está seguro que desea eliminar la persona ingresada?',
      name: 'confirma'
    }
  ]);

  if (!answers.confirma) {
    console.log('Operación cancelada.');
    return;
  }

  try {
    await controller.deletePersonByCi(answers.ci);
    printSuccess('Persona eliminada con éxito.');
  }
  catch (error) {
    printValidateError(error.message);
  }
} 

const printValidateError = (msg) => {
  console.log(` ${msg}`.red);
}
const printSuccess = (msg) => {
  console.log(` ${msg}`.green);
}
module.exports = {
    promptMenuPrincipal
}
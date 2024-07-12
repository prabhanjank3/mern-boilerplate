module.exports = {
  description: 'Generate E2E Endpoints',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Endpoint Name, please!',
    },
    {
      type: 'input',
      name: 'rawFields',
      message:
        'Model fields (comma-separated, e.g., name:string,email:string):',
    },
  ],
  actions: (data) => {
    const fields = data.rawFields.split(',').map((field) => {
      const [name, type] = field.split(':');
      return { name, type };
    });

    return [
      {
        type: 'add',
        path: '../../src/api/controllers/sequelize/{{lowerCase name}}.controller.js',
        templateFile: './endpoint/controller.hbs',
        force: true,
      },
      {
        type: 'add',
        path: '../../src/api/models/sequelize/{{lowerCase name}}.model.js',
        templateFile: './endpoint/model.hbs',
        data: { fields: fields },
        force: true,
      },
      {
        type: 'add',
        path: '../../src/api/routes/v1/{{lowerCase name}}.route.js',
        templateFile: './endpoint/route.hbs',
        force: true,
      },
      {
        type: 'modify',
        path: '../../src/api/models/sequelize/index.js',
        pattern: /(\/\/ Add models to db object here)/g,
        template: `$1\ndb.{{lowerCase name}} = require('./{{lowerCase name}}.model')(dbConnection, Sequalize);`,
      },
      {
        type: 'modify',
        path: '../../src/api/routes/v1/index.js',
        pattern: /(\/\/ Import Route Files)/g,
        template: `$1\nconst {{lowerCase name}}Routes = require('./{{lowerCase name}}.route');`,
      },
      {
        type: 'modify',
        path: '../../src/api/routes/v1/index.js',
        pattern: /(\/\/ Add Routes Here)/g,
        template: `$1\nrouter.use("/{{lowerCase name}}", {{lowerCase name}}Routes);`,
      },
      {
        type: 'prettify',
        data: {
          path: `src/api/controllers/sequelize/${data.name.toLowerCase()}.controller.js`,
        },
      },
      {
        type: 'prettify',
        data: {
          path: `src/api/models/sequelize/${data.name.toLowerCase()}.model.js`,
        },
      },
      {
        type: 'prettify',
        data: {
          path: `src/api/routes/v1/${data.name.toLowerCase()}.route.js`,
        },
      },
      {
        type: 'prettify',
        data: {
          path: `src/api/models/sequelize/index.js`,
        },
      },
      {
        type: 'prettify',
        data: {
          path: `src/api/routes/v1/index.js`,
        },
      },
    ];
  },
};

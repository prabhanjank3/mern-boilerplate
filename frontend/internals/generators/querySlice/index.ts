/**
 * Container Generator
 */

import { Actions } from 'node-plop';
import inquirer from 'inquirer';

import { pathExists } from '../utils';

inquirer.registerPrompt('directory', require('inquirer-directory'));

export const enum QuerySliceProptNames {
  'sliceName' = 'sliceName',
  'path' = 'path',
  'wantSaga' = 'wantSaga'
}

type Answers = { [P in QuerySliceProptNames]: string };

export const querySliceGenerator = {
  description: 'Add a redux toolkit query slice',
  prompts: [
    {
      type: 'input',
      name: QuerySliceProptNames.sliceName,
      message: 'What should it be called (automatically adds ...Slice postfix)'
    }
  ],
  actions: data => {
    const answers = data as Answers;

    const storePath = `src/store`;
    const slicePath = `${storePath}/querySlice/${answers.sliceName.toLowerCase()}.slice.ts`;

    if (pathExists(slicePath)) {
      throw new Error(`Slice '${answers.sliceName}' already exists`);
    }
    const actions: Actions = [];

    actions.push({
      type: 'add',
      path: `../../${slicePath}`,
      templateFile: './querySlice/slice.hbs',
      abortOnFail: true
    });

    actions.push({
      type: 'modify',
      path: `../../${storePath}/reducers.ts`,
      pattern: /(\/\/ IMPORT SLICES HERE)/g,
      template:
        "import { {{camelCase sliceName}}Slice } from './querySlice/{{lowerCase sliceName}}.slice';\n$&",
      abortOnFail: true
    });

    actions.push({
      type: 'modify',
      path: `../../${storePath}/reducers.ts`,
      pattern: /(\/\/ INSERT REDUCERS HERE)/g,
      template:
        '[{{camelCase sliceName}}Slice.reducerPath] : {{camelCase sliceName}}Slice.reducer,\n$&',
      abortOnFail: true
    });

    actions.push({
      type: 'modify',
      path: `../../${storePath}/configureStore.ts`,
      pattern: /(\/\/ IMPORT SLICES HERE)/g,
      template:
        "import { {{camelCase sliceName}}Slice } from './querySlice/{{lowerCase sliceName}}.slice';\n$&",
      abortOnFail: true
    });

    actions.push({
      type: 'modify',
      path: `../../${storePath}/configureStore.ts`,
      pattern: /(\/\/ INSERT MIDDLEWARES HERE)/g,
      template: '.concat({{camelCase sliceName}}Slice.middleware)\n$&',
      abortOnFail: true
    });

    actions.push({
      type: 'prettify',
      data: { path: `${slicePath}` }
    });

    actions.push({
      type: 'prettify',
      data: { path: `${storePath}/configureStore.ts` }
    });

    actions.push({
      type: 'prettify',
      data: { path: `${storePath}/reducers.ts` }
    });

    return actions;
  }
};
